# 스토리 모드 이미지 가이드라인

## 개요
스토리 모드에 필요한 모든 이미지 사양과 가이드라인입니다.
이미지를 생성한 후 `images/` 폴더에 저장해 주세요.

---

## 폴더 구조
```
monster-hunting-game/
└── images/
    ├── npcs/           # NPC 캐릭터 이미지
    ├── locations/      # 배경 이미지
    ├── player/         # 플레이어 아바타
    └── icons/          # 맵 아이콘
```

---

## 1. NPC 캐릭터 이미지

### 공통 사양
- **크기**: 256 x 512 픽셀 (세로로 긴 캐릭터)
- **배경**: 투명 (PNG 형식)
- **스타일**: 애니메이션/게임 스타일, 밝고 친근한 느낌

### 1.1 박사 (Professor Oak 스타일)
| 파일명 | 표정 | 설명 |
|--------|------|------|
| `professor_normal.png` | 보통 | 기본 표정, 친절한 미소 |
| `professor_happy.png` | 기쁨 | 환하게 웃는 표정 |
| `professor_thinking.png` | 생각 | 턱에 손을 대고 생각하는 모습 |
| `professor_surprised.png` | 놀람 | 눈을 크게 뜬 놀란 표정 |

**캐릭터 설명**:
- 50-60대 남성, 흰 연구복 착용
- 친절하고 지혜로운 인상
- 약간 흰머리가 섞인 갈색 머리
- 안경 착용

### 1.2 라이벌 (친구/경쟁자)
| 파일명 | 표정 | 설명 |
|--------|------|------|
| `rival_normal.png` | 보통 | 자신감 있는 기본 표정 |
| `rival_happy.png` | 기쁨 | 밝게 웃는 표정 |
| `rival_confident.png` | 도전적 | 도전적인 미소 |
| `rival_surprised.png` | 놀람 | 놀란 표정 |
| `rival_sad.png` | 슬픔 | 패배 후 아쉬워하는 표정 |

**캐릭터 설명**:
- 10대 후반, 남성 또는 여성 (선택)
- 스포티한 캐주얼 복장
- 에너지 넘치고 경쟁심 있는 인상
- 빨간색이나 파란색 계열 옷

### 1.3 카페 주인
| 파일명 | 표정 | 설명 |
|--------|------|------|
| `cafe_owner_normal.png` | 보통 | 따뜻한 미소 |
| `cafe_owner_happy.png` | 기쁨 | 환영하는 표정 |
| `cafe_owner_worried.png` | 걱정 | 걱정스러운 표정 |

**캐릭터 설명**:
- 30-40대 여성
- 앞치마를 두른 카페 유니폼
- 부드럽고 친근한 인상
- 갈색 머리, 포니테일

### 1.4 수상한 사람 (미스터리 캐릭터)
| 파일명 | 표정 | 설명 |
|--------|------|------|
| `stranger_normal.png` | 보통 | 무표정, 신비로운 느낌 |
| `stranger_mysterious.png` | 미스터리 | 의미심장한 미소 |
| `stranger_serious.png` | 진지 | 진지한 표정 |

**캐릭터 설명**:
- 나이를 알 수 없는 미스터리한 인물
- 검은 망토나 후드 착용
- 얼굴이 약간 가려진 느낌
- 보라색이나 검은색 톤

### 1.5 엄마
| 파일명 | 표정 | 설명 |
|--------|------|------|
| `mom_normal.png` | 보통 | 기본 표정, 따뜻한 미소 |
| `mom_happy.png` | 기쁨 | 환하게 웃는 표정 |
| `mom_worried.png` | 걱정 | 걱정스러운 표정 |

**캐릭터 설명**:
- 30-40대 여성
- 부드럽고 따뜻한 인상
- 에이프런이나 편안한 복장
- 갈색 또는 검은 머리

### 1.6 간호사 조이
| 파일명 | 표정 | 설명 |
|--------|------|------|
| `nurse_normal.png` | 보통 | 친절한 미소 |
| `nurse_happy.png` | 기쁨 | 환하게 웃는 표정 |

**캐릭터 설명**:
- 20-30대 여성
- 분홍색 또는 흰색 간호사 유니폼
- 밝고 친절한 인상
- 분홍색 또는 빨간색 머리 (포켓몬 스타일)

### 1.7 상점 주인
| 파일명 | 설명 |
|--------|------|
| `shop_owner.png` | 상점 주인, 친절한 상인 |

**캐릭터 설명**:
- 30-50대 남성 또는 여성
- 상인 앞치마 착용
- 친절하고 호기심 가득한 표정

### 1.8 마을 사람들
| 파일명 | 설명 |
|--------|------|
| `villager_old_man.png` | 노인 남성, 친절한 할아버지 |
| `villager_old_woman.png` | 노인 여성, 다정한 할머니 |
| `villager_boy.png` | 어린 남자아이, 호기심 많은 표정 |
| `villager_girl.png` | 어린 여자아이, 밝은 표정 |

