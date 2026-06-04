# 구로 여행코스 Design System Master Prompt

> 작성일: 2026-06-02 / 버전: v1.0
> 레퍼런스: 동네서점 지도(bookshopmap.com) · 클룩(Klook) · 마이리얼트립
> 사용처: Claude Code / Cursor / v0 시스템 프롬프트 최상단에 붙여넣기
> 기술 스택: 정적 HTML + Tailwind CSS CDN + Vanilla JS + Kakao Maps API v3
> 설계 기준: 모바일 우선 (375px)

---

## 0. 사용법

이 문서를 Claude Code 또는 Cursor의 시스템 프롬프트 최상단에 그대로 붙여넣어라.
구로구 여행 큐레이션 웹페이지의 모든 HTML·CSS·JS 작성 시 이 규칙을 엄격히 준수한다.

---

## 1. 시각 원칙

**인상 키워드**: 로컬 감성 · 책과 자연 · 따뜻하고 차분한 · 정보가 명확한 · 동네 탐험

**톤 매트릭스**: 따뜻함(높음) × 정보 밀도(중간) × 브랜드 강도(중간) × 모션(낮음)

**페르소나**: "독립서점을 좋아하는 27세 이서연이 주말 아침 스마트폰으로 보는 여행 가이드"

**가장 피해야 할 인상 5개** (자세한 규칙은 §8 참조):
1. 클룩 스타일 — 상업적·글로벌 여행앱 인상
2. 네이버 지도 스타일 — 빽빽한 정보 밀집
3. AI 그라데이션 — 보라-파란 그라데이션
4. 딱딱한 SaaS — 날카로운 모서리, 차가운 인상
5. 밋밋한 흑백 — 따뜻함·종이 질감 없는 순수 흰 배경

---

## 2. Color Tokens

모든 색상은 아래 시맨틱 토큰 이름으로만 참조한다. HEX 직접 사용 금지.

### 2.1 Brand (브랜드 컬러)

```css
--color-brand:          #2D6A4F;  /* 딥 포레스트 그린 — 메인 */
--color-brand-hover:    #245C43;  /* 호버 시 10% 어둡게 */
--color-brand-active:   #1B4D38;  /* 액티브 시 15% 어둡게 */
--color-brand-light:    #E8F5F0;  /* 연한 배경용 (배지, 하이라이트) */
--color-brand-mid:      #40916C;  /* 지도 마커 경로선, 보조 강조 */
--color-brand-pale:     #74C69D;  /* 매우 연한 배경, 장식용 */

--color-accent:         #F4845F;  /* 웜 테라코타 — 스탬프, CTA 버튼 */
--color-accent-hover:   #E06B45;
--color-accent-light:   #FEF0EB;  /* 액센트 배경용 */
```

### 2.2 Surface (배경)

```css
--color-bg-base:        #FAFAF8;  /* 전체 페이지 배경 — 따뜻한 오프화이트 */
--color-bg-elevated:    #FFFFFF;  /* 카드, 모달 배경 */
--color-bg-overlay:     rgba(0, 0, 0, 0.45); /* 모달 딤 처리 */
--color-bg-coming-soon: #F3F3F0;  /* Coming Soon 카드 배경 */
```

### 2.3 Text (텍스트)

```css
--color-text-primary:   #1C1C1A;  /* 제목, 강조 텍스트 — 웜 블랙 */
--color-text-secondary: #6B6B65;  /* 부제목, 설명 — 웜 그레이 */
--color-text-tertiary:  #9B9B94;  /* 힌트, 비활성 — 연한 웜 그레이 */
--color-text-on-brand:  #FFFFFF;  /* 브랜드 배경 위 텍스트 */
--color-text-on-accent: #FFFFFF;  /* 액센트 배경 위 텍스트 */
--color-text-disabled:  #BCBCB5;  /* Coming Soon 텍스트 */
```

### 2.4 Border (경계선)

```css
--color-border-default: rgba(0, 0, 0, 0.08); /* 카드, 인풋 기본 테두리 */
--color-border-focus:   #2D6A4F;             /* 포커스 링 */
--color-border-subtle:  rgba(0, 0, 0, 0.05); /* 구분선 */
```

### 2.5 Feedback (상태 색상)

