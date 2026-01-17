// 몬스터 데이터
const MONSTERS = {
    // 불 속성
    flameling: {
        id: 1,
        name: '플레임링',
        type: 'fire',
        emoji: '🔥',
        image: 'flameling.png',
        rarity: 'common',
        baseStats: { hp: 45, atk: 52, def: 43, spd: 65 },
        description: '작은 몸에서 뜨거운 불꽃을 내뿜는 귀여운 몬스터.',
        skills: ['tackle', 'ember', 'flame_burst', 'fire_spin'],
        regions: ['volcano', 'cave'],
        evolvesTo: 'infernox',
        evolveLevel: 20
    },
    infernox: {
        id: 2,
        name: '인페르녹스',
        type: 'fire',
        emoji: '🌋',
        image: 'infernox.png',
        rarity: 'rare',
        baseStats: { hp: 78, atk: 84, def: 78, spd: 100 },
        description: '용암처럼 뜨거운 몸을 가진 강력한 화염 몬스터.',
        skills: ['fire_punch', 'flame_burst', 'fire_spin', 'inferno'],
        regions: ['volcano'],
        evolvesFrom: 'flameling'
    },

    // 물 속성
    aquapup: {
        id: 3,
        name: '아쿠아펍',
        type: 'water',
        emoji: '🐳',
        image: 'aquapup.png',
        rarity: 'common',
        baseStats: { hp: 50, atk: 46, def: 48, spd: 58 },
        description: '물 속에서 자유롭게 헤엄치는 장난꾸러기 몬스터.',
        skills: ['tackle', 'water_gun', 'bubble', 'aqua_jet'],
        regions: ['ocean', 'lake'],
        evolvesTo: 'tsunamius',
        evolveLevel: 22
    },
    tsunamius: {
        id: 4,
        name: '츠나미우스',
        type: 'water',
        emoji: '🌊',
        image: 'tsunamius.png',
        rarity: 'rare',
        baseStats: { hp: 85, atk: 75, def: 85, spd: 78 },
        description: '거대한 파도를 일으키는 바다의 지배자.',
        skills: ['water_gun', 'aqua_jet', 'hydro_pump', 'tsunami'],
        regions: ['ocean'],
        evolvesFrom: 'aquapup'
    },

    // 풀 속성
    sproutie: {
        id: 5,
        name: '스프라우티',
        type: 'grass',
        emoji: '🌱',
        image: 'sproutie.png',
        rarity: 'common',
        baseStats: { hp: 48, atk: 48, def: 52, spd: 55 },
        description: '햇빛을 좋아하는 작은 새싹 몬스터.',
        skills: ['tackle', 'vine_whip', 'razor_leaf', 'seed_bomb'],
        regions: ['forest', 'meadow'],
        evolvesTo: 'florabeast',
        evolveLevel: 18
    },
    florabeast: {
        id: 6,
        name: '플로라비스트',
        type: 'grass',
        emoji: '🌳',
        image: 'florabeast.png',
        rarity: 'rare',
        baseStats: { hp: 80, atk: 82, def: 83, spd: 80 },
        description: '숲의 수호자로 불리는 거대한 식물 몬스터.',
        skills: ['vine_whip', 'seed_bomb', 'solar_beam', 'leaf_storm'],
        regions: ['forest'],
        evolvesFrom: 'sproutie'
    },

    // 전기 속성
    zaplet: {
        id: 7,
        name: '재플렛',
        type: 'electric',
        emoji: '⚡',
        image: 'zaplet.png',
        rarity: 'common',
        baseStats: { hp: 40, atk: 55, def: 40, spd: 90 },
        description: '번개처럼 빠르게 움직이는 전기 몬스터.',
        skills: ['tackle', 'thunder_shock', 'spark', 'thunderbolt'],
        regions: ['meadow', 'mountain'],
        evolvesTo: 'voltdragon',
        evolveLevel: 25
    },
    voltdragon: {
        id: 8,
        name: '볼트드래곤',
        type: 'electric',
        emoji: '🐉',
        image: 'voltdragon.png',
        rarity: 'legendary',
        baseStats: { hp: 90, atk: 95, def: 85, spd: 100 },
        description: '하늘에서 번개를 내리치는 전설의 용.',
        skills: ['thunder_shock', 'thunderbolt', 'thunder', 'volt_tackle'],
        regions: ['mountain'],
        evolvesFrom: 'zaplet'
    },

    // 땅 속성
    muddling: {
        id: 9,
        name: '머들링',
        type: 'ground',
        emoji: '🦫',
        image: 'muddling.png',
        rarity: 'common',
        baseStats: { hp: 55, atk: 55, def: 60, spd: 35 },
        description: '땅 속을 파고 다니는 귀여운 두더지 몬스터.',
        skills: ['tackle', 'mud_slap', 'dig', 'earthquake'],
        regions: ['cave', 'meadow'],
        evolvesTo: 'terratitan',
        evolveLevel: 28
    },
    terratitan: {
        id: 10,
        name: '테라타이탄',
        type: 'ground',
        emoji: '🗿',
        image: 'terratitan.png',
        rarity: 'epic',
        baseStats: { hp: 95, atk: 100, def: 120, spd: 35 },
        description: '대지의 힘을 다루는 고대 거인 몬스터.',
        skills: ['mud_slap', 'dig', 'earthquake', 'fissure'],
        regions: ['cave', 'mountain'],
        evolvesFrom: 'muddling'
    },

    // 얼음 속성
    frostkit: {
        id: 11,
        name: '프로스트킷',
        type: 'ice',
        emoji: '❄️',
        image: 'frostkit.png',
        rarity: 'common',
        baseStats: { hp: 45, atk: 50, def: 50, spd: 60 },
        description: '차가운 눈보라 속에서 태어난 작은 몬스터.',
        skills: ['tackle', 'powder_snow', 'ice_shard', 'ice_beam'],
        regions: ['mountain', 'cave'],
        evolvesTo: 'glacior',
        evolveLevel: 24
    },
    glacior: {
        id: 12,
        name: '글래시어',
        type: 'ice',
        emoji: '🏔️',
        image: 'glacior.png',
        rarity: 'rare',
        baseStats: { hp: 75, atk: 70, def: 90, spd: 65 },
        description: '빙하를 지배하는 얼음의 제왕.',
        skills: ['ice_shard', 'ice_beam', 'blizzard', 'sheer_cold'],
        regions: ['mountain'],
        evolvesFrom: 'frostkit'
    },

    // 에스퍼 속성
    psychup: {
        id: 13,
        name: '사이컵',
        type: 'psychic',
        emoji: '🔮',
        image: 'psychup.png',
        rarity: 'common',
        baseStats: { hp: 40, atk: 35, def: 45, spd: 65 },
        description: '텔레파시를 사용할 수 있는 신비로운 몬스터.',
        skills: ['tackle', 'confusion', 'psybeam', 'psychic'],
        regions: ['forest', 'lake'],
        evolvesTo: 'cosmara',
        evolveLevel: 30
    },
    cosmara: {
        id: 14,
        name: '코스마라',
        type: 'psychic',
        emoji: '🌟',
        image: 'cosmara.png',
        rarity: 'legendary',
        baseStats: { hp: 85, atk: 100, def: 80, spd: 95 },
        description: '우주의 신비를 품은 전설의 초능력 몬스터.',
        skills: ['psybeam', 'psychic', 'future_sight', 'cosmic_power'],
        regions: ['lake', 'magic'],
        evolvesFrom: 'psychup'
    },

    // 어둠 속성
    shadeling: {
        id: 15,
        name: '섀이들링',
        type: 'dark',
        emoji: '👻',
        image: 'shadeling.png',
        rarity: 'common',
        baseStats: { hp: 45, atk: 60, def: 40, spd: 70 },
        description: '그림자 속에 숨어 다니는 장난꾸러기 몬스터.',
        skills: ['tackle', 'bite', 'shadow_ball', 'dark_pulse'],
        regions: ['cave', 'forest'],
        evolvesTo: 'nightterror',
        evolveLevel: 26
    },
    nightterror: {
        id: 16,
        name: '나이트테러',
        type: 'dark',
        emoji: '🦇',
        image: 'nightterror.png',
        rarity: 'epic',
        baseStats: { hp: 80, atk: 95, def: 70, spd: 95 },
        description: '어둠의 공포를 몰고 다니는 악몽의 몬스터.',
        skills: ['bite', 'shadow_ball', 'dark_pulse', 'nightmare'],
        regions: ['cave'],
        evolvesFrom: 'shadeling'
    },

    // 노말 속성
    fluffball: {
        id: 17,
        name: '플러프볼',
        type: 'normal',
        emoji: '🐰',
        image: 'fluffball.png',
        rarity: 'common',
        baseStats: { hp: 55, atk: 50, def: 50, spd: 55 },
        description: '폭신폭신한 털을 가진 순한 몬스터.',
        skills: ['tackle', 'scratch', 'quick_attack', 'hyper_beam'],
        regions: ['meadow', 'forest'],
        evolvesTo: 'royalion',
        evolveLevel: 25
    },
    royalion: {
        id: 18,
        name: '로열리온',
        type: 'normal',
        emoji: '🦁',
        image: 'royalion.png',
        rarity: 'epic',
        baseStats: { hp: 90, atk: 90, def: 80, spd: 90 },
        description: '초원의 왕으로 불리는 위엄있는 몬스터.',
        skills: ['scratch', 'quick_attack', 'hyper_beam', 'giga_impact'],
        regions: ['meadow'],
        evolvesFrom: 'fluffball'
    },

    // 마법의 공간 전용 몬스터 - 마법 속성
    starwisp: {
        id: 19,
        name: '스타위스프',
        type: 'magic',
        emoji: '✨',
        image: 'starwisp.png',
        rarity: 'rare',
        baseStats: { hp: 50, atk: 65, def: 55, spd: 80 },
        description: '별빛으로 이루어진 작은 요정 몬스터.',
        skills: ['tackle', 'star_shower', 'cosmic_ray', 'celestial_beam'],
        regions: ['magic'],
        evolvesTo: 'celestia',
        evolveLevel: 35
    },
    celestia: {
        id: 20,
        name: '셀레스티아',
        type: 'magic',
        emoji: '🌌',
        image: 'starwisp_evo.png',
        rarity: 'legendary',
        baseStats: { hp: 90, atk: 110, def: 85, spd: 105 },
        description: '별자리의 여왕. 밤하늘의 모든 별을 다스린다.',
        skills: ['cosmic_ray', 'celestial_beam', 'galaxy_burst', 'astral_judgment'],
        regions: ['magic'],
        evolvesFrom: 'starwisp'
    },
    voidwalker: {
        id: 21,
        name: '보이드워커',
        type: 'magic',
        emoji: '🌀',
        image: 'voidwalker.png',
        rarity: 'epic',
        baseStats: { hp: 70, atk: 85, def: 70, spd: 90 },
        description: '차원을 넘나드는 신비로운 존재.',
        skills: ['tackle', 'dimension_shift', 'void_pulse', 'reality_warp'],
        regions: ['magic'],
        evolvesTo: 'dimensior',
        evolveLevel: 38
    },
    dimensior: {
        id: 22,
        name: '디멘시온',
        type: 'magic',
        emoji: '🔳',
        image: 'voidwalker_evo.png',
        rarity: 'legendary',
        baseStats: { hp: 95, atk: 115, def: 90, spd: 110 },
        description: '차원의 지배자. 시공간을 마음대로 왜곡시킨다.',
        skills: ['void_pulse', 'reality_warp', 'dimension_break', 'multiverse_collapse'],
        regions: ['magic'],
        evolvesFrom: 'voidwalker'
    },
    eternix: {
        id: 23,
        name: '이터닉스',
        type: 'magic',
        emoji: '⏳',
        image: 'eternix.png',
        rarity: 'legendary',
        baseStats: { hp: 100, atk: 100, def: 100, spd: 100 },
        description: '시간의 수호자. 과거와 미래를 넘나든다.',
        skills: ['time_freeze', 'temporal_blast', 'eternity_loop', 'chrono_destruction'],
        regions: ['magic']
    }
};

