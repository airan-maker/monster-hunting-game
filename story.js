// 스토리 모드 핵심 로직

// 스토리 상태
let storyState = {
    isStoryMode: false,
    currentChapter: 'chapter1',
    currentScene: null,
    currentDialogueIndex: 0,
    completedChapters: [],
    completedScenes: [],
    unlockedLocations: ['player_house'],
    currentLocation: 'player_house',
    playerGender: 'boy',
    starterMonster: null,
    rivalStarter: null,
    sceneQueue: []
};

// 대화 상태
let dialogueState = {
    isTyping: false,
    currentText: '',
    targetText: '',
    typingSpeed: 30,
    skipTyping: false
};

// NPC 이모지 매핑 (이미지가 없을 때 사용)
const NPC_EMOJIS = {
    professor: '👨‍🔬',
    rival: '😎',
    cafe_owner: '👩‍🍳',
    stranger: '🎭',
    mom: '👩',
    villager_old_man: '👴',
    shop_owner: '🧑‍💼',
    player: '🧑',
    narrator: '📖'
};

// 스토리 모드 시작
function startStoryMode() {
    storyState.isStoryMode = true;

    // 저장된 스토리 데이터 확인
    if (gameState.storyProgress && gameState.storyProgress.completedChapters) {
        // 이어하기
        storyState = { ...storyState, ...gameState.storyProgress };
        showStoryMap();
    } else {
        // 새 게임
        showScreen('name-input-screen');
    }
}

// 성별 선택
function selectGender(gender) {
    storyState.playerGender = gender;

    // UI 업데이트
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`.gender-btn[data-gender="${gender}"]`).classList.add('selected');
}

// 이름 확정
function confirmPlayerName() {
    const nameInput = document.getElementById('player-name-input');
    const playerName = nameInput.value.trim() || '준';

    gameState.playerName = playerName;
    storyState.isStoryMode = true;

    // 인트로 씬 시작
    playScene('intro');
}

// 씬 재생
function playScene(sceneId) {
    const scene = STORY_SCENES[sceneId];
    if (!scene) {
        console.error('Scene not found:', sceneId);
        return;
    }

    storyState.currentScene = sceneId;
    storyState.currentDialogueIndex = 0;

    // 배경 설정
    if (scene.location) {
        const location = STORY_LOCATIONS[scene.location];
        if (location) {
            setDialogueBackground(location.background);
        }
    }

    showScreen('story-dialogue-screen');
    showCurrentDialogue();
}

// 배경 설정
function setDialogueBackground(imageName) {
    const bg = document.getElementById('dialogue-background');
    if (imageName) {
        bg.style.backgroundImage = `url('${IMAGE_PATHS.locations}${imageName}')`;
        bg.style.backgroundColor = '#1a1a2e';
    } else {
        bg.style.backgroundImage = 'none';
        bg.style.backgroundColor = '#1a1a2e';
    }
}

// 현재 대화 표시
function showCurrentDialogue() {
    const scene = STORY_SCENES[storyState.currentScene];
    if (!scene || storyState.currentDialogueIndex >= scene.dialogues.length) {
        // 대화 종료, 액션 실행
        executeSceneAction(scene);
        return;
    }

    const dialogue = scene.dialogues[storyState.currentDialogueIndex];

    // 대화자 정보
    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');
    const portraitEl = document.getElementById('dialogue-portrait');

    // 대화자 이름 설정
    let speakerName = '';
    if (dialogue.speaker === 'player') {
        speakerName = gameState.playerName || '나';
    } else if (dialogue.speaker === 'narrator') {
        speakerName = '';
    } else if (NPCS[dialogue.speaker]) {
        speakerName = NPCS[dialogue.speaker].name;
    } else {
        speakerName = dialogue.speaker;
    }

    speakerEl.textContent = speakerName;
    speakerEl.style.display = speakerName ? 'block' : 'none';

    // 초상화 설정
    setPortrait(dialogue.speaker, dialogue.emotion);

    // 대화 텍스트 치환
    let text = dialogue.text;
    text = text.replace(/{playerName}/g, gameState.playerName || '준');
    text = text.replace(/{starterName}/g, storyState.starterMonster ? MONSTERS[storyState.starterMonster].name : '');
    text = text.replace(/{rivalStarter}/g, storyState.rivalStarter ? MONSTERS[storyState.rivalStarter].name : '');

    // 타이핑 효과로 텍스트 표시
    typeText(text, textEl);
}

