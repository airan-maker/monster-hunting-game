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
    },
    revive: {
        name: '기력의조각',
        emoji: '💎',
        description: '기절한 몬스터를 HP 절반으로 부활시킨다.',
        reviveAmount: 0.5,
        price: 1500
    },
    max_revive: {
        name: '기력의덩어리',
        emoji: '✨',
        description: '기절한 몬스터를 HP 전체로 부활시킨다.',
        reviveAmount: 1.0,
        price: 4000
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
    backgrounds: 'images/backgrounds/',
    npcs: 'images/npcs/',
    locations: 'images/locations/',
    player: 'images/player/',
    icons: 'images/icons/'
};

// 맵 아이콘 파일명 매핑
const MAP_ICONS = {
    player_house: 'map_icon_house.png',
    hometown: 'map_icon_town.png',
    lab: 'map_icon_lab.png',
    cafe: 'map_icon_cafe.png',
    pokemon_center: 'map_icon_pokecenter.png',
    route1: 'map_icon_route.png',
    forest_entrance: 'map_icon_forest.png',
    forest_deep: 'map_icon_forest.png',
    lake_area: 'map_icon_lake.png',
    mountain_base: 'map_icon_mountain.png',
    cave_entrance: 'map_icon_cave.png'
};

// NPC 데이터
const NPCS = {
    professor: {
        id: 'professor',
        name: '오크 박사',
        title: '몬스터 연구의 권위자',
        image: 'professor_normal.png',
        images: {
            normal: 'professor_normal.png',
            happy: 'professor_happy.png',
            thinking: 'professor_thinking.png',
            surprised: 'professor_surprised.png'
        },
        defaultLocation: 'lab'
    },
    rival: {
        id: 'rival',
        name: '민수',
        title: '라이벌 트레이너',
        image: 'rival_normal.png',
        images: {
            normal: 'rival_normal.png',
            happy: 'rival_happy.png',
            confident: 'rival_confident.png',
            surprised: 'rival_surprised.png',
            sad: 'rival_sad.png'
        },
        defaultLocation: 'hometown'
    },
    cafe_owner: {
        id: 'cafe_owner',
        name: '카페 사장님',
        title: '포근한 카페의 주인',
        image: 'cafe_owner_normal.png',
        images: {
            normal: 'cafe_owner_normal.png',
            happy: 'cafe_owner_happy.png',
            worried: 'cafe_owner_worried.png'
        },
        defaultLocation: 'cafe'
    },
    stranger: {
        id: 'stranger',
        name: '???',
        title: '수상한 사람',
        image: 'stranger_normal.png',
        images: {
            normal: 'stranger_normal.png',
            mysterious: 'stranger_mysterious.png',
            serious: 'stranger_serious.png'
        },
        defaultLocation: null
    },
    mom: {
        id: 'mom',
        name: '엄마',
        title: '따뜻한 가족',
        image: 'mom_normal.png',
        images: {
            normal: 'mom_normal.png',
            happy: 'mom_happy.png',
            worried: 'mom_worried.png'
        },
        defaultLocation: 'player_house'
    },
    villager_old_man: {
        id: 'villager_old_man',
        name: '할아버지',
        title: '마을의 원로',
        image: 'villager_old_man.png',
        defaultLocation: 'hometown'
    },
    shop_owner: {
        id: 'shop_owner',
        name: '상점 주인',
        title: '무엇이든 파는 상인',
        image: 'shop_owner.png',
        defaultLocation: 'shop'
    },
    nurse: {
        id: 'nurse',
        name: '간호사 조이',
        title: '몬스터 센터 간호사',
        image: 'nurse_normal.png',
        images: {
            normal: 'nurse_normal.png',
            happy: 'nurse_happy.png'
        },
        defaultLocation: 'pokemon_center'
    }
};