```css
--color-success:        #2D6A4F;  /* 성공 — 브랜드 그린 재사용 */
--color-success-bg:     #E8F5F0;
--color-error:          #C0392B;
--color-error-bg:       #FDEAEA;
--color-warning:        #D4813A;
--color-warning-bg:     #FEF3E7;
--color-info:           #2563EB;
--color-info-bg:        #EEF3FE;
```

### 2.6 Map Marker Colors (지도 마커 전용)

```css
--color-marker-bookstore:  #2D6A4F;  /* 초록 — 독립서점 */
--color-marker-market:     #F4845F;  /* 테라코타 — 시장·카페 */
--color-marker-nature:     #4A90D9;  /* 블루 — 자연·문화 */
--color-marker-disabled:   #BCBCB5;  /* 회색 — Coming Soon */
```

### 2.7 Tailwind Config 매핑

```js
// tailwind.config.js (CDN 사용 시 tailwind.config 객체로 정의)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2D6A4F',
          hover:   '#245C43',
          active:  '#1B4D38',
          light:   '#E8F5F0',
          mid:     '#40916C',
          pale:    '#74C69D',
        },
        accent: {
          DEFAULT: '#F4845F',
          hover:   '#E06B45',
          light:   '#FEF0EB',
        },
        surface: {
          base:     '#FAFAF8',
          elevated: '#FFFFFF',
        },
        content: {
          primary:   '#1C1C1A',
          secondary: '#6B6B65',
          tertiary:  '#9B9B94',
          disabled:  '#BCBCB5',
        },
      },
      borderRadius: {
        'sm':  '8px',
        'md':  '12px',
        'lg':  '16px',
        'xl':  '20px',
        'pill': '9999px',
      },
      fontFamily: {
        'serif':  ['Noto Serif KR', 'Georgia', 'serif'],
        'sans':   ['Pretendard', '-apple-system', 'sans-serif'],
      },
    }
  }
}
```

---

## 3. Typography Tokens

### 3.1 폰트 패밀리

```css
--font-display: 'Noto Serif KR', Georgia, serif;   /* 코스명, 섹션 제목 — 책스러운 감성 */
--font-body:    'Pretendard', -apple-system, sans-serif; /* 모든 본문·UI 텍스트 */
```

**로드 방법 (HTML head에 추가):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500&family=Pretendard:wght@400;500&display=swap" rel="stylesheet">
```

### 3.2 크기 스케일

```css
--text-xs:   12px;   /* 힌트, 날짜, 비고 */
--text-sm:   13px;   /* 배지, 보조 정보 */
--text-base: 14px;   /* 모바일 본문 기본 */
--text-md:   16px;   /* 카드 제목, 인포윈도우 */
--text-lg:   18px;   /* 섹션 부제목 */
--text-xl:   20px;   /* 헤더 서비스명 */
--text-2xl:  24px;   /* 히어로 코스명 (세리프) */
--text-3xl:  30px;   /* 랜딩 메인 헤드 */
```

### 3.3 라인 높이 & 자간

```css
--leading-tight:  1.4;    /* 제목 (세리프) */
--leading-body:   1.625;  /* 한글 본문 — WCAG 권장 */
--leading-loose:  1.8;    /* 장문 설명 */

--tracking-tight: -0.01em;  /* 큰 세리프 제목 */
--tracking-normal: 0;        /* 본문 */
--tracking-wide:  0.03em;   /* 배지, 레이블 */
```

### 3.4 텍스트 스타일 조합 (사용 예시)

```css
/* 코스명 (세리프 제목) */
.text-course-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 500;
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
}

/* 카드 제목 */
.text-card-title {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 500;
  line-height: var(--leading-tight);
}

/* 본문 */
.text-body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