// 초상화 설정
function setPortrait(speaker, emotion) {
    const portraitEl = document.getElementById('dialogue-portrait');

    if (speaker === 'narrator') {
        portraitEl.classList.add('narrator');
        portraitEl.style.backgroundImage = 'none';
        portraitEl.textContent = '';
        return;
    }

    portraitEl.classList.remove('narrator');

    // NPC 이미지 또는 이모지 표시
    if (NPCS[speaker]) {
        const npc = NPCS[speaker];
        const imgFile = emotion && npc.images && npc.images[emotion]
            ? npc.images[emotion]
            : npc.image;

        portraitEl.style.backgroundImage = `url('${IMAGE_PATHS.npcs}${imgFile}')`;
        portraitEl.textContent = '';

        // 이미지 로드 실패 시 이모지 표시
        portraitEl.onerror = () => {
            portraitEl.style.backgroundImage = 'none';
            portraitEl.textContent = NPC_EMOJIS[speaker] || '👤';
            portraitEl.style.fontSize = '4rem';
            portraitEl.style.display = 'flex';
            portraitEl.style.justifyContent = 'center';
            portraitEl.style.alignItems = 'center';
        };
    } else if (speaker === 'player') {
        portraitEl.style.backgroundImage = 'none';
        portraitEl.textContent = storyState.playerGender === 'boy' ? '👦' : '👧';
        portraitEl.style.fontSize = '4rem';
        portraitEl.style.display = 'flex';
        portraitEl.style.justifyContent = 'center';
        portraitEl.style.alignItems = 'center';
    } else {
        portraitEl.style.backgroundImage = 'none';
        portraitEl.textContent = NPC_EMOJIS[speaker] || '👤';
        portraitEl.style.fontSize = '4rem';
    }
}

// 타이핑 효과
function typeText(text, element) {
    dialogueState.isTyping = true;
    dialogueState.targetText = text;
    dialogueState.currentText = '';
    dialogueState.skipTyping = false;

    element.textContent = '';

    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (dialogueState.skipTyping) {
            element.textContent = text;
            dialogueState.isTyping = false;
            clearInterval(typeInterval);
            return;
        }

        if (charIndex < text.length) {
            dialogueState.currentText += text[charIndex];
            element.textContent = dialogueState.currentText;
            charIndex++;
        } else {
            dialogueState.isTyping = false;
            clearInterval(typeInterval);
        }
    }, dialogueState.typingSpeed);
}

// 대화 진행 (클릭 시 호출)
function advanceDialogue() {
    if (dialogueState.isTyping) {
        // 타이핑 중이면 즉시 완료
        dialogueState.skipTyping = true;
        return;
    }

    storyState.currentDialogueIndex++;
    showCurrentDialogue();
}

// 대화 화면 클릭 이벤트
document.addEventListener('DOMContentLoaded', () => {
    const dialogueBox = document.querySelector('.dialogue-box');
    if (dialogueBox) {
        dialogueBox.addEventListener('click', advanceDialogue);
    }
});

