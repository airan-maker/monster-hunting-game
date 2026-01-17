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
    nurse: '👩‍⚕️',
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
        // 플레이어 이미지 사용
        const playerImg = storyState.playerGender === 'boy' ? 'player_boy.png' : 'player_girl.png';
        const img = new Image();
        img.src = `${IMAGE_PATHS.player}${playerImg}`;

        img.onload = () => {
            portraitEl.style.backgroundImage = `url('${IMAGE_PATHS.player}${playerImg}')`;
            portraitEl.textContent = '';
            portraitEl.style.fontSize = '';
        };

        img.onerror = () => {
            // 이미지 로드 실패 시 이모지 폴백
            portraitEl.style.backgroundImage = 'none';
            portraitEl.textContent = storyState.playerGender === 'boy' ? '👦' : '👧';
            portraitEl.style.fontSize = '4rem';
            portraitEl.style.display = 'flex';
            portraitEl.style.justifyContent = 'center';
            portraitEl.style.alignItems = 'center';
        };

        // 초기 설정 (이미지 로드 전)
        portraitEl.style.backgroundImage = `url('${IMAGE_PATHS.player}${playerImg}')`;
        portraitEl.textContent = '';
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

        // 장소 아이콘 (이미지 또는 이모지)
        const iconPath = getLocationIconPath(locationId);
        const iconEmoji = getLocationIconEmoji(locationId);

        const iconSpan = document.createElement('span');
        iconSpan.className = 'icon';

        if (iconPath) {
            const iconImg = document.createElement('img');
            iconImg.src = iconPath;
            iconImg.alt = location.name;
            iconImg.className = 'map-icon-img';
            iconImg.onerror = () => {
                // 이미지 로드 실패 시 이모지로 대체
                iconSpan.innerHTML = iconEmoji;
            };
            iconSpan.appendChild(iconImg);
        } else {
            iconSpan.textContent = iconEmoji;
        }

        const nameSpan = document.createElement('span');
        nameSpan.className = 'name';
        nameSpan.textContent = location.name;

        locationEl.appendChild(iconSpan);
        locationEl.appendChild(nameSpan);

        if (isUnlocked) {
            locationEl.addEventListener('click', () => enterLocation(locationId));
        }

        container.appendChild(locationEl);
    }
}

// 장소 아이콘 가져오기 (이모지 폴백)
function getLocationIconEmoji(locationId) {
    const icons = {
        player_house: '🏠',
        hometown: '🏘️',
        lab: '🔬',
        cafe: '☕',
        pokemon_center: '🏥',
        route1: '🛤️',
        forest_entrance: '🌲',
        forest_deep: '🌳',
        lake_area: '🌅',
        mountain_base: '⛰️',
        cave_entrance: '🕳️'
    };
    return icons[locationId] || '📍';
}

// 장소 아이콘 이미지 경로 가져오기
function getLocationIconPath(locationId) {
    if (MAP_ICONS[locationId]) {
        return IMAGE_PATHS.icons + MAP_ICONS[locationId];
    }
    return null;
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

    // 치료 버튼 (몬스터 센터)
    if (location.canHeal) {
        const healBtn = document.createElement('button');
        healBtn.className = 'location-action-btn heal-btn';
        healBtn.textContent = '💊 몬스터 치료하기';
        healBtn.addEventListener('click', () => {
            healAllMonsters();
        });
        actionsEl.appendChild(healBtn);
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

        // 아이콘 이미지 또는 이모지 추가
        const navIconPath = getLocationIconPath(connectedId);
        const navIconEmoji = getLocationIconEmoji(connectedId);

        if (navIconPath) {
            const navIcon = document.createElement('img');
            navIcon.src = navIconPath;
            navIcon.className = 'nav-icon-img';
            navIcon.alt = connectedLocation.name;
            navIcon.onerror = () => {
                navBtn.innerHTML = `${navIconEmoji} ${connectedLocation.name}`;
            };
            navBtn.appendChild(navIcon);
            navBtn.appendChild(document.createTextNode(` ${connectedLocation.name}`));
        } else {
            navBtn.textContent = `${navIconEmoji} ${connectedLocation.name}`;
        }

        navBtn.addEventListener('click', () => enterLocation(connectedId));
        navGrid.appendChild(navBtn);
    }
}