/* 배지·레이블 */
.text-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
}
```

---

## 4. Spacing Tokens

8px 베이스 그리드. 모든 margin/padding/gap은 이 값만 사용한다.

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

**Tailwind 클래스 대응:**
- `p-2` = 8px / `p-3` = 12px / `p-4` = 16px / `p-6` = 24px / `p-8` = 32px

---

## 5. Shape Tokens

### 5.1 모서리 반경

```css
--radius-sm:   8px;    /* 배지, 인풋, 작은 버튼 */
--radius-md:   12px;   /* 카드, 모달, 버튼 기본 */
--radius-lg:   16px;   /* 코스 카드 (이미지 포함) */
--radius-xl:   20px;   /* 모달 전체 */
--radius-pill: 9999px; /* 탭 필터, 타깃 배지 */
```

### 5.2 그림자

```css
--shadow-sm:  0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);  /* 카드 기본 */
--shadow-md:  0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04); /* 인포윈도우 */
--shadow-lg:  0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06); /* 모달 */
```

---

## 6. Breakpoints (모바일 우선)

```css
/* 모바일 기준값 (기본, min-width 없음): 375px */
/* sm:  640px 이상 */
/* md:  768px 이상 */
/* lg:  1024px 이상 */
/* xl:  1280px 이상 */
```

**Tailwind 반응형 사용 예시:**
```html
<!-- 모바일: 1열, 태블릿 이상: 2열 -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
```

---

## 7. Components

이 서비스에서 실제 사용하는 7종 컴포넌트를 정의한다.

### 7.1 컴포넌트 매트릭스

| 이름 | variant | size | 사용처 |
|---|---|---|---|
| Button | primary, outline, ghost, accent | sm, md | 모달 닫기, CTA, 더보기 |
| Card (CourseCard) | default, coming-soon | - | 코스 카드 그리드 |
| Modal (CourseModal) | default | sm(모바일), lg(PC) | 코스 상세 타임라인 |
| Badge (TargetBadge) | solo, couple, family | sm | 타깃 표시 |
| Badge (StampBadge) | active, disabled | sm | 스탬프 투어 번호 |
| Tabs (ThemeTabs) | pill | - | 테마 필터 |
| Skeleton | map, card | - | 로딩 상태 |

### 7.2 각 컴포넌트 상세

#### Button

```html
<!-- primary: 메인 액션 -->
<button class="bg-brand hover:bg-brand-hover text-white font-medium
               px-5 py-2.5 rounded-md text-sm transition-colors
               disabled:opacity-50 disabled:cursor-not-allowed">
  코스 보기
</button>

<!-- outline: 보조 액션 -->
<button class="border border-brand text-brand bg-transparent hover:bg-brand-light
               font-medium px-5 py-2.5 rounded-md text-sm transition-colors">
  지도로 보기
</button>

<!-- accent: 스탬프 투어 CTA -->
<button class="bg-accent hover:bg-accent-hover text-white font-medium
               px-5 py-2.5 rounded-md text-sm transition-colors">
  스탬프 투어 안내
</button>

<!-- ghost: 닫기, 취소 -->
<button class="text-content-secondary hover:text-content-primary hover:bg-gray-100
               p-2 rounded-md transition-colors" aria-label="닫기">
  ✕
</button>
```

#### CourseCard

```html
<article class="bg-surface-elevated rounded-lg overflow-hidden
                border border-black/[0.08] shadow-sm
                cursor-pointer hover:shadow-md transition-shadow"
         data-course-id="oryu-literary"
         role="button" tabindex="0"
         aria-label="오류동 문학 기행 코스 상세 보기">

  <!-- 이미지 슬롯 (상단 40%) -->
  <div class="relative h-40 bg-brand-pale overflow-hidden">
    <img src="images/oryu-literary.jpg"
         alt="오류동 독립서점 문학 기행 코스 대표 이미지"
         class="w-full h-full object-cover"
         loading="lazy">
    <!-- 이미지 없을 때 폴백: bg-brand-pale 유지 -->
  </div>

  <!-- 내용 슬롯 -->
  <div class="p-4">
    <!-- 제목: 세리프 폰트 -->
    <h3 class="font-serif text-base font-medium text-content-primary mb-1 leading-tight">
      오류동 문학 기행
    </h3>
    <!-- 메타 정보 -->
    <p class="text-sm text-content-secondary mb-3">⏱ 7~8시간 · 약 55,000원</p>
    <!-- 푸터: 배지 + 화살표 -->
    <div class="flex items-center justify-between">
      <span class="badge-solo">1인 여행</span>
      <span class="text-sm text-brand font-medium">자세히 →</span>
    </div>
  </div>
</article>