### 1.9 트레이너들 (배틀용)
| 파일명 | 설명 |
|--------|------|
| `trainer_youngster.png` | 젊은 남성 트레이너, 반바지 소년 |
| `trainer_lass.png` | 젊은 여성 트레이너, 치마 소녀 |
| `trainer_hiker.png` | 등산가 트레이너, 배낭 멘 모습 |
| `trainer_swimmer.png` | 수영 트레이너, 수영복 차림 |

---

## 2. 장소 배경 이미지

### 공통 사양
- **크기**: 480 x 360 픽셀
- **형식**: PNG 또는 JPG
- **스타일**: 따뜻한 색감의 일러스트 스타일

### 2.1 주인공의 집
| 파일명 | 설명 |
|--------|------|
| `location_player_house_inside.png` | 집 내부, 아늑한 침실/거실 |
| `location_player_house_outside.png` | 집 외관, 작은 마당이 있는 집 |

**장소 설명**:
- 따뜻하고 아늑한 느낌
- 창문으로 햇빛이 들어오는 모습
- 포켓몬 포스터나 장식품이 있으면 좋음

### 2.2 고향 마을 (시작 마을)
| 파일명 | 설명 |
|--------|------|
| `location_hometown.png` | 마을 전경, 작은 마을 풍경 |
| `location_hometown_square.png` | 마을 광장, 중앙에 분수대 |

**장소 설명**:
- 평화로운 시골 마을
- 작은 집들과 꽃밭
- 맑은 하늘과 푸른 자연

### 2.3 연구소
| 파일명 | 설명 |
|--------|------|
| `location_lab_outside.png` | 연구소 외관, 현대적인 건물 |
| `location_lab_inside.png` | 연구소 내부, 연구 장비와 몬스터볼 |

**장소 설명**:
- 깨끗하고 과학적인 분위기
- 컴퓨터, 실험 장비, 몬스터볼 보관대
- 밝은 조명

### 2.4 카페
| 파일명 | 설명 |
|--------|------|
| `location_cafe_outside.png` | 카페 외관, 귀여운 카페 건물 |
| `location_cafe_inside.png` | 카페 내부, 테이블과 카운터 |

**장소 설명**:
- 따뜻한 색감의 아늑한 카페
- 커피와 케이크가 있는 진열대
- 창가 자리가 보이는 구도

### 2.5 숲 입구
| 파일명 | 설명 |
|--------|------|
| `location_forest_entrance.png` | 숲 입구, 나무들 사이의 길 |

**장소 설명**:
- 울창한 나무들
- 신비로운 분위기
- 풀숲에서 몬스터가 나올 것 같은 느낌

### 2.6 몬스터 센터
| 파일명 | 설명 |
|--------|------|
| `location_pokemon_center.png` | 몬스터 센터 내부, 치료 기계와 카운터 |

**장소 설명**:
- 밝고 깨끗한 분위기
- 분홍색/흰색 톤
- 카운터에 간호사 조이가 있는 느낌
- 몬스터 치료 기계가 보이는 구도

### 2.7 루트 (이동 경로)
| 파일명 | 설명 |
|--------|------|
| `location_route1.png` | 1번 도로, 풀밭과 길 |
| `location_route2.png` | 2번 도로, 언덕과 길 |

**장소 설명**:
- 야생 몬스터가 나타날 것 같은 풀밭
- 걸어갈 수 있는 흙길
- 자연 풍경

### 2.8 깊은 숲
| 파일명 | 설명 |
|--------|------|
| `location_forest_deep.png` | 숲 깊은 곳, 울창한 나무와 어두운 분위기 |

**장소 설명**:
- 빛이 잘 들지 않는 어두운 숲
- 신비로운 분위기
- 나무 사이로 살짝 비치는 빛

### 2.9 신비의 호수
| 파일명 | 설명 |
|--------|------|
| `location_lake.png` | 호수 전경, 맑은 물과 풍경 |

**장소 설명**:
- 맑고 푸른 호수
- 반짝이는 수면
- 주변에 나무와 꽃들
- 평화롭고 신비로운 분위기

### 2.10 산기슭
| 파일명 | 설명 |
|--------|------|
| `location_mountain_base.png` | 산 입구, 바위와 언덕 |

**장소 설명**:
- 험준한 바위 지형
- 산으로 이어지는 길
- 갈색/회색 톤의 자연

### 2.11 동굴 입구
| 파일명 | 설명 |
|--------|------|
| `location_cave_entrance.png` | 동굴 입구, 어두운 동굴 앞 |

**장소 설명**:
- 어둡고 신비로운 동굴 입구
- 안쪽이 보이지 않는 어둠
- 바위로 둘러싸인 입구

---

## 3. 플레이어 아바타

### 공통 사양
- **전신 이미지**: 256 x 512 픽셀 (투명 배경)
- **아이콘**: 64 x 64 픽셀 (투명 배경)

### 3.1 남자 주인공
| 파일명 | 크기 | 설명 |
|--------|------|------|
| `player_boy.png` | 256x512 | 전신, 모험가 복장 |
| `player_boy_icon.png` | 64x64 | 얼굴 아이콘 |