// 스토리 장소 데이터
const STORY_LOCATIONS = {
    player_house: {
        id: 'player_house',
        name: '우리 집',
        description: '따뜻하고 편안한 나의 집',
        background: 'location_player_house_inside.png',
        connectedTo: ['hometown'],
        npcs: ['mom'],
        canExplore: false
    },
    hometown: {
        id: 'hometown',
        name: '시작의 마을',
        description: '평화로운 작은 마을. 여기서 모험이 시작된다.',
        background: 'location_hometown.png',
        connectedTo: ['player_house', 'lab', 'cafe', 'pokemon_center', 'route1'],
        npcs: ['rival', 'villager_old_man'],
        canExplore: false
    },
    pokemon_center: {
        id: 'pokemon_center',
        name: '몬스터 센터',
        description: '지친 몬스터들을 치료해주는 곳',
        background: 'location_pokemon_center.png',
        connectedTo: ['hometown'],
        npcs: ['nurse'],
        canExplore: false,
        canHeal: true
    },
    lab: {
        id: 'lab',
        name: '몬스터 연구소',
        description: '오크 박사가 몬스터를 연구하는 곳',
        background: 'location_lab_inside.png',
        connectedTo: ['hometown'],
        npcs: ['professor'],
        canExplore: false
    },
    cafe: {
        id: 'cafe',
        name: '포근한 카페',
        description: '맛있는 음료와 정보를 얻을 수 있는 곳',
        background: 'location_cafe_inside.png',
        connectedTo: ['hometown'],
        npcs: ['cafe_owner'],
        canExplore: false
    },
    route1: {
        id: 'route1',
        name: '1번 도로',
        description: '초원이 펼쳐진 첫 번째 도로',
        background: 'location_route1.png',
        connectedTo: ['hometown', 'forest_entrance'],
        npcs: [],
        canExplore: true,
        exploreRegion: 'meadow'
    },
    forest_entrance: {
        id: 'forest_entrance',
        name: '숲 입구',
        description: '신비로운 숲의 시작점',
        background: 'location_forest_entrance.png',
        connectedTo: ['route1', 'forest_deep'],
        npcs: [],
        canExplore: true,
        exploreRegion: 'forest'
    },
    forest_deep: {
        id: 'forest_deep',
        name: '숲 깊은 곳',
        description: '울창한 숲 속 깊은 곳',
        background: 'location_forest_deep.png',
        connectedTo: ['forest_entrance', 'lake_area'],
        npcs: [],
        canExplore: true,
        exploreRegion: 'forest'
    },
    lake_area: {
        id: 'lake_area',
        name: '신비의 호수',
        description: '맑은 물이 반짝이는 호수',
        background: 'location_lake.png',
        connectedTo: ['forest_deep', 'mountain_base'],
        npcs: [],
        canExplore: true,
        exploreRegion: 'lake'
    },
    mountain_base: {
        id: 'mountain_base',
        name: '산기슭',
        description: '험준한 산의 입구',
        background: 'location_mountain_base.png',
        connectedTo: ['lake_area', 'cave_entrance'],
        npcs: [],
        canExplore: true,
        exploreRegion: 'mountain'
    },
    cave_entrance: {
        id: 'cave_entrance',
        name: '동굴 입구',
        description: '어두운 동굴로 들어가는 입구',
        background: 'location_cave_entrance.png',
        connectedTo: ['mountain_base'],
        npcs: [],
        canExplore: true,
        exploreRegion: 'cave'
    }
};

// 스토리 챕터
const STORY_CHAPTERS = {
    chapter1: {
        id: 'chapter1',
        name: '모험의 시작',
        description: '첫 몬스터를 받고 모험을 떠나다',
        scenes: ['intro', 'wake_up', 'meet_mom', 'go_to_lab', 'meet_professor', 'choose_starter', 'meet_rival'],
        unlockCondition: null
    },
    chapter2: {
        id: 'chapter2',
        name: '첫 번째 여정',
        description: '1번 도로를 지나 숲으로',
        scenes: ['first_battle_tutorial', 'explore_route1', 'enter_forest'],
        unlockCondition: { type: 'chapter_complete', value: 'chapter1' }
    },
    chapter3: {
        id: 'chapter3',
        name: '수상한 그림자',
        description: '숲에서 만난 미스터리한 인물',
        scenes: ['forest_encounter', 'meet_stranger', 'stranger_warning'],
        unlockCondition: { type: 'chapter_complete', value: 'chapter2' }
    },
    chapter4: {
        id: 'chapter4',
        name: '라이벌과의 대결',
        description: '민수와의 첫 번째 배틀',
        scenes: ['rival_challenge', 'rival_battle', 'after_battle'],
        unlockCondition: { type: 'monsters_caught', value: 3 }
    }
};