// 씬 액션 실행
function executeSceneAction(scene) {
    if (!scene) {
        // 씬 완료 처리
        if (!storyState.completedScenes.includes(storyState.currentScene)) {
            storyState.completedScenes.push(storyState.currentScene);
        }

        // 다음 씬이 있으면 진행
        if (scene && scene.nextScene) {
            playScene(scene.nextScene);
        } else {
            // 맵으로 돌아가기
            showStoryMap();
        }
        return;
    }

    const action = scene.action;
    if (!action) {
        // 씬 완료 처리
        if (!storyState.completedScenes.includes(storyState.currentScene)) {
            storyState.completedScenes.push(storyState.currentScene);
        }

        if (scene.nextScene) {
            playScene(scene.nextScene);
        } else {
            showStoryMap();
        }
        return;
    }

    switch (action.type) {
        case 'input_name':
            // 이름 입력은 이미 완료됨
            if (!storyState.completedScenes.includes(storyState.currentScene)) {
                storyState.completedScenes.push(storyState.currentScene);
            }
            if (scene.nextScene) {
                playScene(scene.nextScene);
            }
            break;

        case 'choose_starter':
            showScreen('starter-select-screen');
            break;

        case 'unlock_location':
            if (!storyState.unlockedLocations.includes(action.value)) {
                storyState.unlockedLocations.push(action.value);
            }
            if (!storyState.completedScenes.includes(storyState.currentScene)) {
                storyState.completedScenes.push(storyState.currentScene);
            }
            // 다음 씬이 있으면 진행, 없으면 맵으로
            if (scene.nextScene) {
                playScene(scene.nextScene);
            } else {
                showStoryMap();
            }
            break;

        case 'receive_items':
            // 아이템 지급
            if (action.items) {
                for (const [itemId, count] of Object.entries(action.items)) {
                    gameState.items[itemId] = (gameState.items[itemId] || 0) + count;
                }
            }
            if (!storyState.completedScenes.includes(storyState.currentScene)) {
                storyState.completedScenes.push(storyState.currentScene);
            }
            if (scene.nextScene) {
                playScene(scene.nextScene);
            } else {
                showStoryMap();
            }
            break;

        case 'complete_chapter':
            if (!storyState.completedChapters.includes(action.value)) {
                storyState.completedChapters.push(action.value);
            }
            if (!storyState.completedScenes.includes(storyState.currentScene)) {
                storyState.completedScenes.push(storyState.currentScene);
            }
            // 스토리 진행 저장
            saveStoryProgress();
            showStoryMap();
            break;

        case 'wild_battle':
            // 야생 배틀 시작
            if (!storyState.completedScenes.includes(storyState.currentScene)) {
                storyState.completedScenes.push(storyState.currentScene);
            }
            startWildBattleFromStory(action.level || 5);
            break;

        case 'rival_battle':
            // 라이벌 배틀
            if (!storyState.completedScenes.includes(storyState.currentScene)) {
                storyState.completedScenes.push(storyState.currentScene);
            }
            startRivalBattle();
            break;

        default:
            if (!storyState.completedScenes.includes(storyState.currentScene)) {
                storyState.completedScenes.push(storyState.currentScene);
            }
            if (scene.nextScene) {
                playScene(scene.nextScene);
            } else {
                showStoryMap();
            }
    }
}

// 스타터 선택
function selectStarter(monsterId) {
    storyState.starterMonster = monsterId;
    storyState.rivalStarter = RIVAL_STARTER_MAP[monsterId];

    // 스타터 몬스터 생성 및 파티에 추가
    const starter = createMonsterInstance(monsterId, 5);
    gameState.party.push(starter);

    // 도감에 등록
    if (!gameState.pokedex[monsterId]) {
        gameState.pokedex[monsterId] = { seen: true, caught: true };
    } else {
        gameState.pokedex[monsterId].caught = true;
    }

    // choose_starter 씬 완료 후 다음 대화 표시
    if (!storyState.completedScenes.includes('choose_starter')) {
        storyState.completedScenes.push('choose_starter');
    }

    // 씬 대화 표시 (선택 후 대화)
    const scene = STORY_SCENES['choose_starter'];
    if (scene && scene.dialogues.length > 0) {
        storyState.currentScene = 'choose_starter';
        storyState.currentDialogueIndex = 0;
        showScreen('story-dialogue-screen');
        showCurrentDialogue();
    } else {
        showStoryMap();
    }
}

// 스토리 맵 표시
function showStoryMap() {
    showScreen('story-map-screen');
    renderStoryMap();

    // 챕터 표시 업데이트
    const chapterEl = document.getElementById('story-chapter');
    if (chapterEl) {
        const chapter = STORY_CHAPTERS[storyState.currentChapter];
        chapterEl.textContent = chapter ? chapter.name : '모험';
    }
}

// 스토리 맵 렌더링
function renderStoryMap() {
    const container = document.getElementById('story-map-container');
    container.innerHTML = '';

    for (const [locationId, location] of Object.entries(STORY_LOCATIONS)) {
        const isUnlocked = storyState.unlockedLocations.includes(locationId);
        const isCurrent = storyState.currentLocation === locationId;
        const hasEvent = checkLocationEvent(locationId);

        const locationEl = document.createElement('div');
        locationEl.className = 'map-location';
        if (!isUnlocked) locationEl.classList.add('locked');
        if (isCurrent) locationEl.classList.add('current');
        if (hasEvent) locationEl.classList.add('has-event');

        // 장소 아이콘
        const iconEmoji = getLocationIcon(locationId);

        locationEl.innerHTML = `
            <span class="icon">${iconEmoji}</span>
            <span class="name">${location.name}</span>
        `;

        if (isUnlocked) {
            locationEl.addEventListener('click', () => enterLocation(locationId));
        }

        container.appendChild(locationEl);
    }
}