**캐릭터 설명**:
- 10대 소년, 밝은 표정
- 모자, 재킷, 배낭 착용
- 빨간색/파란색 계열 의상

### 3.2 여자 주인공
| 파일명 | 크기 | 설명 |
|--------|------|------|
| `player_girl.png` | 256x512 | 전신, 모험가 복장 |
| `player_girl_icon.png` | 64x64 | 얼굴 아이콘 |

**캐릭터 설명**:
- 10대 소녀, 밝은 표정
- 모자, 원피스 또는 재킷, 배낭 착용
- 분홍색/하늘색 계열 의상

---

## 4. 맵 타일/아이콘 (선택사항)

맵 화면에서 사용할 아이콘들입니다.

| 파일명 | 크기 | 설명 |
|--------|------|------|
| `map_icon_house.png` | 48x48 | 집 아이콘 |
| `map_icon_lab.png` | 48x48 | 연구소 아이콘 |
| `map_icon_cafe.png` | 48x48 | 카페 아이콘 |
| `map_icon_pokecenter.png` | 48x48 | 몬스터 센터 아이콘 (분홍색 건물) |
| `map_icon_forest.png` | 48x48 | 숲 아이콘 |
| `map_icon_player.png` | 32x32 | 플레이어 위치 마커 |
| `map_icon_town.png` | 48x48 | 시작 마을 아이콘 |
| `map_icon_route.png` | 48x48 | 도로 아이콘 |
| `map_icon_lake.png` | 48x48 | 호수 아이콘 |
| `map_icon_mountain.png` | 48x48 | 산기슭 아이콘 |
| `map_icon_cave.png` | 48x48 | 동굴 입구 아이콘 |

---

## 5. 이미지 생성 팁

### 스타일 가이드
- **전체 톤**: 밝고 친근한 애니메이션 스타일
- **색상**: 채도 높은 밝은 색상 사용
- **선**: 깔끔한 외곽선
- **표정**: 과장된 귀여운 표정

### AI 이미지 생성 프롬프트 예시

**NPC 캐릭터**:
```
"anime style character portrait, professor in white lab coat,
friendly elderly man with glasses, warm smile,
transparent background, full body, 256x512 pixels"
```

**배경 이미지**:
```
"cozy anime village scene, small houses with gardens,
sunny day, peaceful atmosphere, illustrated style,
480x360 pixels, game background"
```

---

## 6. 이미지 체크리스트

### 필수 이미지 (최소 요구사항)

#### NPC 캐릭터
- [ ] `professor_normal.png`
- [ ] `rival_normal.png`
- [ ] `cafe_owner_normal.png`
- [ ] `stranger_normal.png`
- [ ] `mom_normal.png`
- [ ] `nurse_normal.png`

#### 장소 배경
- [ ] `location_player_house_inside.png`
- [ ] `location_hometown.png`
- [ ] `location_lab_inside.png`
- [ ] `location_pokemon_center.png`

#### 플레이어
- [ ] `player_boy.png` 또는 `player_girl.png`

### 권장 이미지 (게임 경험 향상)

#### NPC 추가 표정
- [ ] `professor_happy.png`, `professor_thinking.png`, `professor_surprised.png`
- [ ] `rival_happy.png`, `rival_confident.png`, `rival_surprised.png`, `rival_sad.png`
- [ ] `cafe_owner_happy.png`, `cafe_owner_worried.png`
- [ ] `stranger_mysterious.png`, `stranger_serious.png`
- [ ] `mom_happy.png`, `mom_worried.png`
- [ ] `nurse_happy.png`

#### 추가 장소 배경
- [ ] `location_cafe_inside.png`
- [ ] `location_route1.png`
- [ ] `location_forest_entrance.png`
- [ ] `location_forest_deep.png`
- [ ] `location_lake.png`
- [ ] `location_mountain_base.png`
- [ ] `location_cave_entrance.png`

#### 맵 아이콘
- [ ] `map_icon_house.png`
- [ ] `map_icon_lab.png`
- [ ] `map_icon_cafe.png`
- [ ] `map_icon_pokecenter.png`
- [ ] `map_icon_forest.png`
- [ ] `map_icon_town.png`
- [ ] `map_icon_route.png`
- [ ] `map_icon_lake.png`
- [ ] `map_icon_mountain.png`
- [ ] `map_icon_cave.png`

#### 플레이어 추가
- [ ] 남/여 주인공 모두
- [ ] `player_boy_icon.png`, `player_girl_icon.png`

---

## 이미지 파일 경로 예시

게임에서 이미지를 불러올 때 사용되는 경로:
```javascript
// NPC 이미지
'images/npcs/professor_normal.png'

// 배경 이미지
'images/locations/location_lab_inside.png'

// 플레이어 이미지
'images/player/player_boy.png'
```

---

이미지를 생성한 후 위의 폴더 구조에 맞게 저장해 주세요!