// NPC와 대화
function talkToNpc(npcId) {
    // 동적 대화 처리 NPC들
    if (npcId === 'nurse') {
        showNurseDialogue();
        return;
    }

    if (npcId === 'professor') {
        showProfessorDialogue();
        return;
    }

    if (npcId === 'mom') {
        showMomDialogue();
        return;
    }

    if (npcId === 'cafe_owner') {
        showCafeOwnerDialogue();
        return;
    }

    if (npcId === 'rival') {
        showRivalDialogue();
        return;
    }

    if (npcId === 'villager_old_man') {
        showVillagerOldManDialogue();
        return;
    }

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

// 박사님 동적 대화
function showProfessorDialogue() {
    showScreen('story-dialogue-screen');

    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');
    const portraitEl = document.getElementById('dialogue-portrait');
    const choicesEl = document.getElementById('dialogue-choices');

    speakerEl.textContent = '오크 박사';
    speakerEl.style.display = 'block';
    choicesEl.classList.add('hidden');

    // 박사 이미지 설정
    setNpcPortrait(portraitEl, 'professor', 'normal');

    // 파티가 없으면 스타터 선택 씬으로
    if (gameState.party.length === 0) {
        // 스타터 선택 씬 재생
        if (!storyState.completedScenes.includes('meet_professor')) {
            playScene('meet_professor');
            return;
        }
        textEl.textContent = `${gameState.playerName}, 어서 몬스터를 골라보렴! 세 마리가 널 기다리고 있단다.`;
        showDialogueReturnHandler();
        return;
    }

    // 파티가 있으면 다양한 조언 제공
    const tips = getProfessorTips();
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    textEl.textContent = randomTip;
    setNpcPortrait(portraitEl, 'professor', 'happy');
    showDialogueReturnHandler();
}

// 박사님 팁 목록 생성
function getProfessorTips() {
    const tips = [];
    const party = gameState.party;
    const pokedexCount = Object.keys(gameState.pokedex).filter(k => gameState.pokedex[k].caught).length;
    const totalMonsters = Object.keys(MONSTERS).length;

    // 파티 상태에 따른 팁
    if (party.length === 1) {
        tips.push(`${gameState.playerName}! ${party[0].name}과(와) 사이가 좋아 보이는구나. 더 많은 몬스터를 포획해서 팀을 구성해보는 건 어떨까?`);
    }

    if (party.length >= 3) {
        tips.push(`오, 벌써 ${party.length}마리나 모았구나! 다양한 속성의 몬스터로 팀을 구성하면 어떤 상대도 이길 수 있단다.`);
    }

    // 도감 진행도에 따른 팁
    if (pokedexCount < 5) {
        tips.push(`아직 도감에 ${pokedexCount}종류밖에 없구나. 1번 도로 풀숲에는 다양한 몬스터들이 있으니 탐험해보렴!`);
    } else if (pokedexCount >= 10) {
        tips.push(`대단해! 벌써 ${pokedexCount}종류나 발견했구나! 전체 ${totalMonsters}종류 중에서 정말 잘하고 있어.`);
    }

    // 파티 레벨에 따른 팁
    const avgLevel = Math.floor(party.reduce((sum, m) => sum + m.level, 0) / party.length);
    if (avgLevel >= 10) {
        tips.push(`몬스터들이 많이 성장했구나! 평균 레벨이 ${avgLevel}이라니. 곧 진화할 수 있는 몬스터도 있을 거야.`);
    }

    // 속성 관련 팁
    const types = [...new Set(party.map(m => MONSTERS[m.baseId]?.type))];
    if (types.length === 1) {
        tips.push(`팀이 전부 ${getTypeName(types[0])} 속성이구나. 상성을 고려해서 다른 속성 몬스터도 포획해보는 게 좋겠어!`);
    }

    // 일반 팁들
    tips.push(`알고 있니? 불 속성은 풀에게 강하고, 풀은 물에게 강하고, 물은 불에게 강하단다. 상성을 잘 활용해봐!`);
    tips.push(`몬스터들은 배틀을 통해 경험치를 얻고 성장한단다. 꾸준히 훈련시키는 게 중요해!`);
    tips.push(`희귀한 몬스터일수록 포획하기 어렵단다. 먼저 HP를 낮추고 포획을 시도해봐!`);
    tips.push(`숲 깊은 곳에는 희귀한 몬스터들이 있다는 소문이 있어. 하지만 조심해야 해!`);
    tips.push(`몬스터가 지치면 몬스터 센터에서 치료받을 수 있단다. 간호사 조이가 잘 돌봐줄 거야!`);
    tips.push(`진화하는 몬스터들은 특정 레벨에 도달하면 더 강해진단다. 기대해봐!`);

    // 현재 위치에 따른 팁
    if (storyState.unlockedLocations.includes('forest_entrance')) {
        tips.push(`숲 입구를 발견했구나! 그곳에는 벌레 속성이나 풀 속성 몬스터가 많이 있단다.`);
    }

    if (storyState.unlockedLocations.includes('lake_area')) {
        tips.push(`신비의 호수에서는 물 속성 몬스터를 많이 만날 수 있어. 드래곤 타입도 가끔 나타난다더군!`);
    }

    return tips;
}

// 엄마 동적 대화
function showMomDialogue() {
    showScreen('story-dialogue-screen');

    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');
    const portraitEl = document.getElementById('dialogue-portrait');
    const choicesEl = document.getElementById('dialogue-choices');

    speakerEl.textContent = '엄마';
    speakerEl.style.display = 'block';
    choicesEl.classList.add('hidden');

    setNpcPortrait(portraitEl, 'mom', 'normal');

    const messages = getMomMessages();
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    textEl.textContent = randomMsg;
    showDialogueReturnHandler();
}

// 엄마 대사 목록
function getMomMessages() {
    const messages = [];
    const party = gameState.party;

    if (party.length === 0) {
        messages.push(`${gameState.playerName}, 오크 박사님이 연구소에서 기다리고 계셔. 어서 가보렴!`);
        messages.push(`첫 몬스터를 받으러 가는 거지? 정말 기대되는구나!`);
    } else {
        // 파티 상태에 따른 대사
        const firstMonster = party[0];
        messages.push(`${firstMonster.name}와(과) 사이좋게 지내고 있니? 파트너를 소중히 여기렴.`);
        messages.push(`모험은 잘 되어가니? 힘들면 언제든 집에 와서 쉬어도 돼.`);
        messages.push(`밖에서 조심해야 해! 그리고 밥은 잘 챙겨먹고?`);
        messages.push(`${gameState.playerName}, 넌 훌륭한 트레이너가 될 거야. 엄마는 항상 응원해!`);

        // HP가 낮은 몬스터가 있을 때
        const injuredMonster = party.find(m => m.stats.hp < m.stats.maxHp * 0.5);
        if (injuredMonster) {
            messages.push(`어머, ${injuredMonster.name}이(가) 많이 지쳐 보이는구나. 몬스터 센터에 가보는 게 좋겠어.`);
        }

        // 파티가 많을 때
        if (party.length >= 4) {
            messages.push(`벌써 ${party.length}마리나 모았구나! 우리 ${gameState.playerName}이(가) 정말 대단해!`);
        }
    }

    return messages;
}

// 카페 주인 동적 대화
function showCafeOwnerDialogue() {
    showScreen('story-dialogue-screen');

    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');
    const portraitEl = document.getElementById('dialogue-portrait');
    const choicesEl = document.getElementById('dialogue-choices');

    speakerEl.textContent = '카페 주인';
    speakerEl.style.display = 'block';
    choicesEl.classList.add('hidden');

    setNpcPortrait(portraitEl, 'cafe_owner', 'normal');

    const messages = getCafeOwnerMessages();
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    textEl.textContent = randomMsg;
    showDialogueReturnHandler();
}

// 카페 주인 대사 목록
function getCafeOwnerMessages() {
    const messages = [];

    messages.push(`어서와! 오늘도 맛있는 커피가 준비되어 있단다. 쉬었다 가렴!`);
    messages.push(`요즘 숲에서 이상한 소리가 들린다는 소문이 있어. 조심해!`);
    messages.push(`민수라는 아이가 아까 들렀더구나. 너랑 배틀하고 싶다고 했어.`);
    messages.push(`1번 도로 풀숲에서 희귀한 몬스터를 봤다는 손님이 있었어. 운이 좋으면 만날 수 있을지도?`);

    // 진행도에 따른 대사
    if (storyState.unlockedLocations.includes('forest_deep')) {
        messages.push(`숲 깊은 곳까지 갔었구나? 대단해! 거기에 수상한 사람이 있다던데...`);
    }

    if (storyState.unlockedLocations.includes('lake_area')) {
        messages.push(`신비의 호수에 다녀왔니? 그곳은 정말 아름답지. 물 속성 몬스터들의 낙원이야.`);
    }

    if (storyState.completedChapters.includes('chapter3')) {
        messages.push(`수상한 사람을 만났다고? 그 사람... 예전부터 가끔 마을에 나타나곤 했어. 뭔가 알고 있는 것 같기도 하고...`);
    }

    messages.push(`트레이너들 사이에서는 진화한 몬스터가 훨씬 강하다고 해. 레벨을 올려봐!`);
    messages.push(`포션이 떨어지면 힘들지. 상점에서 미리미리 사두는 게 좋아!`);

    return messages;
}

// 라이벌 동적 대화
function showRivalDialogue() {
    showScreen('story-dialogue-screen');

    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');
    const portraitEl = document.getElementById('dialogue-portrait');
    const choicesEl = document.getElementById('dialogue-choices');

    speakerEl.textContent = '민수';
    speakerEl.style.display = 'block';
    choicesEl.classList.add('hidden');

    setNpcPortrait(portraitEl, 'rival', 'normal');

    const messages = getRivalMessages();
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    textEl.textContent = randomMsg;
    showDialogueReturnHandler();
}

// 라이벌 대사 목록
function getRivalMessages() {
    const messages = [];
    const party = gameState.party;

    if (party.length === 0) {
        messages.push(`${gameState.playerName}! 아직 첫 몬스터 안 받았어? 나는 벌써 받았다고!`);
        messages.push(`빨리 박사님한테 가봐! 늦으면 좋은 몬스터 다 뺏길지도 몰라~`);
    } else {
        messages.push(`오, ${party[0].name}을(를) 골랐구나? 나쁘지 않은 선택이야!`);
        messages.push(`나도 열심히 훈련하고 있어. 다음에 만나면 배틀하자!`);
        messages.push(`${gameState.playerName}, 너 실력 많이 늘었지? 다음엔 내가 이길 거야!`);
        messages.push(`나는 지금 새로운 몬스터를 찾아다니는 중이야. 너도 열심히 해!`);

        // 레벨에 따른 대사
        const avgLevel = Math.floor(party.reduce((sum, m) => sum + m.level, 0) / party.length);
        if (avgLevel >= 10) {
            messages.push(`우와, 몬스터들이 많이 강해졌네! 나도 더 열심히 해야겠어!`);
        }

        // 챕터 진행에 따른 대사
        if (storyState.completedChapters.includes('chapter4')) {
            messages.push(`저번에 졌지만... 다음엔 절대 안 져! 기다려!`);
        }
    }

    return messages;
}

// 마을 노인 동적 대화
function showVillagerOldManDialogue() {
    showScreen('story-dialogue-screen');

    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');
    const portraitEl = document.getElementById('dialogue-portrait');
    const choicesEl = document.getElementById('dialogue-choices');

    speakerEl.textContent = '마을 노인';
    speakerEl.style.display = 'block';
    choicesEl.classList.add('hidden');

    setNpcPortrait(portraitEl, 'villager_old_man', 'normal');

    const messages = getVillagerOldManMessages();
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    textEl.textContent = randomMsg;
    showDialogueReturnHandler();
}

// 마을 노인 대사 목록
function getVillagerOldManMessages() {
    const messages = [];

    messages.push(`젊은이, 몬스터 여행은 재미있지? 나도 젊었을 때 많이 다녔단다.`);
    messages.push(`이 마을은 평화롭지만, 숲 너머에는 위험한 곳도 있으니 조심하거라.`);
    messages.push(`오크 박사님은 정말 대단한 분이야. 몬스터에 대해 모르는 게 없으시지.`);

    // 진행도에 따른 대사
    if (gameState.party.length > 0) {
        messages.push(`오, 좋은 몬스터를 데리고 있구나! 잘 키우면 훌륭한 파트너가 될 거야.`);
    }

    if (storyState.unlockedLocations.includes('forest_entrance')) {
        messages.push(`숲에 들어갔구나? 옛날에는 그 숲이 훨씬 더 깊었단다...`);
    }

    if (storyState.completedChapters.includes('chapter3')) {
        messages.push(`수상한 사람? 아, 그 검은 망토를 입은 사람 말이지? 예전부터 가끔 보였어... 뭔가 아는 것 같기도 하고.`);
    }

    messages.push(`몬스터 센터는 언제나 열려 있으니, 지치면 쉬었다 가거라.`);
    messages.push(`카페의 커피는 맛있단다. 한 잔 마시고 가렴.`);

    return messages;
}

// NPC 초상화 설정 헬퍼 함수
function setNpcPortrait(portraitEl, npcId, emotion) {
    const emotionFile = emotion ? `_${emotion}` : '_normal';
    const imagePath = `${IMAGE_PATHS.npcs}${npcId}${emotionFile}.png`;

    portraitEl.style.backgroundImage = `url('${imagePath}')`;
    portraitEl.textContent = '';
    portraitEl.classList.remove('narrator');

    // 이미지 로드 실패 시 이모지
    const testImg = new Image();
    testImg.onerror = () => {
        portraitEl.style.backgroundImage = 'none';
        portraitEl.textContent = NPC_EMOJIS[npcId] || '👤';
        portraitEl.style.fontSize = '4rem';
        portraitEl.style.display = 'flex';
        portraitEl.style.justifyContent = 'center';
        portraitEl.style.alignItems = 'center';
    };
    testImg.src = imagePath;
}

// 대화 후 돌아가기 핸들러 (범용)
function showDialogueReturnHandler() {
    setTimeout(() => {
        const dialogueBox = document.querySelector('.dialogue-box');
        const returnHandler = () => {
            dialogueBox.removeEventListener('click', returnHandler);
            showLocationScreen(storyState.currentLocation);
        };
        dialogueBox.addEventListener('click', returnHandler);
    }, 100);
}

// 간호사 동적 대화
function showNurseDialogue() {
    showScreen('story-dialogue-screen');

    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');
    const portraitEl = document.getElementById('dialogue-portrait');
    const choicesEl = document.getElementById('dialogue-choices');

    speakerEl.textContent = '간호사 조이';
    speakerEl.style.display = 'block';

    // 간호사 이미지 설정
    portraitEl.style.backgroundImage = `url('${IMAGE_PATHS.npcs}nurse_normal.png')`;
    portraitEl.textContent = '';
    portraitEl.classList.remove('narrator');

    // 이미지 로드 실패 시 이모지
    const testImg = new Image();
    testImg.onerror = () => {
        portraitEl.style.backgroundImage = 'none';
        portraitEl.textContent = '👩‍⚕️';
        portraitEl.style.fontSize = '4rem';
        portraitEl.style.display = 'flex';
        portraitEl.style.justifyContent = 'center';
        portraitEl.style.alignItems = 'center';
    };
    testImg.src = `${IMAGE_PATHS.npcs}nurse_normal.png`;

    // 파티 상태 확인
    if (gameState.party.length === 0) {
        textEl.textContent = `안녕하세요, ${gameState.playerName}님! 몬스터 센터에 오신 것을 환영해요. 아직 파트너 몬스터가 없으시네요. 모험을 시작하시면 언제든 찾아와 주세요! 💕`;
        showNurseReturnHandler();
        return;
    }

    // HP가 낮은 몬스터 찾기
    const injuredMonsters = [];
    const criticalMonsters = [];

    gameState.party.forEach(monster => {
        const hpPercent = (monster.stats.hp / monster.stats.maxHp) * 100;
        const monsterName = MONSTERS[monster.id]?.name || monster.name || '몬스터';

        if (hpPercent <= 0) {
            criticalMonsters.push({ name: monsterName, hp: 0 });
        } else if (hpPercent < 50) {
            criticalMonsters.push({ name: monsterName, hp: Math.round(hpPercent) });
        } else if (hpPercent < 100) {
            injuredMonsters.push({ name: monsterName, hp: Math.round(hpPercent) });
        }
    });

    let message = '';

    if (criticalMonsters.length > 0) {
        // 심각한 상태의 몬스터가 있음
        const names = criticalMonsters.map(m => m.name).join(', ');
        message = `어머, ${gameState.playerName}님! ${names}의 상태가 많이 안 좋아 보여요! 😰 빨리 치료해 드릴게요. 치료를 받으시겠어요?`;
        portraitEl.style.backgroundImage = `url('${IMAGE_PATHS.npcs}nurse_normal.png')`;
    } else if (injuredMonsters.length > 0) {
        // 약간 다친 몬스터가 있음
        const names = injuredMonsters.map(m => m.name).join(', ');
        message = `안녕하세요, ${gameState.playerName}님! ${names}이(가) 조금 지쳐 보이네요. 치료해 드릴까요? 💊`;
    } else {
        // 모두 건강함
        message = `안녕하세요, ${gameState.playerName}님! 어머, 몬스터들이 모두 건강하네요! ✨ 훌륭하게 관리하고 계시군요. 언제든 도움이 필요하면 찾아와 주세요! 💕`;
        portraitEl.style.backgroundImage = `url('${IMAGE_PATHS.npcs}nurse_happy.png')`;
        testImg.src = `${IMAGE_PATHS.npcs}nurse_happy.png`;
        textEl.textContent = message;
        showNurseReturnHandler();
        return;
    }

    textEl.textContent = message;

    // 선택지 표시
    choicesEl.innerHTML = '';
    choicesEl.classList.remove('hidden');

    const healBtn = document.createElement('button');
    healBtn.className = 'dialogue-choice-btn';
    healBtn.textContent = '💊 네, 치료해 주세요!';
    healBtn.onclick = () => {
        choicesEl.classList.add('hidden');
        healAllMonsters();
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'dialogue-choice-btn';
    cancelBtn.textContent = '아니요, 괜찮아요';
    cancelBtn.onclick = () => {
        choicesEl.classList.add('hidden');
        textEl.textContent = '알겠어요! 언제든 도움이 필요하면 말씀해 주세요. 😊';
        showNurseReturnHandler();
    };

    choicesEl.appendChild(healBtn);
    choicesEl.appendChild(cancelBtn);
}

// 간호사 대화 후 돌아가기 핸들러
function showNurseReturnHandler() {
    setTimeout(() => {
        const dialogueBox = document.querySelector('.dialogue-box');
        const returnHandler = () => {
            dialogueBox.removeEventListener('click', returnHandler);
            showLocationScreen(storyState.currentLocation);
        };
        dialogueBox.addEventListener('click', returnHandler);
    }, 100);
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

// 모든 몬스터 치료
function healAllMonsters() {
    if (gameState.party.length === 0) {
        showHealMessage('치료할 몬스터가 없습니다.');
        return;
    }

    // 모든 파티 몬스터 HP 완전 회복
    let healedCount = 0;
    gameState.party.forEach(monster => {
        if (monster.stats.hp < monster.stats.maxHp) {
            monster.stats.hp = monster.stats.maxHp;
            healedCount++;
        }
    });

    // 보관함 몬스터도 회복
    if (gameState.storage) {
        gameState.storage.forEach(monster => {
            if (monster.stats.hp < monster.stats.maxHp) {
                monster.stats.hp = monster.stats.maxHp;
            }
        });
    }

    saveGame();

    if (healedCount > 0) {
        showHealMessage('모든 몬스터가 완전히 회복되었습니다! 💕');
    } else {
        showHealMessage('모든 몬스터가 이미 건강합니다! ✨');
    }
}

// 치료 메시지 표시
function showHealMessage(message) {
    // 대화 화면을 사용하여 메시지 표시
    showScreen('story-dialogue-screen');

    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');
    const portraitEl = document.getElementById('dialogue-portrait');

    speakerEl.textContent = '간호사 조이';
    speakerEl.style.display = 'block';

    // 간호사 이미지 설정
    portraitEl.style.backgroundImage = `url('${IMAGE_PATHS.npcs}nurse_happy.png')`;
    portraitEl.textContent = '';
    portraitEl.classList.remove('narrator');

    // 이미지 로드 실패 시 이모지
    const testImg = new Image();
    testImg.onerror = () => {
        portraitEl.style.backgroundImage = 'none';
        portraitEl.textContent = '👩‍⚕️';
        portraitEl.style.fontSize = '4rem';
        portraitEl.style.display = 'flex';
        portraitEl.style.justifyContent = 'center';
        portraitEl.style.alignItems = 'center';
    };
    testImg.src = `${IMAGE_PATHS.npcs}nurse_happy.png`;

    textEl.textContent = message;

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