<!-- Coming Soon 상태 -->
<article class="bg-surface-coming-soon rounded-lg overflow-hidden
                border border-black/[0.05] opacity-60 cursor-not-allowed"
         aria-label="온수동 코스 — 준비 중">
  <div class="h-40 bg-gray-200 flex items-center justify-center">
    <span class="text-content-disabled text-sm font-medium">사진 준비 중</span>
  </div>
  <div class="p-4">
    <div class="flex items-center gap-2 mb-1">
      <h3 class="font-serif text-base font-medium text-content-disabled">온수동 코스</h3>
      <span class="text-xs bg-gray-200 text-content-disabled px-2 py-0.5 rounded-pill">Coming Soon</span>
    </div>
    <p class="text-sm text-content-disabled">2025년 답사 기준 준비 중</p>
  </div>
</article>
```

#### CourseModal

```html
<!-- 모달 래퍼 (배경 딤) -->
<div id="course-modal"
     class="fixed inset-0 bg-black/45 flex items-end sm:items-center
            justify-center z-50 hidden"
     role="dialog" aria-modal="true" aria-labelledby="modal-title">

  <!-- 모달 패널 (모바일: 바텀시트, PC: 센터) -->
  <div class="bg-surface-elevated w-full sm:max-w-lg sm:mx-4
              rounded-t-xl sm:rounded-xl shadow-lg
              max-h-[85vh] overflow-y-auto">

    <!-- 헤더 -->
    <div class="sticky top-0 bg-surface-elevated border-b border-black/[0.06]
                px-5 pt-5 pb-4 flex items-start justify-between">
      <!-- 모바일: 손잡이 바 -->
      <div class="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1
                  bg-gray-300 rounded-pill sm:hidden"></div>
      <div>
        <h2 id="modal-title" class="font-serif text-lg font-medium text-content-primary">
          오류동 문학 기행
        </h2>
        <p class="text-sm text-content-secondary mt-0.5">총 7~8시간 · 1인 약 55,000원</p>
      </div>
      <button class="ghost-btn ml-4 flex-shrink-0" aria-label="닫기"
              onclick="closeModal()">✕</button>
    </div>

    <!-- 타임라인 본문 -->
    <ol class="px-5 py-4 space-y-4">
      <!-- 장소 1개 단위 -->
      <li class="flex gap-3">
        <!-- 순서 + 스탬프 컬럼 -->
        <div class="flex flex-col items-center gap-1 flex-shrink-0 w-8">
          <span class="w-7 h-7 rounded-full bg-brand text-white text-xs
                       font-medium flex items-center justify-center">1</span>
          <div class="w-px flex-1 bg-brand-pale min-h-[24px]"></div>
        </div>
        <!-- 내용 컬럼 -->
        <div class="pb-4 flex-1">
          <div class="flex items-baseline justify-between">
            <h3 class="text-base font-medium text-content-primary">오류버들시장</h3>
            <span class="text-xs text-content-tertiary">10:00</span>
          </div>
          <p class="text-sm text-content-secondary mt-0.5 leading-relaxed">
            시장 탐방·아침 식사 (순대·어묵 등)
          </p>
          <div class="flex items-center gap-3 mt-2">
            <span class="text-xs text-content-tertiary">⏱ 40분</span>
            <span class="text-xs text-brand font-medium">약 6,000원</span>
          </div>
        </div>
      </li>
      <!-- 스탬프 있는 장소 -->
      <li class="flex gap-3">
        <div class="flex flex-col items-center gap-1 flex-shrink-0 w-8">
          <span class="w-7 h-7 rounded-full bg-brand text-white text-xs
                       font-medium flex items-center justify-center">2</span>
          <div class="w-px flex-1 bg-brand-pale min-h-[24px]"></div>
        </div>
        <div class="pb-4 flex-1">
          <div class="flex items-baseline justify-between">
            <h3 class="text-base font-medium text-content-primary">포옹단락</h3>
            <span class="text-xs text-content-tertiary">10:40</span>
          </div>
          <p class="text-sm text-content-secondary mt-0.5">큐레이션 독립출판물 탐방·구매</p>
          <div class="flex items-center gap-3 mt-2">
            <span class="text-xs text-content-tertiary">⏱ 30분</span>
            <span class="text-xs text-brand font-medium">약 10,000원</span>
            <!-- 스탬프 배지 -->
            <span class="stamp-badge-active">스탬프 ①</span>
          </div>
        </div>
      </li>
    </ol>

    <!-- 총비용 푸터 -->
    <div class="sticky bottom-0 bg-surface-elevated border-t border-black/[0.06]
                px-5 py-4 flex items-center justify-between">
      <span class="text-sm text-content-secondary">1인 예상 총비용</span>
      <span class="text-lg font-medium text-brand">55,000원</span>
    </div>
  </div>
