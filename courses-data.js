// 구로구 여행코스 — 콘텐츠 및 지도 좌표 데이터
// 이미지 지도를 위한 백분율 좌표(x, y)와 장소/코스 스키마 정의
window.GURO_DATA = {
  // ── 11개 거점 장소 정보 ──────────────────────────────────────────
  // category: bookstore(독립서점) | market(카페·맛집) | nature(자연·문화) | disabled(준비중)
  places: {
    oryu_market: {
      id: 'oryu_market',
      name: '오류버들시장',
      category: 'market',
      x: 18, y: 15, lat: 37.4924, lng: 126.8342,
      activity: '오류동 골목형 로컬 활성 시장, 칼국수·어묵 등 먹거리 탐방',
      tags: ['전통시장', '로컬맛집', '점심식사'],
      photos: ['images/soba-food.jpg', 'images/soba-ext.jpg']
    },
    poong_danrak: {
      id: 'poong_danrak',
      name: '독립서점 포옹단락',
      category: 'bookstore',
      x: 32, y: 12, lat: 37.4936, lng: 126.8421,
      activity: '따뜻한 감성의 큐레이션 독립도서 및 문구류 구경',
      tags: ['독립출판', '감성서점', '스탬프①'],
      photos: ['images/book-goods.jpg']
    },
    bcg_books: {
      id: 'bcg_books',
      name: '독립서점 비씨지북스',
      category: 'bookstore',
      x: 25, y: 28, lat: 37.4912, lng: 126.8382,
      activity: '소박하고 아늑한 동네 사랑방 서점, 독립서적 및 독서 토론',
      tags: ['동네서점', '추천도서', '스탬프②'],
      photos: ['images/book-desk.jpg']
    },
    kok_kok_kok: {
      id: 'kok_kok_kok',
      name: '독립서점 콕콕콕',
      category: 'bookstore',
      x: 38, y: 25, lat: 37.4919, lng: 126.8458,
      activity: '다양한 소형 출판물, 엽서, 다이어리 꾸미기 굿즈 셀렉트 매장',
      tags: ['소형도서', '일러스트', '스탬프③'],
      photos: ['images/book-goods.jpg']
    },
    guduin_hall: {
      id: 'guduin_hall',
      name: '구두인관·더불어숲',
      category: 'nature',
      x: 69, y: 13, lat: 37.4955, lng: 126.8625,
      activity: '성공회대 신영복 선생 «더불어숲» 서화비 글귀와 사색 산책로',
      tags: ['역사문화', '신영복', '사색숲길'],
      photos: ['images/deobureo-board.jpg', 'images/deobureo-stone.jpg', 'images/deobureo-sign.jpg']
    },
    guro_arboretum: {
      id: 'guro_arboretum',
      name: '항동도서관·푸른수목원',
      category: 'nature',
      x: 45, y: 48, lat: 37.4878, lng: 126.8550,
      activity: '서울시 유일의 시립수목원, 항동도서관 독서와 장미원 산책',
      tags: ['서울수목원', '장미정원', '도서관'],
      photos: ['images/rose-garden.jpg', 'images/garden-flowers.jpg', 'images/garden-sign.jpg']
    },
    gongchaek: {
      id: 'gongchaek',
      name: '독립서점 책방공책',
      category: 'bookstore',
      x: 48, y: 25, lat: 37.4922, lng: 126.8562,
      activity: '나만의 책 쓰기 워크숍을 운영하는 따뜻한 항동 서점',
      tags: ['워크숍', '동네책방', '스탬프④'],
      photos: ['images/book-desk.jpg', 'images/book-goods.jpg']
    },
    greenwich_cafe: {
      id: 'greenwich_cafe',
      name: '그리니치 카페',
      category: 'market',
      x: 61, y: 52, lat: 37.4872, lng: 126.8594,
      activity: '수목원 곁 베이커리 브런치 카페, 통창 너머 가득한 초록빛 뷰',
      tags: ['베이커리', '브런치', '예쁜카페'],
      photos: ['images/greenwich-ext.jpg', 'images/greenwich-int.jpg']
    },
    hangdong_rail: {
      id: 'hangdong_rail',
      name: '항동철길',
      category: 'nature',
      x: 74, y: 23, lat: 37.4938, lng: 126.8638,
      activity: '폐선된 기찻길을 따라 걷는 호젓한 숲속 흙길 건널목',
      tags: ['철길산책', '포토존', '감성스팟'],
      photos: ['images/rail.jpg']
    },
    cheonwang_shelter: {
      id: 'cheonwang_shelter',
      name: '천왕산 책쉼터',
      category: 'nature',
      x: 83, y: 62, lat: 37.4838, lng: 126.8668,
      activity: '천왕산 자락 아늑한 돌집 책쉼터, 나무 향 가득한 열람실 독서',
      tags: ['숲속쉼터', '노을독서', '가족나들이'],
      photos: ['images/chaek-ext.jpg', 'images/chaek-int.jpg']
    },
    onsu: {
      id: 'onsu',
      name: '온수동 일대',
      category: 'disabled',
      x: 13, y: 20, lat: 37.4908, lng: 126.8278,
      activity: '준비 중',
      tags: [],
      photos: []
    }
  },

  // ── 코스 목록 ─────────────────────────────────────────────
  // theme: literary(문학기행) | healing(힐링산책)
  // target: solo(1인) | couple(커플) | family(4050/가족)
  courses: [
    {
      id: 'oryu-literary',
      name: '오류동 문학 기행',
      region: '오류동',
      theme: 'literary',
      target: 'solo',
      totalMinutes: 200,
      totalCostKRW: 41000,
      tagline: '독립서점 3곳 스탬프 투어와 오류버들시장',
      summary: '오류버들시장의 따뜻한 로컬 활기를 느끼고 골목 속 숨겨진 감성 독립서점들을 탐방하며, 나만의 감성을 담은 독서 기행을 즐기는 1인 코스.',
      coverImage: 'images/book-goods.jpg',
      stamps: 3,
      stops: [
        { placeId: 'oryu_market', arrival: '10:00', durationMin: 40, costKRW: 6000 },
        { placeId: 'poong_danrak', arrival: '10:40', durationMin: 30, costKRW: 10000, stampNumber: 1 },
        { placeId: 'bcg_books', arrival: '11:10', durationMin: 30, costKRW: 8000, stampNumber: 2 },
        { placeId: 'kok_kok_kok', arrival: '11:40', durationMin: 40, costKRW: 8000, stampNumber: 3 },
        { placeId: 'oryu_market', arrival: '12:20', durationMin: 60, costKRW: 9000 }
      ]
    },
    {
      id: 'oryu-healing',
      name: '오류동 골목 힐링 데이트',
      region: '오류동',
      theme: 'healing',
      target: 'couple',
      totalMinutes: 240,
      totalCostKRW: 44500,
      tagline: '버들시장 맛집과 이색 독립서점 투어',
      summary: '연인과 함께 정겨운 시장 맛집에서 든든히 먹고, 서로에게 어울리는 독립출판물을 골라 선물하며 골목 안 숨은 카페에서 여유를 만끽하는 커플 코스.',
      coverImage: 'images/soba-food.jpg',
      stamps: 0,
      stops: [
        { placeId: 'oryu_market', arrival: '11:00', durationMin: 50, costKRW: 7000 },
        { placeId: 'bcg_books', arrival: '12:00', durationMin: 40, costKRW: 8000 },
        { placeId: 'oryu_market', arrival: '12:50', durationMin: 60, costKRW: 15000 },
        { placeId: 'kok_kok_kok', arrival: '14:00', durationMin: 40, costKRW: 8000 },
        { placeId: 'oryu_market', arrival: '14:50', durationMin: 50, costKRW: 6500 }
      ]
    },
    {
      id: 'hang-literary',
      name: '항동 책숲 문학기행',
      region: '항동',
      theme: 'literary',
      target: 'family', // 4050/가족 타깃 매핑
      totalMinutes: 255,
      totalCostKRW: 14000,
      tagline: '신영복 숲길부터 천왕산 책쉼터까지의 사색',
      summary: '성공회대 더불어숲길에 새겨진 깊은 문장들을 곱씹고 푸른도서관, 책방공책, 천왕산 책쉼터로 이어지는 깊이 있는 문학 탐방 여정.',
      coverImage: 'images/deobureo-board.jpg',
      stamps: 1,
      stops: [
        { placeId: 'guduin_hall', arrival: '13:30', durationMin: 50, costKRW: 0 },
        { placeId: 'guro_arboretum', arrival: '14:20', durationMin: 70, costKRW: 0 },
        { placeId: 'gongchaek', arrival: '15:30', durationMin: 35, costKRW: 7000, stampNumber: 4 },
        { placeId: 'greenwich_cafe', arrival: '16:05', durationMin: 40, costKRW: 7000 },
        { placeId: 'hangdong_rail', arrival: '16:45', durationMin: 30, costKRW: 0 },
        { placeId: 'cheonwang_shelter', arrival: '17:15', durationMin: 30, costKRW: 0 }
      ]
    },
    {
      id: 'hang-healing',
      name: '항동 초록 힐링 산책',
      region: '항동',
      theme: 'healing',
      target: 'couple',
      totalMinutes: 270,
      totalCostKRW: 28000,
      tagline: '장미정원과 숲길, 조용히 걷기 좋은 동선',
      summary: '푸른수목원의 화사한 장미와 꽃길을 거닐고 옛 철길의 감성을 사진으로 남기며, 조용한 서점과 베이커리 통창 카페에서 피로를 푸는 산책 코스.',
      coverImage: 'images/rose-garden.jpg',
      stamps: 0,
      stops: [
        { placeId: 'guro_arboretum', arrival: '10:30', durationMin: 90, costKRW: 1000 },
        { placeId: 'hangdong_rail', arrival: '12:10', durationMin: 40, costKRW: 0 },
        { placeId: 'greenwich_cafe', arrival: '13:00', durationMin: 70, costKRW: 14000 },
        { placeId: 'gongchaek', arrival: '14:20', durationMin: 70, costKRW: 13000 }
      ]
    }
  ],

  // ── 온수동 Coming Soon 메타 ──
  comingSoon: {
    id: 'onsu',
    name: '온수동 코스',
    region: '온수동',
    note: '2025년 답사 기준 준비 중',
    popup: '온수동 코스는 곧 업데이트됩니다.\n2025년 답사 데이터를 준비하고 있어요.'
  },

  // ── 테마 메타 ──
  themes: [
    { id: 'all', label: '전체' },
    { id: 'literary', label: '📚 문학 기행' },
    { id: 'healing', label: '🌿 힐링 산책' }
  ],

  // ── 카테고리 메타 정보 ──
  categoryMeta: {
    bookstore: { label: '독립서점', color: '#2D6A4F' },
    market: { label: '카페·맛집', color: '#F4845F' },
    nature: { label: '자연·문화', color: '#4A90D9' },
    disabled: { label: '준비 중', color: '#BCBCB5' }
  },

  heroImage: 'images/rail.jpg',
  realMapImage: 'images/map-real.png',
  footerNote: '본 정보는 2025년 5월 답사 기준이며, 방문 전 확인을 권장합니다.'
};