// 스킬 데이터
const SKILLS = {
    // 노말
    tackle: { name: '몸통박치기', type: 'normal', power: 40, accuracy: 100 },
    scratch: { name: '할퀴기', type: 'normal', power: 40, accuracy: 100 },
    quick_attack: { name: '전광석화', type: 'normal', power: 40, accuracy: 100, priority: 1 },
    hyper_beam: { name: '파괴광선', type: 'normal', power: 150, accuracy: 90 },
    giga_impact: { name: '기가임팩트', type: 'normal', power: 150, accuracy: 90 },

    // 불
    ember: { name: '불씨', type: 'fire', power: 40, accuracy: 100 },
    fire_punch: { name: '불꽃펀치', type: 'fire', power: 75, accuracy: 100 },
    flame_burst: { name: '화염방사', type: 'fire', power: 70, accuracy: 100 },
    fire_spin: { name: '불꽃소용돌이', type: 'fire', power: 35, accuracy: 85 },
    inferno: { name: '연옥', type: 'fire', power: 100, accuracy: 50 },

    // 물
    water_gun: { name: '물대포', type: 'water', power: 40, accuracy: 100 },
    bubble: { name: '거품', type: 'water', power: 40, accuracy: 100 },
    aqua_jet: { name: '아쿠아제트', type: 'water', power: 40, accuracy: 100, priority: 1 },
    hydro_pump: { name: '하이드로펌프', type: 'water', power: 110, accuracy: 80 },
    tsunami: { name: '쓰나미', type: 'water', power: 120, accuracy: 75 },

    // 풀
    vine_whip: { name: '덩굴채찍', type: 'grass', power: 45, accuracy: 100 },
    razor_leaf: { name: '잎날가르기', type: 'grass', power: 55, accuracy: 95 },
    seed_bomb: { name: '씨폭탄', type: 'grass', power: 80, accuracy: 100 },
    solar_beam: { name: '솔라빔', type: 'grass', power: 120, accuracy: 100 },
    leaf_storm: { name: '리프스톰', type: 'grass', power: 130, accuracy: 90 },

    // 전기
    thunder_shock: { name: '전기쇼크', type: 'electric', power: 40, accuracy: 100 },
    spark: { name: '스파크', type: 'electric', power: 65, accuracy: 100 },
    thunderbolt: { name: '10만볼트', type: 'electric', power: 90, accuracy: 100 },
    thunder: { name: '번개', type: 'electric', power: 110, accuracy: 70 },
    volt_tackle: { name: '볼트태클', type: 'electric', power: 120, accuracy: 100 },

    // 땅
    mud_slap: { name: '흙뿌리기', type: 'ground', power: 20, accuracy: 100 },
    dig: { name: '구멍파기', type: 'ground', power: 80, accuracy: 100 },
    earthquake: { name: '지진', type: 'ground', power: 100, accuracy: 100 },
    fissure: { name: '지각변동', type: 'ground', power: 150, accuracy: 30 },

    // 얼음
    powder_snow: { name: '눈가루', type: 'ice', power: 40, accuracy: 100 },
    ice_shard: { name: '얼음뭉치', type: 'ice', power: 40, accuracy: 100, priority: 1 },
    ice_beam: { name: '냉동빔', type: 'ice', power: 90, accuracy: 100 },
    blizzard: { name: '눈보라', type: 'ice', power: 110, accuracy: 70 },
    sheer_cold: { name: '절대영도', type: 'ice', power: 200, accuracy: 30 },

    // 에스퍼
    confusion: { name: '염동력', type: 'psychic', power: 50, accuracy: 100 },
    psybeam: { name: '사이코빔', type: 'psychic', power: 65, accuracy: 100 },
    psychic: { name: '사이코키네시스', type: 'psychic', power: 90, accuracy: 100 },
    future_sight: { name: '미래예지', type: 'psychic', power: 120, accuracy: 100 },
    cosmic_power: { name: '코스믹파워', type: 'psychic', power: 100, accuracy: 95 },

    // 어둠
    bite: { name: '물기', type: 'dark', power: 60, accuracy: 100 },
    shadow_ball: { name: '섀도볼', type: 'dark', power: 80, accuracy: 100 },
    dark_pulse: { name: '악의파동', type: 'dark', power: 80, accuracy: 100 },
    nightmare: { name: '악몽', type: 'dark', power: 100, accuracy: 100 },

    // 마법 (새로운 속성)
    star_shower: { name: '별빛샤워', type: 'magic', power: 50, accuracy: 100 },
    cosmic_ray: { name: '우주광선', type: 'magic', power: 70, accuracy: 95 },
    celestial_beam: { name: '천상의 빔', type: 'magic', power: 90, accuracy: 90 },
    galaxy_burst: { name: '은하폭발', type: 'magic', power: 120, accuracy: 85 },
    astral_judgment: { name: '성령심판', type: 'magic', power: 150, accuracy: 80 },
    dimension_shift: { name: '차원이동', type: 'magic', power: 60, accuracy: 100 },
    void_pulse: { name: '공허파동', type: 'magic', power: 80, accuracy: 95 },
    reality_warp: { name: '현실왜곡', type: 'magic', power: 100, accuracy: 90 },
    dimension_break: { name: '차원붕괴', type: 'magic', power: 130, accuracy: 85 },
    multiverse_collapse: { name: '다중우주붕괴', type: 'magic', power: 160, accuracy: 75 },
    time_freeze: { name: '시간정지', type: 'magic', power: 70, accuracy: 100 },
    temporal_blast: { name: '시간폭풍', type: 'magic', power: 90, accuracy: 95 },
    eternity_loop: { name: '영원회귀', type: 'magic', power: 110, accuracy: 90 },
    chrono_destruction: { name: '시공파괴', type: 'magic', power: 140, accuracy: 80 }
};

