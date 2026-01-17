// Firebase 설정
// 주의: 실제 배포 시에는 본인의 Firebase 프로젝트 설정으로 교체해야 합니다
const firebaseConfig = {
    apiKey: "AIzaSyAS8GEGIZwnULudx2b3TVCEdzrASTo-b8Q",
    authDomain: "monster-hunting-game.firebaseapp.com",
    projectId: "monster-hunting-game",
    storageBucket: "monster-hunting-game.firebasestorage.app",
    messagingSenderId: "323067244006",
    appId: "1:323067244006:web:85c8dea848de61a7cf7a27",
    measurementId: "G-44RCBZMDQ3"
};

// Firebase 초기화
let app, auth, db;
let currentUser = null;
let isGuest = false;

// Firebase 초기화 시도
function initFirebase() {
    try {
        // Firebase 설정이 유효한지 확인
        if (firebaseConfig.apiKey === "YOUR_API_KEY") {
            console.log("Firebase not configured. Running in guest mode only.");
            return false;
        }

        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();

        // 인증 상태 변경 리스너
        auth.onAuthStateChanged(handleAuthStateChange);

        return true;
    } catch (error) {
        console.error("Firebase initialization error:", error);
        return false;
    }
}

// 인증 상태 변경 핸들러
function handleAuthStateChange(user) {
    if (user) {
        currentUser = user;
        isGuest = false;
        updateUserDisplay();
        loadGameFromCloud();
    }
}

// 사용자 표시 업데이트
function updateUserDisplay() {
    const displayNameEl = document.getElementById('user-display-name');
    const logoutBtn = document.getElementById('logout-btn');

    if (currentUser) {
        displayNameEl.textContent = currentUser.displayName || currentUser.email || '플레이어';
        logoutBtn.style.display = 'inline-block';
    } else if (isGuest) {
        displayNameEl.textContent = '게스트';
        logoutBtn.style.display = 'none';
    }
}

// 구글 로그인
async function signInWithGoogle() {
    // Firebase 설정 확인
    if (!auth) {
        alert('Firebase가 설정되지 않았습니다.\n\n배포 후 Firebase 설정을 완료하면 구글 로그인을 사용할 수 있습니다.\n\n지금은 게스트로 플레이해 주세요.');
        return;
    }

    showLoading(true);

    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        currentUser = result.user;
        isGuest = false;

        updateUserDisplay();
        showScreen('main-menu');

        // 클라우드에서 게임 데이터 로드
        await loadGameFromCloud();

    } catch (error) {
        console.error("Google sign-in error:", error);
        if (error.code === 'auth/popup-closed-by-user') {
            // 사용자가 팝업을 닫음
        } else {
            alert('로그인에 실패했습니다: ' + error.message);
        }
    } finally {
        showLoading(false);
    }
}

// 게스트로 플레이
function playAsGuest() {
    isGuest = true;
    currentUser = null;
    updateUserDisplay();
    showScreen('main-menu');

    // 로컬 스토리지에서 게임 로드
    loadGame();
}

// 로그아웃
async function signOutUser() {
    if (auth && currentUser) {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Sign out error:", error);
        }
    }

    currentUser = null;
    isGuest = false;

    // 게임 상태 초기화
    resetGameState();

    showScreen('login-screen');
}

// 게임 상태 초기화
function resetGameState() {
    gameState = {
        playerName: '트레이너',
        party: [],
        storage: [],
        pokedex: {},
        items: {
            pokeball: 10,
            greatball: 5,
            ultraball: 2,
            potion: 5,
            super_potion: 2
        },
        money: 1000,
        currentRegion: null
    };
}

// 클라우드에서 게임 데이터 로드
async function loadGameFromCloud() {
    if (!db || !currentUser) return;

    showLoading(true);

    try {
        const doc = await db.collection('users').doc(currentUser.uid).get();

        if (doc.exists) {
            const data = doc.data();
            if (data.gameState) {
                gameState = data.gameState;
                console.log("Game loaded from cloud");
            }
        }

        // 이어하기 버튼 상태 업데이트
        updateContinueButton();

    } catch (error) {
        console.error("Error loading from cloud:", error);
    } finally {
        showLoading(false);
    }
}

// 클라우드에 게임 데이터 저장
async function saveGameToCloud() {
    if (!db || !currentUser) {
        // 게스트는 로컬 스토리지에 저장
        saveGame();
        return;
    }

    try {
        await db.collection('users').doc(currentUser.uid).set({
            gameState: gameState,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            displayName: currentUser.displayName || currentUser.email
        }, { merge: true });

        console.log("Game saved to cloud");
    } catch (error) {
        console.error("Error saving to cloud:", error);
        // 클라우드 저장 실패 시 로컬에 백업
        saveGame();
    }
}

// 이어하기 버튼 업데이트
function updateContinueButton() {
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.disabled = gameState.party.length === 0;
    }
}

// 로딩 표시
function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }
}

// 페이지 로드 시 Firebase 초기화
document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
});
