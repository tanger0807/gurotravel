// 구로 책길 — 콘텐츠 데이터 (2025년 답사 사진/장소 기반)
// 좌표는 항동 일대 placeholder 지도용 정규화 좌표(0~100%)
window.GURO_DATA = {
  // ── 장소 ───────────────────────────────────────────────
  // category: bookstore | market | nature | disabled
  places: {
    book_gongchaek: { id:'book_gongchaek', name:'책방공책', category:'bookstore', x:48, y:25,
      activity:'동네 큐레이션 독립서점, 문구·소품 구경', tags:['독립출판','문구'],
      photos:['images/book-goods.jpg','images/book-desk.jpg'] },

    lib_hangdong: { id:'lib_hangdong', name:'항동 푸른도서관', category:'nature', x:53, y:41,
      activity:'숲을 면한 라운지에서 책 한 권, 정기간행물 열람', tags:['도서관','휴식'],
      photos:['images/library-sign.jpg','images/library-lounge.jpg'] },

    nature_garden: { id:'nature_garden', name:'푸른수목원', category:'nature', x:45, y:48,
      activity:'서울 유일 시립수목원, 장미원·꽃길 산책', tags:['자연','장미원','포토'],
      photos:['images/garden-flowers.jpg','images/rose-garden.jpg','images/rose-person.jpg','images/garden-sign.jpg'] },

    cafe_greenwich: { id:'cafe_greenwich', name:'그리니치 카페', category:'market', x:61, y:52,
      activity:'수목원 곁 베이커리 카페, 통창 너머 초록 뷰', tags:['카페','베이커리','브런치'],
      photos:['images/greenwich-ext.jpg','images/greenwich-int.jpg'] },

    nature_rail: { id:'nature_rail', name:'항동철길', category:'nature', x:74, y:23,
      activity:'폐선 철길 따라 걷는 숲길, 건널목 포토존', tags:['산책','포토'],
      photos:['images/rail.jpg'] },

    park_deobureo: { id:'park_deobureo', name:'더불어숲길', category:'nature', x:69, y:13,
      activity:'성공회대 신영복 «더불어숲» 글귀 따라 걷는 추모 숲길', tags:['문학','신영복','산책'],
      photos:['images/deobureo-board.jpg','images/deobureo-sign.jpg','images/deobureo-poem.jpg','images/deobureo-stone.jpg'] },

    food_soba: { id:'food_soba', name:'까가쩨면 메밀상회', category:'market', x:35, y:42,
      activity:'직접 뽑는 메밀 소바와 바삭한 돈까스 한 상', tags:['소바','돈까스','점심'],
      photos:['images/soba-food.jpg','images/soba-ext.jpg'] },

    nature_rest: { id:'nature_rest', name:'천왕산 책쉼터', category:'nature', x:83, y:62,
      activity:'천왕산 자락 돌집 책쉼터, 목조 열람실에서 노을 독서', tags:['전망','책쉼터','포토'],
      photos:['images/chaek-ext.jpg','images/chaek-int.jpg'] },

    book_seoul: { id:'book_seoul', name:'책 굿즈샵', category:'bookstore', x:40, y:60,
      activity:'독립출판 굿즈·문구 셀렉트숍, 디자인 노트 구경', tags:['문구','굿즈'],
      photos:['images/book-goods.jpg','images/book-desk.jpg'] },

    onsu: { id:'onsu', name:'온수동 일대', category:'disabled', x:13, y:20, activity:'준비 중', tags:[] },
  },

  // ── 코스 ──────────────────────────
  // theme: literary | healing
  // target: solo | couple | family
  courses: [
    {
      id:'hang-literary', name:'항동 책길 산책', region:'항동', theme:'literary',
      target:'couple', totalMinutes:360, totalCostKRW:34000,
      tagline:'독립서점에서 철길, 숲속 책쉼터까지',
      summary:'책방공책에서 하루를 열고, 숲을 면한 푸른도서관과 항동철길을 지나, 그리니치 카페에서 쉬어 천왕산 책쉼터의 노을로 마무리하는 코스.',
      coverImage:'images/rail.jpg', stamps:2,
      stops:[
        { placeId:'book_gongchaek', arrival:'10:00', durationMin:40, costKRW:9000, stampNumber:1 },
        { placeId:'lib_hangdong',   arrival:'11:00', durationMin:50, costKRW:0 },
        { placeId:'nature_rail',    arrival:'12:10', durationMin:40, costKRW:0 },
        { placeId:'cafe_greenwich', arrival:'13:10', durationMin:70, costKRW:13000 },
        { placeId:'nature_rest',    arrival:'14:50', durationMin:60, costKRW:12000, stampNumber:2 },
      ],
    },
    {
      id:'deobureo-literary', name:'더불어숲 문학기행', region:'항동', theme:'literary',
      target:'solo', totalMinutes:420, totalCostKRW:42000,
      tagline:'신영복의 글귀를 따라 걷는 하루',
      summary:'성공회대 더불어숲길에서 신영복의 문장을 곱씹고, 굿즈샵과 메밀상회를 거쳐 푸른도서관과 천왕산 책쉼터로 이어지는 사색의 코스.',
      coverImage:'images/deobureo-board.jpg', stamps:1,
      stops:[
        { placeId:'park_deobureo', arrival:'10:00', durationMin:60, costKRW:0 },
        { placeId:'book_seoul',    arrival:'11:20', durationMin:40, costKRW:12000, stampNumber:3 },
        { placeId:'food_soba',     arrival:'12:20', durationMin:60, costKRW:13000 },
        { placeId:'lib_hangdong',  arrival:'13:40', durationMin:50, costKRW:0 },
        { placeId:'nature_rest',   arrival:'15:00', durationMin:60, costKRW:4000 },
      ],
    },
    {
      id:'garden-healing', name:'푸른수목원 힐링', region:'항동', theme:'healing',
      target:'couple', totalMinutes:270, totalCostKRW:28000,
      tagline:'장미원과 철길, 둘이 걷기 좋은 초록 동선',
      summary:'푸른수목원 장미원에서 출발해 항동철길 숲길을 지나 그리니치 카페에서 쉬고, 동네 서점에 들르는 느린 반나절 산책.',
      coverImage:'images/rose-garden.jpg', stamps:0,
      stops:[
        { placeId:'nature_garden',  arrival:'10:30', durationMin:90, costKRW:1000 },
        { placeId:'nature_rail',    arrival:'12:10', durationMin:40, costKRW:0 },
        { placeId:'cafe_greenwich', arrival:'13:00', durationMin:70, costKRW:14000 },
        { placeId:'book_gongchaek', arrival:'14:20', durationMin:40, costKRW:13000 },
      ],
    },
    {
      id:'family-book', name:'가족 책숲 나들이', region:'항동', theme:'healing',
      target:'family', totalMinutes:390, totalCostKRW:36000,
      tagline:'아이와 함께, 도서관에서 숲까지',
      summary:'항동 푸른도서관의 낭독 라운지에서 시작해 수목원 꽃길을 걷고, 메밀상회 점심을 든든히, 천왕산 책쉼터와 더불어숲길로 마무리하는 가족 코스.',
      coverImage:'images/garden-flowers.jpg', stamps:1,
      stops:[
        { placeId:'lib_hangdong',   arrival:'10:00', durationMin:50, costKRW:0 },
        { placeId:'nature_garden',  arrival:'11:00', durationMin:80, costKRW:1000 },
        { placeId:'food_soba',      arrival:'12:30', durationMin:60, costKRW:13000, stampNumber:4 },
        { placeId:'nature_rest',    arrival:'14:00', durationMin:50, costKRW:8000 },
        { placeId:'park_deobureo',  arrival:'15:10', durationMin:50, costKRW:0 },
      ],
    },
  ],

  comingSoon: {
    id:'onsu', name:'온수동 코스', region:'온수동',
    note:'2025년 답사 기준 준비 중',
    popup:'온수동 코스는 곧 업데이트됩니다.\n2025년 답사 데이터를 준비하고 있어요.',
  },

  themes: [
    { id:'all',      label:'전체' },
    { id:'literary', label:'문학 기행' },
    { id:'healing',  label:'힐링 산책' },
  ],

  categoryMeta: {
    bookstore: { label:'독립서점',  color:'#2D6A4F' },
    market:    { label:'카페·맛집', color:'#F4845F' },
    nature:    { label:'자연·문화', color:'#4A90D9' },
    disabled:  { label:'준비 중',   color:'#BCBCB5' },
  },

  heroImage:'images/rail.jpg',
  realMapImage:'images/map-real.png',
  footerNote:'본 정보는 2025년 5월 답사 기준이며, 방문 전 확인을 권장합니다.',
};