// 속성 상성표
const TYPE_EFFECTIVENESS = {
    fire: { grass: 2, water: 0.5, ice: 2, fire: 0.5 },
    water: { fire: 2, grass: 0.5, ground: 2, water: 0.5 },
    grass: { water: 2, ground: 2, fire: 0.5, grass: 0.5 },
    electric: { water: 2, ground: 0, electric: 0.5 },
    ground: { fire: 2, electric: 2, grass: 0.5 },
    ice: { grass: 2, ground: 2, fire: 0.5, ice: 0.5, water: 0.5 },
    psychic: { dark: 0.5, magic: 0.5 },
    dark: { psychic: 2, dark: 0.5, magic: 0.5 },
    normal: {},
    magic: { psychic: 2, dark: 2, normal: 1.5, magic: 0.5 }
};

// 지역 데이터
const REGIONS = {
    meadow: {
        name: '평화로운 초원',
        emoji: '🌾',
        background: 'bg_meadow.png',
        description: '다양한 몬스터들이 서식하는 넓은 초원.',
        levelRange: [1, 10],
        monsters: ['sproutie', 'zaplet', 'muddling', 'fluffball', 'royalion']
    },
    forest: {
        name: '신비로운 숲',
        emoji: '🌲',
        background: 'bg_forest.png',
        description: '울창한 나무들 사이에 몬스터가 숨어있다.',
        levelRange: [5, 15],
        monsters: ['sproutie', 'florabeast', 'psychup', 'shadeling', 'fluffball']
    },
    ocean: {
        name: '푸른 바다',
        emoji: '🏖️',
        background: 'bg_ocean.png',
        description: '시원한 바다에서 수중 몬스터를 만나보자.',
        levelRange: [8, 20],
        monsters: ['aquapup', 'tsunamius']
    },
    lake: {
        name: '신비의 호수',
        emoji: '🌅',
        background: 'bg_lake.png',
        description: '맑은 호수에 신비로운 몬스터가 산다.',
        levelRange: [10, 25],
        monsters: ['aquapup', 'psychup', 'cosmara']
    },
    cave: {
        name: '어두운 동굴',
        emoji: '🕳️',
        background: 'bg_cave.png',
        description: '어둠 속에 강력한 몬스터가 숨어있다.',
        levelRange: [12, 30],
        monsters: ['flameling', 'muddling', 'terratitan', 'frostkit', 'shadeling', 'nightterror']
    },
    mountain: {
        name: '험준한 산맥',
        emoji: '⛰️',
        background: 'bg_mountain.png',
        description: '높은 산에 전설의 몬스터가 있다는 소문이...',
        levelRange: [15, 35],
        monsters: ['zaplet', 'voltdragon', 'terratitan', 'frostkit', 'glacior']
    },
    volcano: {
        name: '불타는 화산',
        emoji: '🌋',
        background: 'bg_volcano.png',
        description: '용암이 끓어오르는 위험한 지역.',
        levelRange: [20, 40],
        monsters: ['flameling', 'infernox']
    },
    magic: {
        name: '마법의 공간',
        emoji: '🌌',
        background: 'bg_magic.png',
        description: '시공간이 왜곡된 신비로운 차원의 틈.',
        levelRange: [40, 50],
        monsters: ['starwisp', 'celestia', 'voidwalker', 'dimensior', 'eternix', 'cosmara'],
        special: true
    }
};