// 장소 아이콘 가져오기
function getLocationIcon(locationId) {
    const icons = {
        player_house: '🏠',
        hometown: '🏘️',
        lab: '🔬',
        cafe: '☕',
        route1: '🛤️',
        forest_entrance: '🌲',
        forest_deep: '🌳',
        lake_area: '🌅',
        mountain_base: '⛰️',
        cave_entrance: '🕳️'
    };
    return icons[locationId] || '📍';
}

// 장소 이벤트 확인
function checkLocationEvent(locationId) {
    // 현재 챕터에서 해당 장소에 진행할 씬이 있는지 확인
    const chapter = STORY_CHAPTERS[storyState.currentChapter];
    if (!chapter) return false;

    for (const sceneId of chapter.scenes) {
        if (storyState.completedScenes.includes(sceneId)) continue;

        const scene = STORY_SCENES[sceneId];
        if (scene && scene.location === locationId) {
            return true;
        }
    }
    return false;
}

// 장소 입장
function enterLocation(locationId) {
    storyState.currentLocation = locationId;

    // 해당 장소에 진행할 씬이 있는지 확인
    const chapter = STORY_CHAPTERS[storyState.currentChapter];
    if (chapter) {
        for (const sceneId of chapter.scenes) {
            if (storyState.completedScenes.includes(sceneId)) continue;

            const scene = STORY_SCENES[sceneId];
            if (scene && scene.location === locationId) {
                playScene(sceneId);
                return;
            }
        }
    }

    // 씬이 없으면 장소 화면 표시
    showLocationScreen(locationId);
}

// 장소 화면 표시
function showLocationScreen(locationId) {
    const location = STORY_LOCATIONS[locationId];
    if (!location) return;

    showScreen('story-location-screen');

    // 배경 설정
    const bgEl = document.getElementById('location-background');
    bgEl.style.backgroundImage = `url('${IMAGE_PATHS.locations}${location.background}')`;
    bgEl.style.backgroundColor = '#1a1a2e';

    // 장소 정보
    document.getElementById('location-name').textContent = location.name;
    document.getElementById('location-description').textContent = location.description;

    // 행동 버튼
    const actionsEl = document.getElementById('location-actions');
    actionsEl.innerHTML = '';

    if (location.canExplore && location.exploreRegion) {
        const exploreBtn = document.createElement('button');
        exploreBtn.className = 'location-action-btn';
        exploreBtn.textContent = '🔍 탐험하기';
        exploreBtn.addEventListener('click', () => {
            storyState.lastLocation = locationId;
            gameState.currentRegion = location.exploreRegion;
            startExploreFromStory();
        });
        actionsEl.appendChild(exploreBtn);
    }

    // NPC 표시
    const npcsEl = document.getElementById('location-npcs');
    npcsEl.innerHTML = '';

    if (location.npcs && location.npcs.length > 0) {
        for (const npcId of location.npcs) {
            const npc = NPCS[npcId];
            if (!npc) continue;

            const npcCard = document.createElement('div');
            npcCard.className = 'npc-card';
            npcCard.innerHTML = `
                <span class="npc-icon">${NPC_EMOJIS[npcId] || '👤'}</span>
                <span class="npc-name">${npc.name}</span>
            `;
            npcCard.addEventListener('click', () => talkToNpc(npcId));
            npcsEl.appendChild(npcCard);
        }
    }

    // 이동 가능한 장소
    const navEl = document.getElementById('location-nav');
    navEl.innerHTML = `
        <div class="location-nav-title">이동하기:</div>
        <div class="location-nav-grid" id="nav-grid"></div>
    `;

    const navGrid = document.getElementById('nav-grid');
    for (const connectedId of location.connectedTo) {
        if (!storyState.unlockedLocations.includes(connectedId)) continue;

        const connectedLocation = STORY_LOCATIONS[connectedId];
        if (!connectedLocation) continue;

        const navBtn = document.createElement('button');
        navBtn.className = 'nav-location-btn';
        navBtn.textContent = `${getLocationIcon(connectedId)} ${connectedLocation.name}`;
        navBtn.addEventListener('click', () => enterLocation(connectedId));
        navGrid.appendChild(navBtn);
    }
}