// 스토리 씬 (대화 및 이벤트)
const STORY_SCENES = {
    // Chapter 1: 모험의 시작
    intro: {
        id: 'intro',
        location: null,
        dialogues: [
            { speaker: 'professor', emotion: 'happy', text: '안녕! 몬스터의 세계에 온 것을 환영해!' },
            { speaker: 'professor', emotion: 'normal', text: '내 이름은 오크 박사. 이 지역에서 몬스터를 연구하고 있지.' },
            { speaker: 'professor', emotion: 'thinking', text: '이 세계에는 수많은 몬스터들이 살고 있어. 어떤 건 친근하고, 어떤 건 위험하기도 하지.' },
            { speaker: 'professor', emotion: 'happy', text: '하지만 마음을 열면 누구와도 친구가 될 수 있단다.' },
            { speaker: 'professor', emotion: 'thinking', text: '그런데... 너의 이름은 뭐니?' }
        ],
        nextScene: 'wake_up',
        action: { type: 'input_name' }
    },
    wake_up: {
        id: 'wake_up',
        location: 'player_house',
        dialogues: [
            { speaker: 'narrator', text: '따스한 햇살이 창문으로 들어오는 어느 화창한 아침...' },
            { speaker: 'player', text: '(눈을 비비며) 으음... 벌써 아침이야?' },
            { speaker: 'player', text: '(갑자기 벌떡 일어나며) 잠깐, 오늘이 바로 그 날이잖아!' },
            { speaker: 'player', text: '드디어 첫 몬스터를 받으러 연구소에 갈 수 있어!' },
            { speaker: 'player', text: '어떤 몬스터가 나를 기다리고 있을까... 두근두근!' }
        ],
        nextScene: 'meet_mom'
    },
    meet_mom: {
        id: 'meet_mom',
        location: 'player_house',
        dialogues: [
            { speaker: 'mom', emotion: 'happy', text: '{playerName}! 드디어 일어났구나. 기다리고 있었어.' },
            { speaker: 'player', text: '엄마! 오늘 연구소에 갈 수 있는 거지?' },
            { speaker: 'mom', emotion: 'happy', text: '물론이지. 오크 박사님이 연구소에서 기다리고 계셔.' },
            { speaker: 'mom', emotion: 'normal', text: '박사님이 특별히 너를 위해 몬스터를 준비해두셨대.' },
            { speaker: 'player', text: '정말?! 최고다!' },
            { speaker: 'mom', emotion: 'worried', text: '하지만... {playerName}, 세상은 넓고 위험한 곳도 있어.' },
            { speaker: 'mom', emotion: 'normal', text: '항상 몬스터 친구들을 소중히 여기고, 무리하지 말아줘.' },
            { speaker: 'mom', emotion: 'happy', text: '조심해서 다녀와. 그리고 가끔 집에도 들러줘!' },
            { speaker: 'player', text: '알았어 엄마! 걱정 마. 다녀올게!' }
        ],
        nextScene: null,
        action: { type: 'unlock_location', value: 'hometown' }
    },
    go_to_lab: {
        id: 'go_to_lab',
        location: 'hometown',
        dialogues: [
            { speaker: 'narrator', text: '설레는 마음으로 마을을 가로질러 연구소로 향한다.' },
            { speaker: 'narrator', text: '평화로운 시작의 마을. 작지만 따뜻한 곳이다.' },
            { speaker: 'villager_old_man', text: '오, {playerName}! 벌써 이렇게 컸구나.' },
            { speaker: 'player', text: '안녕하세요, 할아버지!' },
            { speaker: 'villager_old_man', text: '오늘 드디어 첫 몬스터를 받는 날이지?' },
            { speaker: 'player', text: '네! 정말 기대돼요!' },
            { speaker: 'villager_old_man', text: '좋은 트레이너가 되길 바란다. 몬스터를 사랑하는 마음을 잊지 말거라.' },
            { speaker: 'villager_old_man', text: '아, 그리고 연구소는 마을 북쪽에 있단다. 어서 가보거라!' }
        ],
        nextScene: null,
        action: { type: 'unlock_location', value: 'lab' }
    },
    meet_professor: {
        id: 'meet_professor',
        location: 'lab',
        dialogues: [
            { speaker: 'narrator', text: '연구소 안은 다양한 연구 장비와 책들로 가득 차 있다.' },
            { speaker: 'professor', emotion: 'happy', text: '오, {playerName}! 드디어 왔구나! 기다리고 있었어.' },
            { speaker: 'player', text: '안녕하세요, 박사님!' },
            { speaker: 'professor', emotion: 'normal', text: '오늘이 바로 네가 첫 몬스터를 받는 특별한 날이야.' },
            { speaker: 'professor', emotion: 'thinking', text: '몬스터와 함께하는 여행... 그것은 단순한 모험이 아니란다.' },
            { speaker: 'professor', emotion: 'normal', text: '서로를 믿고 성장하는 소중한 경험이지.' },
            { speaker: 'professor', emotion: 'happy', text: '자, 여기를 보렴. 세 마리의 몬스터가 널 기다리고 있어.' },
            { speaker: 'professor', emotion: 'normal', text: '불꽃의 열정을 가진 플레임링...' },
            { speaker: 'professor', emotion: 'normal', text: '물처럼 유연한 아쿠아펍...' },
            { speaker: 'professor', emotion: 'normal', text: '그리고 자연의 힘을 품은 스프라우티.' },
            { speaker: 'professor', emotion: 'thinking', text: '각자 다른 매력이 있지. 네 마음이 이끄는 대로 선택하렴.' }
        ],
        nextScene: 'choose_starter',
        action: { type: 'choose_starter' }
    },
    choose_starter: {
        id: 'choose_starter',
        location: 'lab',
        dialogues: [
            { speaker: 'professor', emotion: 'happy', text: '오, {starterName}을(를) 선택했구나!' },
            { speaker: 'professor', emotion: 'normal', text: '좋은 선택이야. 이 아이와 함께라면 어떤 어려움도 이겨낼 수 있을 거야.' },
            { speaker: 'player', text: '안녕, {starterName}! 앞으로 잘 부탁해!' },
            { speaker: 'professor', emotion: 'happy', text: '호호, {starterName}도 기뻐 보이는구나.' },
            { speaker: 'professor', emotion: 'normal', text: '자, 이것도 가져가렴. 몬스터볼 5개와 몬스터 도감이야.' },
            { speaker: 'player', text: '와, 감사합니다, 박사님!' },
            { speaker: 'professor', emotion: 'thinking', text: '도감에는 네가 만나는 몬스터들의 정보가 기록된단다.' },
            { speaker: 'professor', emotion: 'normal', text: '많은 몬스터를 만나고, 도감을 채워보렴!' },
            { speaker: 'professor', emotion: 'happy', text: '아, 그리고 민수도 아까 왔었어. 벌써 첫 몬스터를 받아갔지.' },
            { speaker: 'player', text: '민수가요? 뭘 골랐어요?' },
            { speaker: 'professor', emotion: 'thinking', text: '직접 만나서 확인해보렴. 좋은 라이벌이 될 거야!' },
            { speaker: 'professor', emotion: 'happy', text: '자, 이제 모험을 시작할 시간이야. 행운을 빌어!' }
        ],
        nextScene: null,
        action: { type: 'receive_items', items: { pokeball: 5 } }
    },
    meet_rival: {
        id: 'meet_rival',
        location: 'hometown',
        dialogues: [
            { speaker: 'narrator', text: '연구소를 나서자 익숙한 목소리가 들린다.' },
            { speaker: 'rival', emotion: 'confident', text: '거기 서! {playerName}!' },
            { speaker: 'player', text: '어, 민수? 오랜만이다!' },
            { speaker: 'rival', emotion: 'happy', text: '오랜만이긴! 너도 드디어 첫 몬스터 받았구나?' },
            { speaker: 'player', text: '응! 방금 받았어. 너는 뭘 골랐어?' },
            { speaker: 'rival', emotion: 'confident', text: '나? 당연히 {rivalStarter}이지! 최고의 선택이야!' },
            { speaker: 'rival', emotion: 'normal', text: '음... 근데 너는 뭘 골랐어?' },
            { speaker: 'player', text: '나는 {starterName}을(를)!' },
            { speaker: 'rival', emotion: 'thinking', text: '흠... 나쁘지 않은 선택이네.' },
            { speaker: 'rival', emotion: 'confident', text: '좋아! 우리 언젠가 꼭 배틀하자!' },
            { speaker: 'rival', emotion: 'happy', text: '누가 더 강한지 진짜 대결로 확인해보는 거야!' },
            { speaker: 'player', text: '좋아! 기대할게!' },
            { speaker: 'rival', emotion: 'normal', text: '그때까지 열심히 훈련해둬! 약한 상대는 재미없으니까.' },
            { speaker: 'rival', emotion: 'confident', text: '그럼 나 먼저 갈게! 나중에 보자!' },
            { speaker: 'narrator', text: '민수는 씩씩하게 어디론가 뛰어갔다.' },
            { speaker: 'player', text: '(웃으며) 정말 변함없네, 민수는.' }
        ],
        nextScene: null,
        action: { type: 'complete_chapter', value: 'chapter1' }
    },

    // Chapter 2: 첫 번째 여정
    first_battle_tutorial: {
        id: 'first_battle_tutorial',
        location: 'route1',
        dialogues: [
            { speaker: 'narrator', text: '1번 도로의 풀숲을 지나가던 중...' },
            { speaker: 'narrator', text: '갑자기 풀숲에서 무언가 움직인다!' },
            { speaker: 'player', text: '잠깐, 저건...!' },
            { speaker: 'player', text: '야생 몬스터다! 드디어 첫 배틀이야!' },
            { speaker: 'player', text: '자, {starterName}! 우리의 첫 전투야!' }
        ],
        nextScene: null,
        action: { type: 'wild_battle', level: 3 }
    },
    explore_route1: {
        id: 'explore_route1',
        location: 'route1',
        dialogues: [
            { speaker: 'narrator', text: '1번 도로를 탐험하며 여러 몬스터를 만났다.' },
            { speaker: 'player', text: '휴... 꽤 많은 몬스터들을 만났네.' },
            { speaker: 'player', text: '{starterName}도 많이 강해진 것 같아!' },
            { speaker: 'player', text: '이제 좀 감이 잡히는 것 같아. 배틀이 재밌어!' },
            { speaker: 'narrator', text: '저 멀리 울창한 숲이 보인다...' },
            { speaker: 'player', text: '저기 숲이 있네. 어떤 몬스터들이 있을까?' }
        ],
        nextScene: null,
        action: { type: 'unlock_location', value: 'forest_entrance' }
    },
    enter_forest: {
        id: 'enter_forest',
        location: 'forest_entrance',
        dialogues: [
            { speaker: 'narrator', text: '숲의 입구에 도착했다. 울창한 나무들이 하늘을 가리고 있다.' },
            { speaker: 'player', text: '와... 정말 크다. 숲 안이 어두워 보여.' },
            { speaker: 'player', text: '여기에는 어떤 몬스터들이 살고 있을까...' },
            { speaker: 'narrator', text: '바람이 불어오며 나뭇잎이 스산하게 흔들린다.' },
            { speaker: 'player', text: '음? 뭔가 이상한 기운이 느껴지는데...' },
            { speaker: 'player', text: '기분 탓인가? 조심해서 들어가봐야겠어.' }
        ],
        nextScene: null,
        action: { type: 'complete_chapter', value: 'chapter2' }
    },

    // Chapter 3: 수상한 그림자
    forest_encounter: {
        id: 'forest_encounter',
        location: 'forest_deep',
        dialogues: [
            { speaker: 'narrator', text: '숲 깊은 곳으로 들어섰다. 빛이 거의 들지 않는다.' },
            { speaker: 'player', text: '여기 정말 어둡다... {starterName}, 괜찮아?' },
            { speaker: 'narrator', text: '갑자기 저쪽에서 검은 그림자가 움직인다.' },
            { speaker: 'player', text: '...! 거기 누구세요?' }
        ],
        nextScene: 'meet_stranger'
    },
    meet_stranger: {
        id: 'meet_stranger',
        location: 'forest_deep',
        dialogues: [
            { speaker: 'stranger', emotion: 'mysterious', text: '...' },
            { speaker: 'player', text: '(긴장하며) 저기요...?' },
            { speaker: 'stranger', emotion: 'normal', text: '...흥미롭군.' },
            { speaker: 'stranger', emotion: 'mysterious', text: '새로운 트레이너인가. 그것도 꽤 어린.' },
            { speaker: 'player', text: '당신은 누구세요? 왜 이런 곳에...' },
            { speaker: 'stranger', emotion: 'serious', text: '이름 따위는 중요하지 않아.' },
            { speaker: 'stranger', emotion: 'mysterious', text: '다만... 넌 알아야 해.' },
            { speaker: 'player', text: '뭘요?' },
            { speaker: 'stranger', emotion: 'serious', text: '이 세계에는... 곧 큰 변화가 찾아올 거야.' }
        ],
        nextScene: 'stranger_warning'
    },
    stranger_warning: {
        id: 'stranger_warning',
        location: 'forest_deep',
        dialogues: [
            { speaker: 'player', text: '큰 변화요? 무슨 말이에요?' },
            { speaker: 'stranger', emotion: 'serious', text: '마법의 공간... 그곳에서 무언가가 깨어나고 있어.' },
            { speaker: 'player', text: '마법의 공간이요? 그게 뭔데요?' },
            { speaker: 'stranger', emotion: 'mysterious', text: '오래전부터 전해지는 이야기...' },
            { speaker: 'stranger', emotion: 'serious', text: '현실과 다른 차원이 연결되는 곳이라고 하지.' },
            { speaker: 'stranger', emotion: 'mysterious', text: '그 경계가... 흔들리고 있어.' },
            { speaker: 'player', text: '그게 무슨...' },
            { speaker: 'stranger', emotion: 'normal', text: '지금은 이해하지 못해도 괜찮아.' },
            { speaker: 'stranger', emotion: 'serious', text: '다만, 네 몬스터를 소중히 여겨. 언젠가 그들의 힘이 필요할 테니.' },
            { speaker: 'narrator', text: '수상한 사람은 그림자 속으로 조용히 사라졌다.' },
            { speaker: 'player', text: '잠깐요...!' },
            { speaker: 'narrator', text: '하지만 그 사람은 이미 보이지 않았다.' },
            { speaker: 'player', text: '마법의 공간... 차원의 경계...' },
            { speaker: 'player', text: '뭐지... 조금 무섭지만, 이상하게 신경이 쓰여.' }
        ],
        nextScene: null,
        action: { type: 'complete_chapter', value: 'chapter3' }
    },

    // Chapter 4: 라이벌과의 대결
    rival_challenge: {
        id: 'rival_challenge',
        location: 'lake_area',
        dialogues: [
            { speaker: 'narrator', text: '신비의 호수에 도착했다. 맑은 물이 햇살에 반짝인다.' },
            { speaker: 'player', text: '와... 여기 정말 예쁘다.' },
            { speaker: 'rival', emotion: 'confident', text: '{playerName}! 드디어 찾았다!' },
            { speaker: 'player', text: '어? 민수? 여기서 뭐해?' },
            { speaker: 'rival', emotion: 'happy', text: '뭐긴 뭐야! 너 찾아다녔어!' },
            { speaker: 'rival', emotion: 'confident', text: '약속했잖아, 언젠가 배틀하자고!' },
            { speaker: 'player', text: '설마... 지금?' },
            { speaker: 'rival', emotion: 'happy', text: '당연하지! 나도 열심히 훈련했단 말야.' },
            { speaker: 'rival', emotion: 'confident', text: '몬스터들도 많이 키웠고!' },
            { speaker: 'rival', emotion: 'normal', text: '자, 준비됐어? 진지하게 갈 거야.' },
            { speaker: 'player', text: '좋아! 받아줄게, 민수!' }
        ],
        nextScene: 'rival_battle',
        action: { type: 'rival_battle' }
    },
    rival_battle: {
        id: 'rival_battle',
        location: 'lake_area',
        dialogues: [],
        nextScene: 'after_battle'
    },
    after_battle: {
        id: 'after_battle',
        location: 'lake_area',
        dialogues: [
            { speaker: 'rival', emotion: 'sad', text: '으으... 졌어...' },
            { speaker: 'player', text: '민수, 괜찮아?' },
            { speaker: 'rival', emotion: 'normal', text: '(한숨) 분하다... 정말 분해!' },
            { speaker: 'rival', emotion: 'thinking', text: '근데... 인정할 건 인정해야지.' },
            { speaker: 'rival', emotion: 'normal', text: '역시 {playerName}은 대단해. 나보다 강했어.' },
            { speaker: 'player', text: '민수도 정말 강해졌던걸? 힘들었어.' },
            { speaker: 'rival', emotion: 'happy', text: '흥, 위로는 됐고!' },
            { speaker: 'rival', emotion: 'confident', text: '다음엔 내가 이길 거야. 두고 봐!' },
            { speaker: 'player', text: '다음에 또 하자, 민수! 언제든 환영이야.' },
            { speaker: 'rival', emotion: 'happy', text: '당연하지! 더 강해져서 반드시 다시 올 거야!' },
            { speaker: 'rival', emotion: 'normal', text: '그때까지... 너도 더 강해져 있어! 안녕!' },
            { speaker: 'narrator', text: '민수는 어딘가로 달려갔다. 뒷모습이 의욕으로 가득 차 보인다.' },
            { speaker: 'player', text: '(미소 지으며) 민수와의 첫 번째 대결... 이겼다!' },
            { speaker: 'player', text: '{starterName}, 고마워. 덕분에 이길 수 있었어!' }
        ],
        nextScene: null,
        action: { type: 'complete_chapter', value: 'chapter4' }
    },

    // 카페 대화 (첫 방문)
    cafe_chat: {
        id: 'cafe_chat',
        location: 'cafe',
        dialogues: [
            { speaker: 'cafe_owner', emotion: 'happy', text: '어서와! 우리 카페에 온 걸 환영해!' },
            { speaker: 'player', text: '안녕하세요!' },
            { speaker: 'cafe_owner', emotion: 'normal', text: '처음 보는 얼굴이네. 새로운 트레이너구나?' },
            { speaker: 'player', text: '네, 얼마 전에 첫 몬스터를 받았어요!' },
            { speaker: 'cafe_owner', emotion: 'happy', text: '그렇구나! 축하해! 커피 한 잔 서비스야.' },
            { speaker: 'player', text: '감사합니다!' },
            { speaker: 'cafe_owner', emotion: 'normal', text: '이 근처에 대해 알려줄까? 이곳에서 오래 살았거든.' },
            { speaker: 'cafe_owner', emotion: 'worried', text: '1번 도로는 초보자에게 적당해. 하지만 숲 깊은 곳은 조심해야 해.' },
            { speaker: 'cafe_owner', emotion: 'normal', text: '희귀한 몬스터도 있지만, 위험할 수 있거든.' },
            { speaker: 'cafe_owner', emotion: 'happy', text: '피곤하면 언제든 쉬러 와! 여행 이야기도 들려줘!' }
        ],
        nextScene: null
    }
};

// 스타터 몬스터 목록
const STARTER_MONSTERS = ['flameling', 'aquapup', 'sproutie'];

// 라이벌 스타터 선택 (플레이어 선택에 따라 상성 유리한 몬스터)
const RIVAL_STARTER_MAP = {
    flameling: 'aquapup',    // 불 → 물
    aquapup: 'sproutie',     // 물 → 풀
    sproutie: 'flameling'    // 풀 → 불
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