// 아이템 데이터
const ITEMS = {
    pokeball: {
        name: '몬스터볼',
        emoji: '🔴',
        description: '일반적인 몬스터볼. 기본 포획률.',
        captureRate: 1.0,
        price: 200
    },
    greatball: {
        name: '슈퍼볼',
        emoji: '🔵',
        description: '성능이 향상된 몬스터볼. 포획률 1.5배.',
        captureRate: 1.5,
        price: 600
    },
    ultraball: {
        name: '하이퍼볼',
        emoji: '🟡',
        description: '고성능 몬스터볼. 포획률 2배.',
        captureRate: 2.0,
        price: 1200
    },
    masterball: {
        name: '마스터볼',
        emoji: '🟣',
        description: '어떤 몬스터도 100% 포획하는 전설의 볼.',
        captureRate: 255,
        price: 999999
    },
    potion: {
        name: '회복약',
        emoji: '🧪',
        description: 'HP를 20 회복한다.',
        healAmount: 20,
        price: 300
    },
    super_potion: {
        name: '고급회복약',
        emoji: '💉',
        description: 'HP를 50 회복한다.',
        healAmount: 50,
        price: 700
    },
    hyper_potion: {
        name: '풀회복약',
        emoji: '💊',
        description: 'HP를 완전히 회복한다.',
        healAmount: 9999,
        price: 1500
    }
};

