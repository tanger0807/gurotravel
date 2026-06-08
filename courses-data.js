// 구로구 여행코스 — 콘텐츠 및 지도 좌표 데이터
// address 필드가 있는 장소는 app.js Geocoder가 lat/lng를 자동 보정합니다
window.GURO_DATA = {

  // ── 장소 정보 ───────────────────────────────────────────────────────
  // category: bookstore(독립서점) | market(카페·맛집) | nature(자연·문화)
  places: {

    // ── 오류동 ──
    oryu_market: {
      id: 'oryu_market',
      name: '오류버들시장',
      category: 'market',
      address: '서울 구로구 오류동 302',
      lat: 37.4924, lng: 126.8342,
      activity: '오류동 골목형 로컬 활성 시장, 칼국수·어묵 등 먹거리 탐방',
      tags: ['전통시장', '로컬맛집', '점심식사'],
      photos: ['images/soba-food.jpg', 'images/soba-ext.jpg']
    },
    poong_danrak: {
      id: 'poong_danrak',
      name: '포옹단락 독립서점',
      category: 'bookstore',
      address: '서울 구로구 고척로18길 20-26',
      lat: 37.4936, lng: 126.8421,
      activity: '따뜻한 감성의 큐레이션 독립도서 및 문구류 구경',
      tags: ['독립출판', '감성서점', '스탬프①'],
      photos: ['images/book-goods.jpg']
    },
    bcg_books: {
      id: 'bcg_books',
      name: '비씨지북스 독립서점',
      category: 'bookstore',
      address: '서울 구로구 경인로25길 31 2층',
      lat: 37.4912, lng: 126.8382,
      activity: '소박하고 아늑한 동네 사랑방 서점, 독립서적 및 독서 토론',
      tags: ['동네서점', '추천도서', '스탬프②'],
      photos: ['images/book-desk.jpg']
    },
    kok_kok_kok: {
      id: 'kok_kok_kok',
      name: '콕콕콕 독립서점',
      category: 'bookstore',
      address: '서울 구로구 고척로 8 2층',
      lat: 37.4919, lng: 126.8458,
      activity: '다양한 소형 출판물, 엽서, 다이어리 꾸미기 굿즈 셀렉트 매장',
      tags: ['소형도서', '일러스트', '스탬프③'],
      photos: ['images/cokcokcok.jpg']
    },
    artchaekbogo: {
      id: 'artchaekbogo',
      name: '서울아트책보고',
      category: 'bookstore',
      address: '서울 구로구 경인로 430 고척스카이돔 지하1층',
      lat: 37.4920, lng: 126.8490,
      activity: '고척스카이돔 지하의 책 문화 복합 공간, 독립출판물·예술 서적 큐레이션',
      tags: ['독립출판', '예술서점', '복합문화공간'],
      photos: []
    },
    cafe_12noi: {
      id: 'cafe_12noi',
      name: '12NOI 카페',
      category: 'market',
      address: '서울 구로구 서해안로 2203',
      lat: 37.4920, lng: 126.8490,
      activity: '오류동의 감성 카페',
      tags: ['카페', '감성'],
      photos: []
    },

    // ── 항동 — 문학 ──
    guduin_hall: {
      id: 'guduin_hall',
      name: '신영복선생 추모공원',
      category: 'nature',
      address: '서울 구로구 항동 산 23-1',
      lat: 37.4955, lng: 126.8625,
      activity: '신영복 선생의 삶과 사상을 기리는 추모공원, «더불어숲» 서화비 산책',
      tags: ['역사문화', '신영복', '추모공원'],
      photos: ['images/deobureo-board.jpg', 'images/deobureo-stone.jpg', 'images/deobureo-sign.jpg']
    },
    hangdong_library: {
      id: 'hangdong_library',
      name: '항동푸른도서관',
      category: 'nature',
      address: '서울 구로구 연동로 290-46',
      lat: 37.4920, lng: 126.8490,
      activity: '푸른수목원 인접 공공도서관, 책 한 권 빌려 수목원 벤치에서 독서',
      tags: ['도서관', '독서', '산책'],
      photos: []
    },
    gongchaek: {
      id: 'gongchaek',
      name: '호호아글방',
      category: 'bookstore',
      address: '서울 구로구 연동로 287',
      lat: 37.4922, lng: 126.8562,
      activity: '항동의 아늑한 독립서점, 글쓰기 워크숍과 독립출판물 큐레이션',
      tags: ['독립서점', '워크숍', '스탬프④'],
      photos: ['images/book-desk.jpg', 'images/book-goods.jpg']
    },
    cheonwang_shelter: {
      id: 'cheonwang_shelter',
      name: '천왕산 책쉼터',
      category: 'nature',
      address: '서울 구로구 항동 149',
      lat: 37.4838, lng: 126.8668,
      activity: '천왕산 자락 아늑한 돌집 책쉼터, 나무 향 가득한 열람실 독서',
      tags: ['숲속쉼터', '노을독서', '가족나들이'],
      photos: ['images/chaek-ext.jpg', 'images/chaek-int.jpg']
    },

    // ── 항동 — 힐링 ──
    skhu_guduin: {
      id: 'skhu_guduin',
      name: '성공회대학교 구두인관',
      category: 'nature',
      address: '서울 구로구 연동로 320',
      lat: 37.4920, lng: 126.8490,
      activity: '성공회대 캠퍼스 내 구두인관 및 더불어숲길 입구, 문학 산책 시작점',
      tags: ['대학캠퍼스', '힐링산책', '숲길입구'],
      photos: ['images/deobureo-sign.jpg']
    },
    deobureo_trail: {
      id: 'deobureo_trail',
      name: '더불어숲길',
      category: 'nature',
      address: '서울 구로구 항동 산 12',
      lat: 37.4920, lng: 126.8490,
      activity: '신영복 선생의 서화 글귀가 새겨진 사색의 숲 산책로',
      tags: ['숲길산책', '사색', '포토존'],
      photos: ['images/deobureo-poem.jpg', 'images/deobureo-board.jpg']
    },
    guro_arboretum: {
      id: 'guro_arboretum',
      name: '푸른수목원',
      category: 'nature',
      address: '서울 구로구 연동로 240',
      lat: 37.4878, lng: 126.8550,
      activity: '서울시 유일 시립수목원, 2,100여 종 식물과 5~6월 장미정원 산책',
      tags: ['서울수목원', '장미정원', '힐링'],
      photos: ['images/rose-garden.jpg', 'images/garden-flowers.jpg', 'images/garden-sign.jpg']
    },
    hangdong_rail: {
      id: 'hangdong_rail',
      name: '항동 철길',
      category: 'nature',
      address: '서울 구로구 오리로11길',
      lat: 37.4938, lng: 126.8638,
      activity: '폐선된 기찻길을 따라 걷는 호젓한 숲속 흙길, 6월 주황꽃 구간',
      tags: ['철길산책', '포토존', '감성스팟'],
      photos: ['images/rail.jpg']
    },
    cheonwang_camping: {
      id: 'cheonwang_camping',
      name: '천왕산가족캠핑장',
      category: 'nature',
      address: '서울 구로구 연동로12길 149',
      lat: 37.4920, lng: 126.8490,
      activity: '천왕산 자락의 도심 속 가족 캠핑장, 자연 속 피크닉',
      tags: ['캠핑', '가족나들이', '자연'],
      photos: []
    },

    // ── 항동 — 카페·식당 ──
    greenwich_cafe: {
      id: 'greenwich_cafe',
      name: '그리니치 카페',
      category: 'market',
      address: '서울 구로구 서해안로 2117 공원관리사무소 1층',
      lat: 37.4872, lng: 126.8594,
      activity: '수목원 곁 베이커리 브런치 카페, 통창 너머 가득한 초록빛 뷰',
      tags: ['베이커리', '브런치', '예쁜카페'],
      photos: ['images/greenwich-ext.jpg', 'images/greenwich-int.jpg']
    },
    cafe_9ro: {
      id: 'cafe_9ro',
      name: '9로평상 카페',
      category: 'market',
      address: '서울 구로구 서해안로 2134',
      lat: 37.4920, lng: 126.8490,
      activity: '항동 수목원 인근 감성 카페, 평상 좌석과 자연 뷰',
      tags: ['카페', '수목원뷰', '감성'],
      photos: []
    },
    hangdong_3danji: {
      id: 'hangdong_3danji',
      name: '항동 3단지 상권',
      category: 'market',
      address: '서울 구로구 항동로3길',
      lat: 37.4920, lng: 126.8490,
      activity: '항동 주민들의 생활 상권, 소박한 식당과 분식 골목',
      tags: ['상권', '식당', '로컬맛집'],
      photos: []
    },
    hangdong_restaurants: {
      id: 'hangdong_restaurants',
      name: '항동 식당가',
      category: 'market',
      address: '서울 구로구 연동로11길',
      lat: 37.4920, lng: 126.8490,
      activity: '항동 지역 주민 식당가, 점심·저녁 식사 코스',
      tags: ['식당', '맛집', '로컬'],
      photos: []
    },
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
      coverImage: 'images/cokcokcok.jpg',
      stamps: 3,
      stops: [
        { placeId: 'oryu_market',  arrival: '10:00', durationMin: 40, costKRW: 6000 },
        { placeId: 'poong_danrak', arrival: '10:40', durationMin: 30, costKRW: 10000, stampNumber: 1 },
        { placeId: 'bcg_books',    arrival: '11:10', durationMin: 30, costKRW: 8000,  stampNumber: 2 },
        { placeId: 'kok_kok_kok',  arrival: '11:40', durationMin: 40, costKRW: 8000,  stampNumber: 3 },
        { placeId: 'oryu_market',  arrival: '12:20', durationMin: 60, costKRW: 9000 }
      ]
    },
    {
      id: 'oryu-healing',
      name: '항동 힐링 데이트',
      region: '항동',
      theme: 'healing',
      target: 'couple',
      totalMinutes: 220,
      totalCostKRW: 21000,
      tagline: '구두인관 산책부터 수목원·책방·식사까지',
      summary: '성공회대 구두인관을 거닐며 초록 캠퍼스를 만끽하고, 항동 서점에서 책 한 권 고른 뒤 푸른수목원 꽃길을 산책하고 항동 식당가에서 마무리하는 커플 코스.',
      coverImage: 'images/deobureo-sign.jpg',
      stamps: 0,
      stops: [
        { placeId: 'skhu_guduin',          arrival: '10:00', durationMin: 40,  costKRW: 0 },
        { placeId: 'gongchaek',            arrival: '10:50', durationMin: 40,  costKRW: 8000 },
        { placeId: 'guro_arboretum',       arrival: '11:40', durationMin: 80,  costKRW: 0 },
        { placeId: 'hangdong_restaurants', arrival: '13:10', durationMin: 60,  costKRW: 13000 }
      ]
    },
    {
      id: 'hang-literary',
      name: '항동 책숲 문학기행',
      region: '항동',
      theme: 'literary',
      target: 'family',
      totalMinutes: 255,
      totalCostKRW: 14000,
      tagline: '신영복 추모공원부터 천왕산 책쉼터까지의 사색',
      summary: '신영복선생 추모공원에서 더불어숲 서화를 곱씹고, 항동푸른도서관과 호호아글방, 천왕산 책쉼터로 이어지는 깊이 있는 문학 탐방 여정.',
      coverImage: 'images/deobureo-board.jpg',
      stamps: 1,
      stops: [
        { placeId: 'guduin_hall',      arrival: '13:30', durationMin: 50, costKRW: 0 },
        { placeId: 'guro_arboretum',   arrival: '14:20', durationMin: 70, costKRW: 0 },
        { placeId: 'gongchaek',        arrival: '15:30', durationMin: 35, costKRW: 7000, stampNumber: 4 },
        { placeId: 'greenwich_cafe',   arrival: '16:05', durationMin: 40, costKRW: 7000 },
        { placeId: 'hangdong_rail',    arrival: '16:45', durationMin: 30, costKRW: 0 },
        { placeId: 'cheonwang_shelter',arrival: '17:15', durationMin: 30, costKRW: 0 }
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
      tagline: '장미정원과 철길 숲, 조용히 걷기 좋은 동선',
      summary: '푸른수목원의 화사한 장미와 꽃길을 거닐고 옛 철길의 감성을 사진으로 남기며, 그리니치 카페 통창 앞에서 초록빛 여유를 즐기는 산책 코스.',
      coverImage: 'images/rose-garden.jpg',
      stamps: 0,
      stops: [
        { placeId: 'guro_arboretum', arrival: '10:30', durationMin: 90, costKRW: 1000 },
        { placeId: 'hangdong_rail',  arrival: '12:10', durationMin: 40, costKRW: 0 },
        { placeId: 'greenwich_cafe', arrival: '13:00', durationMin: 70, costKRW: 14000 },
        { placeId: 'gongchaek',      arrival: '14:20', durationMin: 70, costKRW: 13000 }
      ]
    }
  ],

  // ── 테마 메타 ──
  themes: [
    { id: 'all',      label: '전체' },
    { id: 'literary', label: '📚 문학 기행' },
    { id: 'healing',  label: '🌿 힐링 산책' }
  ],

  // ── 카테고리 메타 정보 ──
  categoryMeta: {
    bookstore: { label: '독립서점', color: '#2D6A4F' },
    market:    { label: '카페·맛집', color: '#F4845F' },
    nature:    { label: '자연·문화', color: '#4A90D9' }
  },

  heroImage:  'images/rail.jpg',
  realMapImage: 'images/map-real.png',
  footerNote: '본 정보는 2025년 5월 답사 기준이며, 방문 전 확인을 권장합니다.'
};