</div>
```

#### ThemeTabs (테마 필터)

```html
<div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="tablist"
     aria-label="여행 테마 필터">
  <button class="tab-active flex-shrink-0" role="tab" aria-selected="true"
          data-theme="all">전체</button>
  <button class="tab-inactive flex-shrink-0" role="tab" aria-selected="false"
          data-theme="literary">📚 문학 기행</button>
  <button class="tab-inactive flex-shrink-0" role="tab" aria-selected="false"
          data-theme="healing">🌿 힐링</button>
</div>
```

```css
.tab-active {
  background-color: var(--color-brand);
  color: white;
  border-radius: var(--radius-pill);
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}
.tab-inactive {
  background-color: transparent;
  color: var(--color-text-secondary);
  border-radius: var(--radius-pill);
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 500;
  border: 1.5px solid var(--color-border-default);
  cursor: pointer;
  white-space: nowrap;
}
.tab-inactive:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}
```

#### Badge

```css
/* 타깃 배지 */
.badge-solo   { background: #E8F5F0; color: #2D6A4F; }
.badge-couple { background: #FEF0EB; color: #C45B38; }
.badge-family { background: #EEF2FE; color: #3B54C2; }

/* 공통 배지 스타일 */
[class^="badge-"] {
  display: inline-flex; align-items: center;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-body);
}

/* 스탬프 배지 */
.stamp-badge-active   { background: #E8F5F0; color: #2D6A4F; font-size:11px; padding:3px 8px; border-radius: var(--radius-pill); font-weight:500; }
.stamp-badge-disabled { background: #F3F3F0; color: #BCBCB5; font-size:11px; padding:3px 8px; border-radius: var(--radius-pill); font-weight:500; }
```

#### Skeleton (로딩 상태)

```html
<!-- 지도 로딩 스켈레톤 -->
<div class="w-full h-64 bg-gray-200 rounded-lg animate-pulse
            flex items-center justify-center" aria-busy="true" aria-label="지도 로딩 중">
  <span class="text-content-tertiary text-sm">지도를 불러오는 중...</span>
</div>

<!-- 카드 로딩 스켈레톤 -->
<div class="bg-surface-elevated rounded-lg overflow-hidden border border-black/[0.08] animate-pulse">
  <div class="h-40 bg-gray-200"></div>
  <div class="p-4 space-y-2">
    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
    <div class="h-3 bg-gray-200 rounded w-1/2"></div>
  </div>
</div>
```

### 7.3 상태 컴포넌트 (5종)

모든 핵심 화면(S-001~S-004)은 다음 상태를 반드시 정의한다.

```html
<!-- Empty State (데이터 없음 — 현재 서비스에서 사용 빈도 낮음) -->
<div class="flex flex-col items-center justify-center py-16 text-center px-6">
  <p class="text-4xl mb-4">📚</p>
  <h3 class="font-serif text-lg font-medium text-content-primary mb-2">코스 정보 준비 중</h3>
  <p class="text-sm text-content-secondary">곧 업데이트됩니다</p>
</div>

<!-- Loading State -->
<!-- → Skeleton 컴포넌트 사용 (§7.2 참조) -->

<!-- Error State (지도 로드 실패) -->
<div class="flex flex-col items-center justify-center py-12 text-center px-6
            bg-surface-elevated rounded-lg border border-black/[0.08]">
  <p class="text-3xl mb-3">🗺️</p>
  <h3 class="font-medium text-content-primary mb-1 text-base">지도를 불러올 수 없습니다</h3>
  <p class="text-sm text-content-secondary mb-4">네트워크를 확인하고 새로고침 해주세요</p>
  <button class="btn-outline text-sm" onclick="location.reload()">새로고침</button>
</div>

<!-- Disabled State (Coming Soon) -->
<!-- → CourseCard coming-soon variant 사용 (§7.2 참조) -->
```

---

## 8. Anti-Patterns ⭐

이 규칙을 어기면 브랜드 인상이 깨진다. Claude Code / Cursor가 이 규칙을 위반하는 코드를 생성하면 즉시 수정을 요청해라.

### 8.1 브랜드 금지 인상 → 코드 규칙

**❌ 클룩 스타일 상업적 여행앱 인상 방지**
- 오렌지 계열 컬러를 메인으로 사용 금지 (accent로 소량만)
- 할인 뱃지 (`-30% 할인`) 스타일의 강렬한 빨강-노랑 조합 금지
- 별점 + 리뷰 수 + 가격이 동시에 튀는 카드 레이아웃 금지

**❌ 네이버 지도 스타일 정보 밀집 방지**
- 한 카드에 텍스트 5줄 이상 금지
- 한 화면에 컬러 5종 이상 사용 금지
- 텍스트 줄 간격 1.5 미만 금지 (한글 최소 1.625)

**❌ AI 그라데이션 방지**
- 보라-파란 그라데이션 배경 금지
- 네온 글로우 효과 금지
- "마법처럼", "혁신적인" 같은 과장 표현 금지

**❌ 차갑고 딱딱한 SaaS 인상 방지**
- 모서리 반경 4px 미만 금지 (최소 `--radius-sm: 8px`)
- 순수 흰색(`#FFFFFF`) 페이지 배경 금지 → 오프화이트(`#FAFAF8`) 사용
- 차가운 쿨그레이 텍스트 금지 → 웜그레이(`#6B6B65`) 사용

**❌ 밋밋한 흑백 디자인 방지**
- 브랜드 컬러 없이 흑백만으로 페이지 구성 금지
- 이미지 없는 단색 카드 배경으로 전체 카드 채우기 금지
- 제목에 세리프 폰트(`Noto Serif KR`) 미사용 금지

### 8.2 공통 안티패턴

```
❌ 토큰 무시
   - 임의 HEX 코드 인라인 사용 금지 → CSS 변수 또는 Tailwind 커스텀 색상만
   - 임의 px margin/padding 금지 → Tailwind space 스케일만

❌ 5상태 누락
   - Loading/Error 상태 미구현 금지 (특히 카카오 지도 로드)
   - "지도가 없으면 빈 박스" 처리 금지 → Skeleton 사용 의무

❌ 모바일 미대응
   - 375px에서 가로 스크롤 발생 금지
   - 탭 버튼이 375px에서 줄바꿈 없이 보여야 함 (overflow-x: auto)
   - 터치 타깃 최소 44×44px 이하 금지 (WCAG 모바일)

❌ 접근성 무시
   - 색 대비 4.5:1 미만 금지 (예: 연한 그린 위 흰 텍스트 금지)
   - img 태그 alt 속성 누락 금지
   - 모달 열릴 때 배경 스크롤 잠금 및 포커스 트랩 필수

❌ 지도 이벤트 충돌
   - 모달 오픈 시 지도 영역 pointer-events: none 처리 필수
   - 모달 닫힐 때 pointer-events 복구 필수

❌ shadcn 기본값 그대로 사용
   - shadcn 기본 파란색(hsl(221.2 83.2% 53.3%)) 사용 금지
   - 모든 컴포넌트는 위 §2 토큰으로 오버라이드
```

---

## 9. 페이지 레이아웃 규칙

이 서비스는 단일 페이지(Single Page)이므로 랜딩/제품 분리 대신 **섹션별 규칙**을 정의한다.

### 9.1 헤더 섹션

```css
/* 모바일 기준 */
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--color-bg-base);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: 12px 16px;
}
/* 헤더: 로고(서비스명) + 탭 필터 수직 배치 */
```

### 9.2 지도 섹션

```css
.map-section {
  width: 100%;
  height: 56vw;       /* 모바일: 화면 너비의 56% */
  min-height: 220px;
  max-height: 360px;  /* PC에서 너무 커지지 않도록 */
}
/* sm: 이상에서 height: 400px 고정 */
```

### 9.3 카드 그리드 섹션

```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr;         /* 모바일: 1열 */
  gap: 16px;
  padding: 16px;
}
/* sm: grid-template-columns: 1fr 1fr; */
/* lg: grid-template-columns: repeat(4, 1fr); */
```

### 9.4 최대 너비 (PC)

```css
.page-container {
  max-width: 1280px;
  margin: 0 auto;
}
/* 지도는 max-width 없이 full-width */
/* 카드 그리드는 max-width 1280px 내에 배치 */
```

### 9.5 z-index 스택

```css
--z-map:     0;    /* 카카오 지도 */
--z-marker:  10;   /* 지도 마커 */
--z-header:  40;   /* 고정 헤더 */
--z-modal:   50;   /* 코스 상세 모달 */
--z-toast:   60;   /* Coming Soon 팝업 */
```

---

## 10. 지도 스타일 가이드 (Kakao Maps API)

### 마커 스타일

```javascript
// 마커 색상별 SVG 아이콘 생성 함수
function createMarkerImage(category) {
  const colors = {
    bookstore: '#2D6A4F',  // 독립서점
    market:    '#F4845F',  // 시장·카페
    nature:    '#4A90D9',  // 자연·문화
    disabled:  '#BCBCB5',  // Coming Soon
  };
  const color = colors[category] || colors.bookstore;

  // 커스텀 SVG 마커 (원형 핀)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22S28 24.5 28 14C28 6.268 21.732 0 14 0z"
            fill="${color}"/>
      <circle cx="14" cy="14" r="6" fill="white"/>
    </svg>`;
  const encoded = encodeURIComponent(svg);
  return new kakao.maps.MarkerImage(
    `data:image/svg+xml,${encoded}`,
    new kakao.maps.Size(28, 36),
    { offset: new kakao.maps.Point(14, 36) }
  );
}
```

### 인포윈도우 스타일

```javascript
// 인포윈도우 커스텀 HTML
function createInfoWindowContent(place, stop) {
  return `
    <div style="
      background: #FFFFFF;
      border: 1px solid rgba(0,0,0,0.08);
      border-radius: 12px;
      padding: 12px 14px;
      min-width: 200px;
      max-width: 240px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      font-family: 'Pretendard', sans-serif;
    ">
      <p style="font-weight:500; font-size:14px; color:#1C1C1A; margin:0 0 6px;">
        ${place.name}
      </p>
      <p style="font-size:12px; color:#6B6B65; margin:0 0 3px;">
        🕐 ${stop.arrivalTime} · ${stop.durationMin}분
      </p>
      <p style="font-size:12px; color:#6B6B65; margin:0 0 3px;">
        ${place.activity}
      </p>
      <p style="font-size:12px; color:#2D6A4F; font-weight:500; margin:0 0 ${stop.hasStamp ? '6px' : '0'};">
        약 ${stop.costKRW.toLocaleString()}원
      </p>
      ${stop.hasStamp ? `
        <span style="
          background:#E8F5F0; color:#2D6A4F;
          font-size:11px; font-weight:500;
          padding:3px 8px; border-radius:9999px;
          display:inline-block; margin-top:4px;
        ">스탬프 ${stop.stampNumber}번</span>
      ` : ''}
    </div>`;
}
```

---

## 11. 마스터 프롬프트 결론 (AI 코드 도구 지시문)

```
구로구 여행 큐레이션 웹페이지의 HTML/CSS/JS를 작성할 때 다음을 엄격히 준수해라:

1. 색상: §2의 CSS 변수 또는 Tailwind 커스텀 색상만 사용. HEX 직접 입력 금지.
2. 간격: Tailwind space 스케일 (p-2, p-4, gap-4 등)만 사용. 임의 px 금지.
3. 폰트: 제목은 'Noto Serif KR', 본문/UI는 'Pretendard' 사용.
4. 반응형: 모바일(375px) 우선 작성 → sm: / md: 로 확장. 가로 스크롤 금지.
5. 상태: 지도(Loading/Error), 카드(Coming Soon), 모달(포커스 트랩) 처리 의무.
6. 지도: 마커 색상 §10 기준. 인포윈도우 §10 HTML 형식. 모달 오픈 시 pointer-events:none.
7. 안티패턴 §8 금지: 임의 HEX · 오렌지 메인 · AI 그라데이션 · 4px 미만 모서리 · 순백 배경.

이 디자인 시스템의 인상 키워드: 로컬 감성 · 책과 자연 · 따뜻하고 차분한 · 정보가 명확한
"이렇게 보이면 실패": 클룩 스타일 상업적 / 네이버 빽빽 / AI 그라데이션 / 차가운 SaaS / 밋밋한 흑백
```

---

## 부록 A. 디자인 토큰 JSON

```json
{
  "color": {
    "brand": {
      "default":  "#2D6A4F",
      "hover":    "#245C43",
      "active":   "#1B4D38",
      "light":    "#E8F5F0",
      "mid":      "#40916C",
      "pale":     "#74C69D"
    },
    "accent": {
      "default":  "#F4845F",
      "hover":    "#E06B45",
      "light":    "#FEF0EB"
    },
    "surface": {
      "base":     "#FAFAF8",
      "elevated": "#FFFFFF"
    },
    "text": {
      "primary":   "#1C1C1A",
      "secondary": "#6B6B65",
      "tertiary":  "#9B9B94",
      "disabled":  "#BCBCB5"
    },
    "marker": {
      "bookstore": "#2D6A4F",
      "market":    "#F4845F",
      "nature":    "#4A90D9",
      "disabled":  "#BCBCB5"
    }
  },
  "spacing": {
    "1": "4px",  "2": "8px",  "3": "12px", "4": "16px",
    "5": "20px", "6": "24px", "8": "32px", "10": "40px",
    "12": "48px","16": "64px","20": "80px","24": "96px"
  },
  "radius": {
    "sm":   "8px",
    "md":   "12px",
    "lg":   "16px",
    "xl":   "20px",
    "pill": "9999px"
  },
  "shadow": {
    "sm": "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    "md": "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
    "lg": "0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)"
  },
  "typography": {
    "fontDisplay": "Noto Serif KR",
    "fontBody":    "Pretendard",
    "sizes": {
      "xs": "12px", "sm": "13px", "base": "14px", "md": "16px",
      "lg": "18px", "xl": "20px", "2xl": "24px",  "3xl": "30px"
    },
    "lineHeight": {
      "tight":  1.4,
      "body":   1.625,
      "loose":  1.8
    }
  }
}
```

## 부록 B. HTML 파일 헤더 템플릿

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>구로구 여행코스 — 오류동·항동</title>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand:   { DEFAULT:'#2D6A4F', hover:'#245C43', light:'#E8F5F0', mid:'#40916C', pale:'#74C69D' },
            accent:  { DEFAULT:'#F4845F', hover:'#E06B45', light:'#FEF0EB' },
            surface: { base:'#FAFAF8', elevated:'#FFFFFF' },
            content: { primary:'#1C1C1A', secondary:'#6B6B65', tertiary:'#9B9B94', disabled:'#BCBCB5' },
          },
          borderRadius: { sm:'8px', md:'12px', lg:'16px', xl:'20px', pill:'9999px' },
          fontFamily: {
            serif: ['Noto Serif KR', 'Georgia', 'serif'],
            sans:  ['Pretendard', '-apple-system', 'sans-serif'],
          },
        }
      }
    }
  </script>

  <!-- 구글 폰트 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500&display=swap" rel="stylesheet">

  <!-- Pretendard CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css">

  <!-- 카카오 Maps API (API 키 교체 필요) -->
  <script type="text/javascript"
    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY"></script>

  <style>
    body { background-color: #FAFAF8; font-family: 'Pretendard', -apple-system, sans-serif; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-surface-base text-content-primary">
  <!-- 페이지 내용 -->
  <script src="courses-data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

---

## 다음 단계 핸드오프

### 잠긴 결정
- 컬러: 딥 포레스트 그린 `#2D6A4F` (브랜드) + 웜 테라코타 `#F4845F` (액센트)
- 배경: 오프화이트 `#FAFAF8`
- 폰트: Noto Serif KR(제목) + Pretendard(본문)
- 모서리: `12px` 기본, `9999px` 배지·탭
- 그림자: subtle (0 4px 12px rgba 0.08)
- 컴포넌트: Button·CourseCard·CourseModal·ThemeTabs·Badge·Skeleton·Toast (7종)
- 안티패턴: 5개 브랜드 금지 + 7개 공통 규칙 확정

### 다음 스킬 호출
- 웹페이지 바로 제작: Claude Code에 이 파일 + `prd-구로여행코스-20260602-handoff.md`를 붙여넣고 **"구로 여행코스 웹페이지 만들어줘"**
- 페이지 기획 필요: **"페이지 기획해줘"** (webpage-planner)