// 희귀도별 출현 확률
const RARITY_WEIGHTS = {
    common: 60,
    rare: 25,
    epic: 12,
    legendary: 3
};

// 희귀도 이름
const RARITY_NAMES = {
    common: '일반',
    rare: '희귀',
    epic: '영웅',
    legendary: '전설'
};

// 이미지 경로 헬퍼
const IMAGE_PATHS = {
    monsters: 'images/monsters/',
    effects: 'images/effects/',
    backgrounds: 'images/backgrounds/'
};

// 이미지 존재 체크 (기본값은 emoji 사용)
function hasImage(monsterId) {
    const monster = MONSTERS[monsterId];
    return monster && monster.image;
}

// 몬스터 이미지 경로 가져오기
function getMonsterImagePath(monsterId) {
    const monster = MONSTERS[monsterId];
    if (monster && monster.image) {
        return IMAGE_PATHS.monsters + monster.image;
    }
    return null;
}

// 이펙트 이미지 경로 가져오기
function getEffectImagePath(type) {
    return IMAGE_PATHS.effects + 'effect_' + type + '.png';
}

// 배경 이미지 경로 가져오기
function getBackgroundImagePath(regionId) {
    const region = REGIONS[regionId];
    if (region && region.background) {
        return IMAGE_PATHS.backgrounds + region.background;
    }
    return null;
}
