// 게임 상태
let gameState = {
    playerName: '트레이너',
    party: [],        // 파티 몬스터 (최대 6마리)
    storage: [],      // 보관함
    pokedex: {},      // 도감 (discovered/caught)
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

// 배틀 상태
let battleState = {
    wildMonster: null,
    playerMonster: null,
    playerMonsterIndex: 0,
    isPlayerTurn: true,
    battleEnded: false,
    switchCount: 0,       // 교체 횟수
    maxSwitches: 6        // 최대 교체 횟수
};

// 화면 히스토리
let screenHistory = [];

// 이미지 로딩 캐시
let imageCache = {};

// 게임 초기화
function init() {
    loadGame();

    // 스토리 진행 로드
    if (typeof loadStoryProgress === 'function') {
        loadStoryProgress();
    }

    preloadImages();
    renderRegions();
    updateUI();
}

// 이미지 프리로드
function preloadImages() {
    // 몬스터 이미지 프리로드
    Object.keys(MONSTERS).forEach(id => {
        const path = getMonsterImagePath(id);
        if (path) {
            const img = new Image();
            img.src = path;
            imageCache[path] = img;
        }
    });

    // 이펙트 이미지 프리로드
    const types = ['fire', 'water', 'grass', 'electric', 'ground', 'ice', 'psychic', 'dark', 'normal', 'magic', 'hit'];
    types.forEach(type => {
        const path = getEffectImagePath(type);
        const img = new Image();
        img.src = path;
        imageCache[path] = img;
    });
}

// 몬스터 스프라이트 렌더링 (이미지 또는 이모지)
function renderMonsterSprite(monster, elementId) {
    const element = document.getElementById(elementId);
    const imagePath = getMonsterImagePath(monster.baseId);

    // 이미지 파일 존재 여부 체크
    checkImageExists(imagePath).then(exists => {
        if (exists) {
            element.innerHTML = `<img src="${imagePath}" alt="${monster.name}" />`;
            element.classList.add('has-image');
        } else {
            element.textContent = monster.emoji;
            element.classList.remove('has-image');
        }
    });
}

// 이미지 존재 여부 체크
function checkImageExists(url) {
    return new Promise(resolve => {
        if (!url) {
            resolve(false);
            return;
        }
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// 탐험 모드 시작
function startExploreMode() {
    // 파티에 몬스터가 있으면 바로 탐험 화면으로
    if (gameState.party.length > 0) {
        showScreen('explore-screen');
    } else {
        // 파티가 비어있으면 스타터 선택
        initializeExploreMode();
        showExploreStarterSelection();
    }
}

// 탐험 모드 초기화 (새 게임)
function initializeExploreMode() {
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

// 탐험 모드 스타터 선택 화면
function showExploreStarterSelection() {
    const starters = ['flameling', 'aquapup', 'sproutie'];

    const mainMenu = document.getElementById('main-menu');
    mainMenu.innerHTML = `
        <button class="back-btn" onclick="restoreMainMenu()" style="position: absolute; top: 20px; left: 20px;">← 뒤로</button>
        <h2 style="color: #ffd700; margin-bottom: 30px;">첫 번째 파트너를 선택하세요!</h2>
        <div class="starter-grid" style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
            ${starters.map(id => {
                const monster = MONSTERS[id];
                return `
                    <div class="starter-card" onclick="selectExploreStarter('${id}')" style="
                        background: linear-gradient(145deg, #3a3a3a, #2a2a2a);
                        border-radius: 15px;
                        padding: 20px;
                        text-align: center;
                        cursor: pointer;
                        width: 120px;
                        transition: all 0.3s ease;
                    ">
                        <div style="font-size: 3rem;">${monster.emoji}</div>
                        <div style="color: white; font-weight: bold; margin-top: 10px;">${monster.name}</div>
                        <div class="type-${monster.type}" style="
                            display: inline-block;
                            padding: 2px 10px;
                            border-radius: 10px;
                            font-size: 0.8rem;
                            margin-top: 5px;
                        ">${getTypeName(monster.type)}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// 탐험 모드 스타터 선택 (game.js 전용)
function selectExploreStarter(monsterId) {
    const monster = createMonsterInstance(monsterId, 5);
    gameState.party.push(monster);
    gameState.pokedex[monsterId] = { discovered: true, caught: true };

    saveGame();

    // 메인 메뉴 복원
    restoreMainMenu();

    // 탐험 화면으로 이동
    showScreen('explore-screen');
    showMessage(`${monster.name}(을)를 파트너로 선택했습니다!`);
}

// 메인 메뉴 복원
function restoreMainMenu() {
    const mainMenu = document.getElementById('main-menu');
    mainMenu.innerHTML = `
        <div class="user-info" id="user-info">
            <span id="user-display-name">게스트</span>
            <button onclick="signOutUser()" id="logout-btn" class="small-btn">로그아웃</button>
        </div>
        <h1 class="game-title">🎮 몬스터 헌터</h1>
        <p class="subtitle">포켓 어드벤처</p>
        <div class="menu-buttons">
            <button onclick="startStoryMode()">스토리 모드</button>
            <button onclick="startExploreMode()">탐험 모드</button>
            <button onclick="showScreen('pokedex-screen')">도감</button>
        </div>
    `;

    // 사용자 표시 업데이트
    if (typeof updateUserDisplay === 'function') {
        updateUserDisplay();
    }
}

// 화면 전환
function showScreen(screenId) {
    // 현재 화면 저장
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen && currentScreen.id !== screenId) {
        screenHistory.push(currentScreen.id);
    }

    // 모든 화면 숨기기
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // 선택된 화면 표시
    document.getElementById(screenId).classList.add('active');

    // 화면별 초기화
    switch(screenId) {
        case 'explore-screen':
            renderRegions();
            updateUI();
            break;
        case 'pokedex-screen':
            renderPokedex();
            break;
        case 'party-screen':
            renderParty();
            break;
        case 'bag-screen':
            renderBag();
            break;
    }
}

// 뒤로 가기
function goBack() {
    if (screenHistory.length > 0) {
        const prevScreen = screenHistory.pop();
        showScreen(prevScreen);
        screenHistory.pop(); // showScreen에서 추가된 것 제거
    } else {
        showScreen('explore-screen');
    }
}

// 지역 렌더링
function renderRegions() {
    const grid = document.getElementById('region-grid');
    grid.innerHTML = Object.entries(REGIONS).map(([id, region]) => {
        const bgPath = getBackgroundImagePath(id);
        const isSpecial = region.special ? 'magic-realm' : '';

        return `
            <div class="region-card ${isSpecial}"
                 onclick="exploreRegion('${id}')"
                 style="${bgPath ? `--region-bg: url('${bgPath}');` : ''}">
                <span class="emoji">${region.emoji}</span>
                <span class="name">${region.name}</span>
                <span class="level">Lv.${region.levelRange[0]}-${region.levelRange[1]}</span>
            </div>
        `;
    }).join('');

    // 배경 이미지 적용 체크
    Object.keys(REGIONS).forEach(id => {
        const bgPath = getBackgroundImagePath(id);
        if (bgPath) {
            checkImageExists(bgPath).then(exists => {
                if (exists) {
                    const cards = document.querySelectorAll('.region-card');
                    cards.forEach(card => {
                        if (card.onclick && card.onclick.toString().includes(id)) {
                            card.classList.add('has-bg');
                        }
                    });
                }
            });
        }
    });
}

// 지역 탐험
function exploreRegion(regionId) {
    if (gameState.party.length === 0) {
        showMessage('파티에 몬스터가 없습니다!');
        return;
    }

    gameState.currentRegion = regionId;
    const region = REGIONS[regionId];

    // 랜덤 몬스터 조우
    const wildMonster = generateWildMonster(regionId);

    // 도감에 발견 기록
    gameState.pokedex[wildMonster.baseId] = gameState.pokedex[wildMonster.baseId] || { discovered: false, caught: false };
    gameState.pokedex[wildMonster.baseId].discovered = true;

    startBattle(wildMonster);
}

// 야생 몬스터 생성
function generateWildMonster(regionId) {
    const region = REGIONS[regionId];

    // 희귀도 기반 몬스터 선택
    const availableMonsters = region.monsters.map(id => ({
        id,
        monster: MONSTERS[id],
        weight: RARITY_WEIGHTS[MONSTERS[id].rarity]
    }));

    const totalWeight = availableMonsters.reduce((sum, m) => sum + m.weight, 0);
    let random = Math.random() * totalWeight;

    let selectedId = availableMonsters[0].id;
    for (const m of availableMonsters) {
        random -= m.weight;
        if (random <= 0) {
            selectedId = m.id;
            break;
        }
    }

    // 레벨 결정
    const level = Math.floor(Math.random() * (region.levelRange[1] - region.levelRange[0] + 1)) + region.levelRange[0];

    return createMonsterInstance(selectedId, level);
}

// 몬스터 인스턴스 생성
function createMonsterInstance(monsterId, level) {
    const base = MONSTERS[monsterId];

    // 스탯 계산 (레벨 기반)
    const stats = {
        hp: Math.floor(base.baseStats.hp * (1 + level * 0.1)),
        maxHp: Math.floor(base.baseStats.hp * (1 + level * 0.1)),
        atk: Math.floor(base.baseStats.atk * (1 + level * 0.05)),
        def: Math.floor(base.baseStats.def * (1 + level * 0.05)),
        spd: Math.floor(base.baseStats.spd * (1 + level * 0.03))
    };

    return {
        baseId: monsterId,
        name: base.name,
        type: base.type,
        emoji: base.emoji,
        level: level,
        exp: 0,
        expToNext: level * 100,
        stats: stats,
        skills: base.skills.slice(0, Math.min(4, Math.ceil(level / 10) + 1)),
        rarity: base.rarity
    };
}

// 배틀 시작
function startBattle(wildMonster) {
    // 첫 번째 살아있는 몬스터 찾기
    let firstAliveIndex = gameState.party.findIndex(m => m.stats.hp > 0);
    if (firstAliveIndex === -1) firstAliveIndex = 0;

    battleState = {
        wildMonster: wildMonster,
        playerMonster: gameState.party[firstAliveIndex],
        playerMonsterIndex: firstAliveIndex,
        isPlayerTurn: true,
        battleEnded: false,
        switchCount: 0,
        maxSwitches: 6
    };

    // 배경 이미지 설정
    const battleScreen = document.getElementById('battle-screen');
    const bgPath = getBackgroundImagePath(gameState.currentRegion);
    if (bgPath) {
        checkImageExists(bgPath).then(exists => {
            if (exists) {
                battleScreen.style.setProperty('--battle-bg', `url('${bgPath}')`);
                battleScreen.classList.add('has-bg');
            } else {
                battleScreen.classList.remove('has-bg');
            }
        });
    }

    showScreen('battle-screen');
    updateBattleUI();
    showBattleMessage(`야생의 ${wildMonster.name}(이)가 나타났다!`);

    // 배틀 메뉴 표시
    document.getElementById('battle-menu').classList.remove('hidden');
    document.getElementById('skill-menu').classList.add('hidden');
    document.getElementById('switch-menu').classList.add('hidden');
}

// 교체 메뉴 표시
function showSwitchMenu() {
    if (battleState.battleEnded) return;

    const switchMenu = document.getElementById('switch-menu');
    const remainingSwitches = battleState.maxSwitches - battleState.switchCount;

    // 교체 가능 여부 체크
    if (remainingSwitches <= 0) {
        showBattleMessage('더 이상 교체할 수 없습니다! (최대 6회)');
        return;
    }

    // 교체 가능한 몬스터가 있는지 체크
    const availableMonsters = gameState.party.filter((m, i) =>
        i !== battleState.playerMonsterIndex && m.stats.hp > 0
    );

    if (availableMonsters.length === 0) {
        showBattleMessage('교체할 수 있는 몬스터가 없습니다!');
        return;
    }

    // 교체 메뉴 생성
    let menuHTML = `
        <div class="switch-header">
            <span>🔄 몬스터 교체</span>
            <span class="switch-count">남은 교체: ${remainingSwitches}회</span>
        </div>
    `;

    gameState.party.forEach((monster, index) => {
        const isCurrent = index === battleState.playerMonsterIndex;
        const isFainted = monster.stats.hp <= 0;
        const hpPercent = (monster.stats.hp / monster.stats.maxHp) * 100;

        let hpClass = '';
        if (hpPercent <= 25) hpClass = 'critical';
        else if (hpPercent <= 50) hpClass = 'low';

        const disabled = isCurrent || isFainted;
        const slotClass = `switch-slot ${isCurrent ? 'current' : ''} ${isFainted ? 'fainted' : ''}`;

        menuHTML += `
            <button class="${slotClass}"
                    onclick="switchMonster(${index})"
                    ${disabled ? 'disabled' : ''}>
                <span class="sprite">${monster.emoji}</span>
                <div class="info">
                    <span class="name">${monster.name} ${isCurrent ? '(현재)' : ''}</span>
                    <span class="level">Lv.${monster.level}</span>
                </div>
                <span class="hp-info ${hpClass}">
                    ${isFainted ? '기절' : `${monster.stats.hp}/${monster.stats.maxHp}`}
                </span>
            </button>
        `;
    });

    menuHTML += `<button class="switch-back-btn" onclick="hideSwitchMenu()">뒤로</button>`;

    switchMenu.innerHTML = menuHTML;
    document.getElementById('battle-menu').classList.add('hidden');
    document.getElementById('skill-menu').classList.add('hidden');
    switchMenu.classList.remove('hidden');
}

// 교체 메뉴 숨기기
function hideSwitchMenu() {
    document.getElementById('battle-menu').classList.remove('hidden');
    document.getElementById('switch-menu').classList.add('hidden');
}

// 몬스터 교체 실행
async function switchMonster(newIndex) {
    if (battleState.battleEnded) return;
    if (newIndex === battleState.playerMonsterIndex) return;
    if (gameState.party[newIndex].stats.hp <= 0) return;

    hideSwitchMenu();

    const oldMonster = battleState.playerMonster;
    battleState.playerMonsterIndex = newIndex;
    battleState.playerMonster = gameState.party[newIndex];
    battleState.switchCount++;

    showBattleMessage(`${oldMonster.name}, 돌아와!`);
    await delay(1000);

    showBattleMessage(`가랏! ${battleState.playerMonster.name}!`);
    updateBattleUI();
    await delay(1000);

    // 교체 후 적 턴
    await enemyTurn();
}

// 배틀 UI 업데이트
function updateBattleUI() {
    const wild = battleState.wildMonster;
    const player = battleState.playerMonster;

    // 적 몬스터
    document.getElementById('enemy-name').textContent = wild.name;
    document.getElementById('enemy-level').textContent = `Lv.${wild.level}`;
    renderMonsterSprite(wild, 'enemy-sprite');
    updateHpBar('enemy', wild.stats.hp, wild.stats.maxHp);

    // 내 몬스터
    document.getElementById('player-monster-name').textContent = player.name;
    document.getElementById('player-monster-level').textContent = `Lv.${player.level}`;
    renderMonsterSprite(player, 'player-sprite');
    updateHpBar('player', player.stats.hp, player.stats.maxHp);

    // EXP 바 업데이트
    updateExpBar(player);
}

// EXP 바 업데이트
function updateExpBar(monster) {
    const expBar = document.getElementById('player-exp-bar');
    if (expBar) {
        const expPercent = (monster.exp / monster.expToNext) * 100;
        expBar.style.width = `${Math.min(100, expPercent)}%`;
    }
}

// HP 바 업데이트
function updateHpBar(side, current, max) {
    const percent = Math.max(0, (current / max) * 100);
    const bar = document.getElementById(`${side}-hp-bar`);
    bar.style.width = `${percent}%`;

    // HP 낮으면 색상 변경
    if (percent <= 25) {
        bar.classList.add('low');
    } else {
        bar.classList.remove('low');
    }

    document.getElementById(`${side}-hp-text`).textContent = `${Math.max(0, current)}/${max}`;
}

// 배틀 메시지 표시
function showBattleMessage(message) {
    document.getElementById('battle-message').textContent = message;
}

// 스킬 메뉴 표시
function showSkills() {
    const skillMenu = document.getElementById('skill-menu');
    const player = battleState.playerMonster;

    skillMenu.innerHTML = player.skills.map(skillId => {
        const skill = SKILLS[skillId];
        return `
            <button onclick="useSkill('${skillId}')">
                <span>${skill.name}</span>
                <span class="skill-type type-${skill.type}">${getTypeName(skill.type)}</span>
                <span class="skill-power">위력: ${skill.power}</span>
            </button>
        `;
    }).join('') + `<button onclick="hideSkills()">뒤로</button>`;

    document.getElementById('battle-menu').classList.add('hidden');
    skillMenu.classList.remove('hidden');
}

// 스킬 메뉴 숨기기
function hideSkills() {
    document.getElementById('battle-menu').classList.remove('hidden');
    document.getElementById('skill-menu').classList.add('hidden');
}

// 스킬 사용
async function useSkill(skillId) {
    if (battleState.battleEnded) return;

    hideSkills();

    const skill = SKILLS[skillId];
    const attacker = battleState.playerMonster;
    const defender = battleState.wildMonster;

    // 플레이어 공격
    await performAttack(attacker, defender, skill, false);

    if (battleState.battleEnded) return;

    // 적 턴
    await enemyTurn();
}

// 공격 이펙트 표시
async function showAttackEffect(skillType, targetId, isEnemy) {
    const targetElement = document.getElementById(targetId);
    const rect = targetElement.getBoundingClientRect();
    const battleScreen = document.getElementById('battle-screen');

    // 공격 모션
    const attackerSprite = document.getElementById(isEnemy ? 'enemy-sprite' : 'player-sprite');
    attackerSprite.classList.add(isEnemy ? 'attack-motion-enemy' : 'attack-motion-player');

    await delay(200);

    // 이펙트 이미지 또는 CSS 이펙트 표시
    const effectPath = getEffectImagePath(skillType);
    const effect = document.createElement('div');
    effect.className = 'attack-effect';
    effect.style.left = `${rect.left - battleScreen.getBoundingClientRect().left + rect.width/2 - 64}px`;
    effect.style.top = `${rect.top - battleScreen.getBoundingClientRect().top + rect.height/2 - 64}px`;

    // 이미지가 있으면 사용, 없으면 CSS 이펙트
    checkImageExists(effectPath).then(exists => {
        if (exists) {
            effect.innerHTML = `<img src="${effectPath}" style="width: 128px; height: 128px;" />`;
        } else {
            // CSS 기반 이펙트
            effect.innerHTML = getTypeEffectEmoji(skillType);
            effect.style.fontSize = '4rem';
            effect.style.display = 'flex';
            effect.style.justifyContent = 'center';
            effect.style.alignItems = 'center';
        }
    });

    battleScreen.appendChild(effect);

    // 피격 애니메이션
    targetElement.classList.add('hit-shake');

    await delay(300);

    // 공격 모션 제거
    attackerSprite.classList.remove('attack-motion-player', 'attack-motion-enemy');

    // 이펙트 제거
    setTimeout(() => {
        effect.remove();
        targetElement.classList.remove('hit-shake');
    }, 500);
}

// 데미지 숫자 표시
function showDamageNumber(damage, targetId, effectiveness) {
    const targetElement = document.getElementById(targetId);
    const rect = targetElement.getBoundingClientRect();
    const battleScreen = document.getElementById('battle-screen');

    const damageNum = document.createElement('div');
    damageNum.className = 'damage-number';

    if (effectiveness > 1) {
        damageNum.classList.add('effective');
    } else if (effectiveness < 1) {
        damageNum.classList.add('not-effective');
    }

    damageNum.textContent = damage;
    damageNum.style.left = `${rect.left - battleScreen.getBoundingClientRect().left + rect.width/2}px`;
    damageNum.style.top = `${rect.top - battleScreen.getBoundingClientRect().top}px`;

    battleScreen.appendChild(damageNum);

    setTimeout(() => damageNum.remove(), 1000);
}

// 속성별 이펙트 이모지
function getTypeEffectEmoji(type) {
    const emojis = {
        fire: '🔥💥',
        water: '💧🌊',
        grass: '🍃🌿',
        electric: '⚡💫',
        ground: '🪨💨',
        ice: '❄️💎',
        psychic: '🔮✨',
        dark: '👁️🌑',
        normal: '💥⭐',
        magic: '✨🌟'
    };
    return emojis[type] || '💥';
}

// 공격 수행
async function performAttack(attacker, defender, skill, isEnemy) {
    // 명중 체크
    if (Math.random() * 100 > skill.accuracy) {
        showBattleMessage(`${attacker.name}의 ${skill.name}! 하지만 빗나갔다!`);
        await delay(1500);
        return;
    }

    // 데미지 계산
    let damage = calculateDamage(attacker, defender, skill);
    const effectiveness = getTypeEffectiveness(skill.type, defender.type);

    showBattleMessage(`${attacker.name}의 ${skill.name}!`);

    // 공격 이펙트 표시
    const targetId = isEnemy ? 'player-sprite' : 'enemy-sprite';
    await showAttackEffect(skill.type, targetId, isEnemy);

    // 데미지 숫자 표시
    showDamageNumber(damage, targetId, effectiveness);

    await delay(500);

    // 상성 메시지
    if (effectiveness > 1) {
        showBattleMessage('효과가 굉장했다!');
        await delay(1000);
    } else if (effectiveness < 1 && effectiveness > 0) {
        showBattleMessage('효과가 별로인 것 같다...');
        await delay(1000);
    } else if (effectiveness === 0) {
        showBattleMessage('효과가 없는 것 같다...');
        await delay(1000);
        return;
    }

    // 데미지 적용
    defender.stats.hp -= damage;

    if (isEnemy) {
        updateHpBar('player', battleState.playerMonster.stats.hp, battleState.playerMonster.stats.maxHp);
    } else {
        updateHpBar('enemy', battleState.wildMonster.stats.hp, battleState.wildMonster.stats.maxHp);
    }

    await delay(500);

    // 기절 체크
    if (defender.stats.hp <= 0) {
        defender.stats.hp = 0;
        if (isEnemy) {
            // 플레이어 몬스터 기절
            await handlePlayerMonsterFaint();
        } else {
            // 야생 몬스터 기절
            await handleWildMonsterFaint();
        }
    }
}

// 데미지 계산
function calculateDamage(attacker, defender, skill) {
    const baseDamage = ((2 * attacker.level / 5 + 2) * skill.power * (attacker.stats.atk / defender.stats.def)) / 50 + 2;

    // 자속성 보너스
    const stab = attacker.type === skill.type ? 1.5 : 1;

    // 상성
    const effectiveness = getTypeEffectiveness(skill.type, defender.type);

    // 랜덤 변동
    const random = 0.85 + Math.random() * 0.15;

    return Math.floor(baseDamage * stab * effectiveness * random);
}

// 상성 계산
function getTypeEffectiveness(attackType, defenseType) {
    const effectiveness = TYPE_EFFECTIVENESS[attackType];
    if (effectiveness && effectiveness[defenseType] !== undefined) {
        return effectiveness[defenseType];
    }
    return 1;
}

// 적 턴
async function enemyTurn() {
    if (battleState.battleEnded) return;

    const wild = battleState.wildMonster;
    const player = battleState.playerMonster;

    // 랜덤 스킬 선택
    const skillId = wild.skills[Math.floor(Math.random() * wild.skills.length)];
    const skill = SKILLS[skillId];

    await performAttack(wild, player, skill, true);
}

// 플레이어 몬스터 기절 처리
async function handlePlayerMonsterFaint() {
    showBattleMessage(`${battleState.playerMonster.name}(이)가 쓰러졌다!`);
    await delay(1500);

    // 살아있는 다음 몬스터 찾기 (현재 인덱스 이후)
    let nextIndex = gameState.party.findIndex((m, i) => i > battleState.playerMonsterIndex && m.stats.hp > 0);

    // 없으면 처음부터 찾기
    if (nextIndex === -1) {
        nextIndex = gameState.party.findIndex((m, i) => i !== battleState.playerMonsterIndex && m.stats.hp > 0);
    }

    if (nextIndex !== -1) {
        battleState.playerMonsterIndex = nextIndex;
        battleState.playerMonster = gameState.party[nextIndex];
        // 기절로 인한 강제 교체는 교체 횟수에 포함하지 않음
        showBattleMessage(`가랏! ${battleState.playerMonster.name}!`);
        updateBattleUI();
        await delay(1500);
    } else {
        // 모든 몬스터 기절
        battleState.battleEnded = true;
        showBattleMessage('모든 몬스터가 쓰러졌다...');
        await delay(2000);

        // 패배 처리
        showResult('패배...', '모든 몬스터가 기절했습니다. 포켓몬 센터에서 치료하세요.', false);
    }
}

// 야생 몬스터 기절 처리
async function handleWildMonsterFaint() {
    battleState.battleEnded = true;
    const wild = battleState.wildMonster;

    showBattleMessage(`야생의 ${wild.name}(을)를 쓰러뜨렸다!`);
    await delay(1500);

    // 경험치 획득
    const expGain = Math.floor(wild.level * 20 * (RARITY_WEIGHTS.common / RARITY_WEIGHTS[wild.rarity]));

    // 경험치 획득 메시지
    showBattleMessage(`${expGain} 경험치를 획득했다!`);
    await delay(1000);

    // 경험치 애니메이션으로 증가
    const oldExp = battleState.playerMonster.exp;
    battleState.playerMonster.exp += expGain;
    updateExpBar(battleState.playerMonster);
    await delay(500);

    // 레벨업 체크
    let levelUps = 0;
    let evolvedMonster = null;
    let newSkillsLearned = [];

    while (battleState.playerMonster.exp >= battleState.playerMonster.expToNext) {
        battleState.playerMonster.exp -= battleState.playerMonster.expToNext;
        battleState.playerMonster.level++;
        battleState.playerMonster.expToNext = battleState.playerMonster.level * 100;
        levelUps++;

        // 레벨업 메시지 표시
        showBattleMessage(`${battleState.playerMonster.name}의 레벨이 ${battleState.playerMonster.level}(이)가 되었다!`);
        updateBattleUI();
        await delay(1500);

        // 스탯 증가
        const base = MONSTERS[battleState.playerMonster.baseId];
        const oldMaxHp = battleState.playerMonster.stats.maxHp;
        battleState.playerMonster.stats.maxHp = Math.floor(base.baseStats.hp * (1 + battleState.playerMonster.level * 0.1));
        battleState.playerMonster.stats.hp += (battleState.playerMonster.stats.maxHp - oldMaxHp); // HP도 증가분만큼 회복
        battleState.playerMonster.stats.atk = Math.floor(base.baseStats.atk * (1 + battleState.playerMonster.level * 0.05));
        battleState.playerMonster.stats.def = Math.floor(base.baseStats.def * (1 + battleState.playerMonster.level * 0.05));
        battleState.playerMonster.stats.spd = Math.floor(base.baseStats.spd * (1 + battleState.playerMonster.level * 0.03));

        // 새 스킬 습득 체크
        const allSkills = base.skills;
        const currentSkillCount = Math.min(4, Math.ceil(battleState.playerMonster.level / 10) + 1);
        if (currentSkillCount > battleState.playerMonster.skills.length) {
            const newSkillId = allSkills[battleState.playerMonster.skills.length];
            if (newSkillId && SKILLS[newSkillId]) {
                battleState.playerMonster.skills.push(newSkillId);
                newSkillsLearned.push(SKILLS[newSkillId].name);
                showBattleMessage(`${battleState.playerMonster.name}(이)가 ${SKILLS[newSkillId].name}(을)를 배웠다!`);
                await delay(1500);
            }
        }

        // 진화 체크
        if (base.evolvesTo && battleState.playerMonster.level >= base.evolveLevel) {
            evolvedMonster = base.evolvesTo;
        }

        // EXP 바 업데이트
        updateExpBar(battleState.playerMonster);
    }

    saveGame();

    // 진화 처리
    if (evolvedMonster) {
        await showEvolution(battleState.playerMonster, evolvedMonster);
    } else {
        let message = `${wild.name}(을)를 쓰러뜨렸다!`;
        if (levelUps > 0) {
            message = `레벨 ${battleState.playerMonster.level}(이)가 되었다!`;
        }
        showResult('승리!', message, true);
    }
}

// 진화 애니메이션 표시
async function showEvolution(monster, evolveToId) {
    const evolvedBase = MONSTERS[evolveToId];

    // 진화 화면으로 전환
    showScreen('evolve-screen');

    const evolveSprite = document.getElementById('evolve-sprite');
    const evolveMessage = document.getElementById('evolve-message');

    // 진화 전 몬스터 표시
    evolveSprite.textContent = monster.emoji;
    evolveMessage.textContent = `어라...? ${monster.name}의 모습이...!`;

    await delay(2000);

    // 진화 이펙트
    evolveSprite.classList.add('evolving');
    evolveMessage.textContent = '진화하고 있다!';

    await delay(3000);

    // 진화 완료
    evolveSprite.classList.remove('evolving');
    evolveSprite.textContent = evolvedBase.emoji;
    evolveMessage.textContent = `축하합니다! ${monster.name}(이)가 ${evolvedBase.name}(으)로 진화했다!`;

    // 몬스터 데이터 업데이트
    const partyIndex = gameState.party.findIndex(m => m === monster);
    if (partyIndex !== -1) {
        const evolvedMonster = evolveMonster(monster, evolveToId);
        gameState.party[partyIndex] = evolvedMonster;

        // 도감 등록
        gameState.pokedex[evolveToId] = { discovered: true, caught: true };
    }

    saveGame();

    await delay(3000);

    showResult('진화 완료!', `${evolvedBase.name}(으)로 진화했습니다!`, true);
}

// 몬스터 진화 처리
function evolveMonster(monster, evolveToId) {
    const evolvedBase = MONSTERS[evolveToId];

    return {
        baseId: evolveToId,
        name: evolvedBase.name,
        type: evolvedBase.type,
        emoji: evolvedBase.emoji,
        level: monster.level,
        exp: monster.exp,
        expToNext: monster.expToNext,
        stats: {
            hp: Math.floor(evolvedBase.baseStats.hp * (1 + monster.level * 0.1)),
            maxHp: Math.floor(evolvedBase.baseStats.hp * (1 + monster.level * 0.1)),
            atk: Math.floor(evolvedBase.baseStats.atk * (1 + monster.level * 0.05)),
            def: Math.floor(evolvedBase.baseStats.def * (1 + monster.level * 0.05)),
            spd: Math.floor(evolvedBase.baseStats.spd * (1 + monster.level * 0.03))
        },
        skills: evolvedBase.skills.slice(0, Math.min(4, Math.ceil(monster.level / 10) + 1)),
        rarity: evolvedBase.rarity
    };
}

// 포획 시도
async function tryCapture() {
    if (battleState.battleEnded) return;

    // 볼 선택 (일단 기본볼)
    const ballType = 'pokeball';
    if (gameState.items[ballType] <= 0) {
        showBattleMessage('몬스터볼이 없습니다!');
        return;
    }

    gameState.items[ballType]--;
    updateUI();

    const wild = battleState.wildMonster;
    const ball = ITEMS[ballType];

    // 포획 확률 계산
    // HP가 낮을수록, 희귀도가 낮을수록 포획률 상승
    const hpPercent = wild.stats.hp / wild.stats.maxHp;
    const rarityMod = RARITY_WEIGHTS[wild.rarity] / RARITY_WEIGHTS.common;
    const baseRate = 30 * ball.captureRate * (1 - hpPercent * 0.7) / rarityMod;

    showScreen('capture-screen');
    document.getElementById('capture-message').textContent = '포획 중...';

    // 포획 애니메이션
    await delay(2000);

    const success = Math.random() * 100 < baseRate || ball.captureRate >= 255;

    if (success) {
        document.getElementById('pokeball').style.animation = 'none';
        document.getElementById('capture-message').textContent = `${wild.name}(을)를 잡았다!`;
        await delay(1500);

        battleState.battleEnded = true;

        // 도감에 포획 기록
        gameState.pokedex[wild.baseId].caught = true;

        // 파티 또는 보관함에 추가
        if (gameState.party.length < 6) {
            gameState.party.push(wild);
        } else {
            gameState.storage.push(wild);
        }

        saveGame();
        showResult('포획 성공!', `${wild.name}(을)를 파티에 추가했습니다!`, true);
    } else {
        document.getElementById('capture-message').textContent = '앗! 튀어나왔다!';
        await delay(1500);

        showScreen('battle-screen');

        // 적 턴
        await enemyTurn();
    }
}

// 도망
async function runAway() {
    if (battleState.battleEnded) return;

    const player = battleState.playerMonster;
    const wild = battleState.wildMonster;

    // 도망 확률 (스피드 기반)
    const escapeChance = ((player.stats.spd * 32) / (wild.stats.spd / 4)) + 30;

    if (Math.random() * 100 < escapeChance) {
        showBattleMessage('무사히 도망쳤다!');
        await delay(1500);
        battleState.battleEnded = true;
        returnToExplore();
    } else {
        showBattleMessage('도망칠 수 없었다!');
        await delay(1500);
        await enemyTurn();
    }
}

// 가방 (배틀 중)
function showBag() {
    // TODO: 배틀 중 아이템 사용
    showBattleMessage('아이템 사용은 준비 중입니다...');
}

// 결과 화면 표시
function showResult(title, message, isVictory) {
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-message').textContent = message;

    // 결과 화면 버튼 업데이트
    const resultContent = document.querySelector('.result-content');
    const existingButtons = resultContent.querySelectorAll('button');
    existingButtons.forEach(btn => btn.remove());

    if (isVictory) {
        // 승리 시 확인 버튼
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = '확인';
        confirmBtn.onclick = returnToExplore;
        resultContent.appendChild(confirmBtn);
    } else {
        // 패배 시 몬스터 센터로 이동 버튼
        if (storyState && storyState.isStoryMode) {
            const healBtn = document.createElement('button');
            healBtn.textContent = '🏥 몬스터 센터로 이동';
            healBtn.onclick = goToPokemonCenter;
            resultContent.appendChild(healBtn);
        } else {
            // 자유 모드에서는 그냥 복귀 (HP 회복됨)
            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = '확인';
            confirmBtn.onclick = returnToExplore;
            resultContent.appendChild(confirmBtn);
        }
    }

    showScreen('result-screen');
}

// 몬스터 센터로 이동 (패배 시)
function goToPokemonCenter() {
    // 포켓몬 센터 해금 (아직 안 되어있으면)
    if (!storyState.unlockedLocations.includes('pokemon_center')) {
        storyState.unlockedLocations.push('pokemon_center');
    }

    // 현재 위치를 포켓몬 센터로 변경
    storyState.currentLocation = 'pokemon_center';

    screenHistory = [];

    // 몬스터 센터 화면 표시
    showLocationScreen('pokemon_center');
}

// 탐험 화면으로 복귀
function returnToExplore() {
    // 파티 몬스터 HP 복구 (간단히 전부 회복)
    gameState.party.forEach(m => {
        m.stats.hp = m.stats.maxHp;
    });

    saveGame();
    screenHistory = [];

    // 스토리 모드인 경우 스토리로 복귀
    if (storyState && storyState.isStoryMode) {
        returnToStoryAfterBattle();
    } else {
        showScreen('explore-screen');
    }
}

// 도감 렌더링
function renderPokedex() {
    const grid = document.getElementById('pokedex-grid');
    const monsters = Object.entries(MONSTERS).sort((a, b) => a[1].id - b[1].id);

    let discovered = 0;
    let caught = 0;

    grid.innerHTML = monsters.map(([id, monster]) => {
        const status = gameState.pokedex[id] || { discovered: false, caught: false };
        if (status.discovered) discovered++;
        if (status.caught) caught++;

        const isUnknown = !status.discovered;

        return `
            <div class="pokedex-entry ${isUnknown ? 'unknown' : ''}" onclick="${isUnknown ? '' : `showMonsterDetail('${id}')`}">
                <span class="sprite">${isUnknown ? '?' : monster.emoji}</span>
                <span class="number">No.${String(monster.id).padStart(3, '0')}</span>
                <span class="name">${isUnknown ? '???' : monster.name}</span>
            </div>
        `;
    }).join('');

    document.getElementById('pokedex-progress').textContent = `${caught}/${monsters.length}`;
}

// 몬스터 상세 정보
function showMonsterDetail(monsterId) {
    const monster = MONSTERS[monsterId];
    const status = gameState.pokedex[monsterId] || { discovered: false, caught: false };

    document.getElementById('detail-name').textContent = monster.name;
    document.getElementById('detail-sprite').textContent = monster.emoji;
    document.getElementById('detail-type').innerHTML = `속성: <span class="type-${monster.type}" style="padding: 2px 10px; border-radius: 10px;">${getTypeName(monster.type)}</span>`;
    document.getElementById('detail-rarity').innerHTML = `희귀도: <span class="rarity-${monster.rarity}">${RARITY_NAMES[monster.rarity]}</span>`;
    document.getElementById('detail-description').textContent = status.caught ? monster.description : '포획하면 설명을 볼 수 있습니다.';

    // 진화 정보 표시
    let evolutionInfo = '';
    if (monster.evolvesTo) {
        const evolvedMonster = MONSTERS[monster.evolvesTo];
        evolutionInfo = `<p style="color: #ffd700; margin-top: 10px;">→ Lv.${monster.evolveLevel}에 ${evolvedMonster.name}(으)로 진화</p>`;
    }
    if (monster.evolvesFrom) {
        const prevMonster = MONSTERS[monster.evolvesFrom];
        evolutionInfo = `<p style="color: #aaa; margin-top: 10px;">← ${prevMonster.name}에서 진화</p>` + evolutionInfo;
    }

    // 스탯 표시
    const statsDiv = document.getElementById('detail-stats');
    if (status.caught) {
        statsDiv.innerHTML = `
            ${evolutionInfo}
            <div class="stat-row">
                <span class="stat-name">HP</span>
                <div class="stat-bar"><div class="stat-fill hp" style="width: ${monster.baseStats.hp / 1.5}%"></div></div>
                <span class="stat-value">${monster.baseStats.hp}</span>
            </div>
            <div class="stat-row">
                <span class="stat-name">공격</span>
                <div class="stat-bar"><div class="stat-fill atk" style="width: ${monster.baseStats.atk / 1.5}%"></div></div>
                <span class="stat-value">${monster.baseStats.atk}</span>
            </div>
            <div class="stat-row">
                <span class="stat-name">방어</span>
                <div class="stat-bar"><div class="stat-fill def" style="width: ${monster.baseStats.def / 1.5}%"></div></div>
                <span class="stat-value">${monster.baseStats.def}</span>
            </div>
            <div class="stat-row">
                <span class="stat-name">스피드</span>
                <div class="stat-bar"><div class="stat-fill spd" style="width: ${monster.baseStats.spd / 1.5}%"></div></div>
                <span class="stat-value">${monster.baseStats.spd}</span>
            </div>
        `;
    } else {
        statsDiv.innerHTML = '<p style="color: #888;">포획하면 스탯을 볼 수 있습니다.</p>';
    }

    showScreen('monster-detail');
}

// 파티 렌더링
function renderParty() {
    const partyGrid = document.getElementById('party-grid');
    const storageGrid = document.getElementById('storage-grid');

    // 파티 (6슬롯)
    partyGrid.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const monster = gameState.party[i];
        if (monster) {
            const base = MONSTERS[monster.baseId];
            const canEvolve = base.evolvesTo && monster.level >= base.evolveLevel;

            partyGrid.innerHTML += `
                <div class="party-slot ${canEvolve ? 'evolving' : ''}" onclick="showPartyMonsterDetail(${i})">
                    <span class="sprite">${monster.emoji}</span>
                    <div class="info">
                        <span class="name">${monster.name}</span>
                        <span class="level">Lv.${monster.level}</span>
                        <div class="hp-bar">
                            <div class="hp-fill" style="width: ${(monster.stats.hp / monster.stats.maxHp) * 100}%"></div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            partyGrid.innerHTML += `<div class="party-slot empty">빈 슬롯</div>`;
        }
    }

    // 보관함
    storageGrid.innerHTML = gameState.storage.map((monster, i) => `
        <div class="storage-slot" onclick="moveToParty(${i})">
            <span class="sprite">${monster.emoji}</span>
            <span class="level">Lv.${monster.level}</span>
        </div>
    `).join('') || '<p style="color: #888; grid-column: span 4; text-align: center;">보관함이 비어있습니다.</p>';
}

// 보관함에서 파티로 이동
function moveToParty(storageIndex) {
    if (gameState.party.length >= 6) {
        showMessage('파티가 가득 찼습니다!');
        return;
    }

    const monster = gameState.storage.splice(storageIndex, 1)[0];
    gameState.party.push(monster);
    saveGame();
    renderParty();
}

// 파티 몬스터 상세
function showPartyMonsterDetail(index) {
    const monster = gameState.party[index];
    if (!monster) return;

    showMonsterDetail(monster.baseId);
}

// 가방 렌더링
function renderBag() {
    const grid = document.getElementById('bag-grid');

    grid.innerHTML = Object.entries(gameState.items)
        .filter(([id, count]) => count > 0)
        .map(([id, count]) => {
            const item = ITEMS[id];
            return `
                <div class="bag-item">
                    <span class="emoji">${item.emoji}</span>
                    <div class="info">
                        <span class="name">${item.name}</span>
                        <span class="count">x ${count}</span>
                    </div>
                </div>
            `;
        }).join('') || '<p style="color: white; grid-column: span 2; text-align: center;">가방이 비어있습니다.</p>';
}

// UI 업데이트
function updateUI() {
    document.getElementById('ball-count').textContent = gameState.items.pokeball || 0;
}

// 메시지 표시
function showMessage(text) {
    alert(text);
}

// 속성 이름 가져오기
function getTypeName(type) {
    const names = {
        fire: '불',
        water: '물',
        grass: '풀',
        electric: '전기',
        ground: '땅',
        ice: '얼음',
        psychic: '에스퍼',
        dark: '어둠',
        normal: '노말',
        magic: '마법'
    };
    return names[type] || type;
}

// 딜레이 함수
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 게임 저장
function saveGame() {
    localStorage.setItem('monsterHunterSave', JSON.stringify(gameState));
}

// 게임 로드
function loadGame() {
    const saved = localStorage.getItem('monsterHunterSave');
    if (saved) {
        try {
            gameState = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load save:', e);
        }
    }
}

// 게임 시작
document.addEventListener('DOMContentLoaded', init);