// NPC와 대화
function talkToNpc(npcId) {
    // 해당 NPC의 현재 장소에서의 대화 씬 찾기
    const sceneId = `${npcId}_chat_${storyState.currentLocation}`;

    // 특수 대화가 있는지 확인
    if (STORY_SCENES[sceneId]) {
        playScene(sceneId);
        return;
    }

    // 기본 대화
    if (STORY_SCENES[`${npcId}_chat`]) {
        playScene(`${npcId}_chat`);
        return;
    }

    // 대화가 없으면 간단한 인사
    const npc = NPCS[npcId];
    showQuickDialogue(npc.name, `안녕하세요, ${gameState.playerName}!`);
}

// 간단한 대화 표시
function showQuickDialogue(speaker, text) {
    showScreen('story-dialogue-screen');

    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');

    speakerEl.textContent = speaker;
    textEl.textContent = text;

    // 클릭하면 장소 화면으로 돌아가기
    setTimeout(() => {
        const dialogueBox = document.querySelector('.dialogue-box');
        const returnHandler = () => {
            dialogueBox.removeEventListener('click', returnHandler);
            showLocationScreen(storyState.currentLocation);
        };
        dialogueBox.addEventListener('click', returnHandler);
    }, 100);
}

// 스토리 맵으로 돌아가기
function returnToStoryMap() {
    showStoryMap();
}

// 스토리에서 탐험 시작
function startExploreFromStory() {
    // 기존 탐험 화면으로 전환
    showScreen('explore-screen');
    renderRegions();

    // 현재 지역으로 바로 이동하여 야생 배틀 시작
    const region = REGIONS[gameState.currentRegion];
    if (region) {
        exploreRegion(gameState.currentRegion);
    }
}

// 스토리에서 야생 배틀 시작
function startWildBattleFromStory(level) {
    const location = STORY_LOCATIONS[storyState.currentLocation];
    if (location && location.exploreRegion) {
        gameState.currentRegion = location.exploreRegion;
    }

    const region = REGIONS[gameState.currentRegion] || REGIONS['meadow'];

    // 랜덤 몬스터 선택
    const monsterPool = region.monsters;
    const randomMonsterId = monsterPool[Math.floor(Math.random() * monsterPool.length)];

    // 적 몬스터 생성
    const enemyMonster = createMonsterInstance(randomMonsterId, level);

    // 배틀 시작
    startBattle(enemyMonster);
}

// 라이벌 배틀
function startRivalBattle() {
    if (!storyState.rivalStarter) {
        storyState.rivalStarter = 'aquapup';
    }

    // 라이벌의 팀 생성 (스타터 + 랜덤)
    const rivalTeam = [];

    // 라이벌 스타터 (플레이어보다 레벨 높음)
    const playerLevel = gameState.party[0] ? gameState.party[0].level : 5;
    rivalTeam.push(createMonsterInstance(storyState.rivalStarter, playerLevel + 2));

    // 트레이너 배틀 시작
    startTrainerBattle(rivalTeam, '민수');
}

// 트레이너 배틀 (NPC)
function startTrainerBattle(enemyTeam, trainerName) {
    // 트레이너 배틀 구현 필요
    // 일단 첫 번째 몬스터와 배틀
    if (enemyTeam.length > 0) {
        startBattle(enemyTeam[0]);
    }
}

// 스토리 진행 저장
function saveStoryProgress() {
    gameState.storyProgress = {
        isStoryMode: storyState.isStoryMode,
        currentChapter: storyState.currentChapter,
        completedChapters: storyState.completedChapters,
        completedScenes: storyState.completedScenes,
        unlockedLocations: storyState.unlockedLocations,
        currentLocation: storyState.currentLocation,
        playerGender: storyState.playerGender,
        starterMonster: storyState.starterMonster,
        rivalStarter: storyState.rivalStarter
    };

    saveGame();
}

// 스토리 진행 로드
function loadStoryProgress() {
    if (gameState.storyProgress) {
        storyState = { ...storyState, ...gameState.storyProgress };
    }
}

// 배틀 종료 후 스토리 복귀
function returnToStoryAfterBattle() {
    if (storyState.isStoryMode) {
        // 다음 씬이 있으면 진행
        const scene = STORY_SCENES[storyState.currentScene];
        if (scene && scene.nextScene) {
            playScene(scene.nextScene);
        } else {
            // 맵으로 돌아가기
            showStoryMap();
        }
    } else {
        showScreen('explore-screen');
    }
}
