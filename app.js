// app.js — 구로구 여행코스 비즈니스 로직 및 인터랙션 구현
// Vanilla JS + Kakao Maps API 기반

(function () {
  const DATA = window.GURO_DATA;
  if (!DATA) {
    console.error("데이터 파일(courses-data.js)을 로드할 수 없습니다.");
    return;
  }

  // ── 애플리케이션 상태 ──
  const state = {
    activeTheme:   'all',   // 'all' | 'literary' | 'healing'
    activeCourseId: null,   // 지도 동선 표시할 코스 ID
    selectedPlaceId: null,  // 인포윈도우 팝업용 장소 ID
  };

  // ── DOM 요소 참조 ──
  const themeTabsContainer   = document.getElementById('theme-tabs');
  const activeCourseBar      = document.getElementById('active-course-bar');
  const activeCourseText     = document.getElementById('active-course-text');
  const clearActiveCourseBtn = document.getElementById('clear-active-course');
  const coursesGrid          = document.getElementById('courses-grid');
  const courseCountText      = document.getElementById('course-count');
  const footerNoteText       = document.getElementById('footer-note');

  const courseModal    = document.getElementById('course-modal');
  const modalTitle     = document.getElementById('modal-title');
  const modalSubtitle  = document.getElementById('modal-subtitle');
  const modalTimeline  = document.getElementById('modal-timeline');
  const modalTotalCost = document.getElementById('modal-total-cost');
  const closeModalBtn  = document.getElementById('close-modal');

  const comingSoonPopup = document.getElementById('coming-soon-popup');
  const popupMessage    = document.getElementById('popup-message');
  const closePopupBtn   = document.getElementById('close-popup');

  // ── 카카오맵 변수 ──
  let kakaoMap      = null;
  let pinOverlays   = {};
  let routePolyline = null;
  let infoOverlay   = null;

  // ── 초기화 ──
  function init() {
    footerNoteText.textContent = DATA.footerNote;
    renderThemes();
    setupGlobalEvents();
    renderCourses(); // SDK 로드와 무관하게 코스 목록 즉시 표시

    loadKakaoSDK()
      .then(() => new Promise(resolve => kakao.maps.load(resolve)))
      .then(() => geocodePlaces())
      .then(() => {
        initKakaoMap();
        const activeCourse = DATA.courses.find(c => c.id === state.activeCourseId);
        renderPins(activeCourse);
        renderRouteLine(activeCourse);
      })
      .catch((err) => {
        console.error('[카카오 지도]', err.message);
        const mapEl = document.getElementById('kakao-map');
        if (mapEl) {
          mapEl.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                        height:100%;gap:6px;color:#9B9B94;font-size:12px;text-align:center;padding:16px">
              <span style="font-size:24px">🗺️</span>
              <span style="font-weight:600">지도를 불러올 수 없습니다</span>
              <span style="font-size:11px;line-height:1.6">${err.message}</span>
            </div>`;
        }
      });
  }

  // ── 카카오 SDK 동적 로드 ──
  function loadKakaoSDK() {
    return new Promise((resolve, reject) => {
      if (typeof kakao !== 'undefined') { resolve(); return; }

      const script = document.createElement('script');
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a3e455b5a6d8f9181df38f3295886fd1&autoload=false&libraries=services';
      script.onload = () => {
        if (typeof kakao !== 'undefined') {
          resolve();
        } else {
          reject(new Error('SDK 로드 성공했으나 kakao 객체 미생성 →\n카카오 개발자 콘솔에서 현재 도메인이 등록됐는지 확인하세요'));
        }
      };
      script.onerror = () => reject(new Error('dapi.kakao.com 요청 실패 →\n광고 차단기를 비활성화하거나 네트워크를 확인하세요'));
      document.head.appendChild(script);
    });
  }

  // ── address 필드가 있는 장소 좌표 자동 보정 ──
  function geocodePlaces() {
    const geocoder = new kakao.maps.services.Geocoder();
    const targets = Object.values(DATA.places).filter(p => p.address);
    if (!targets.length) return Promise.resolve();

    return Promise.all(targets.map(place => new Promise(resolve => {
      geocoder.addressSearch(place.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK && result.length > 0) {
          place.lat = parseFloat(result[0].y);
          place.lng = parseFloat(result[0].x);
        }
        resolve();
      });
    })));
  }

  // ── 카카오맵 초기화 ──
  function initKakaoMap() {
    const container = document.getElementById('kakao-map');
    kakaoMap = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(37.4920, 126.8490),
      level:  5,
    });

    // 전체 장소가 보이도록 초기 범위 자동 조정
    const bounds = new kakao.maps.LatLngBounds();
    Object.values(DATA.places).forEach(p => {
      if (p.category !== 'disabled') bounds.extend(new kakao.maps.LatLng(p.lat, p.lng));
    });
    kakaoMap.setBounds(bounds, 50);

    // 맵 빈 곳 클릭 시 인포윈도우 닫기
    kakao.maps.event.addListener(kakaoMap, 'click', () => {
      if (state.selectedPlaceId) {
        state.selectedPlaceId = null;
        renderInfoWindow(DATA.courses.find(c => c.id === state.activeCourseId));
      }
    });
  }

  // ── 글로벌 이벤트 핸들러 ──
  function setupGlobalEvents() {
    courseModal.addEventListener('click', (e) => {
      if (e.target === courseModal) closeModal();
    });
    closeModalBtn.addEventListener('click', closeModal);

    comingSoonPopup.addEventListener('click', (e) => {
      if (e.target === comingSoonPopup) closePopup();
    });
    closePopupBtn.addEventListener('click', closePopup);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeModal(); closePopup(); }
    });

    clearActiveCourseBtn.addEventListener('click', () => {
      state.activeCourseId  = null;
      state.selectedPlaceId = null;
      updateUI();
      // 전체 범위로 복귀
      if (kakaoMap) {
        const bounds = new kakao.maps.LatLngBounds();
        Object.values(DATA.places).forEach(p => {
          if (p.category !== 'disabled') bounds.extend(new kakao.maps.LatLng(p.lat, p.lng));
        });
        kakaoMap.setBounds(bounds, 50);
      }
    });
  }

  // ── 테마 탭 렌더링 ──
  function renderThemes() {
    themeTabsContainer.innerHTML = '';
    DATA.themes.forEach(t => {
      const button = document.createElement('button');
      button.id = `tab-${t.id}`;
      button.role = 'tab';
      button.setAttribute('aria-selected', state.activeTheme === t.id ? 'true' : 'false');
      button.className = state.activeTheme === t.id
        ? 'px-4 py-2 bg-brand text-white font-medium text-xs rounded-pill border-none cursor-pointer whitespace-nowrap transition-all'
        : 'px-4 py-2 text-content-secondary hover:text-brand bg-transparent border border-black/[0.08] hover:border-brand text-xs rounded-pill cursor-pointer whitespace-nowrap transition-all';
      button.textContent = t.label;
      button.addEventListener('click', () => {
        state.activeTheme    = t.id;
        state.activeCourseId  = null;
        state.selectedPlaceId = null;
        renderThemes();
        updateUI();
      });
      themeTabsContainer.appendChild(button);
    });
  }

  // ── 전반적인 UI 업데이트 ──
  function updateUI() {
    const activeCourse = DATA.courses.find(c => c.id === state.activeCourseId);

    if (activeCourse) {
      activeCourseText.textContent = `📍 «${activeCourse.name}» 동선을 지도에 표시 중`;
      activeCourseBar.classList.remove('hidden');
    } else {
      activeCourseBar.classList.add('hidden');
    }

    if (kakaoMap) {
      renderPins(activeCourse);
      renderRouteLine(activeCourse);
      renderInfoWindow(activeCourse);
    }

    renderCourses();
  }

  // ── 핀 마커 렌더링 (Kakao CustomOverlay) ──
  function renderPins(activeCourse) {
    Object.values(pinOverlays).forEach(o => o.setMap(null));
    pinOverlays = {};

    const activeThemeCourses = DATA.courses.filter(c => state.activeTheme === 'all' || c.theme === state.activeTheme);
    const visiblePlaceIds    = new Set();
    activeThemeCourses.forEach(c => c.stops.forEach(s => visiblePlaceIds.add(s.placeId)));

    const activeCourseStops = {};
    if (activeCourse) {
      activeCourse.stops.forEach((s, idx) => { activeCourseStops[s.placeId] = idx + 1; });
    }

    Object.values(DATA.places).forEach(place => {
      const isDisabled = place.category === 'disabled';
      if (isDisabled || !visiblePlaceIds.has(place.id)) return;

      const isInActiveCourse = activeCourseStops[place.id] !== undefined;
      const isDimmed = activeCourse && !isInActiveCourse && !isDisabled;
      const order    = activeCourseStops[place.id];
      const color    = DATA.categoryMeta[place.category].color;
      const isSel    = state.selectedPlaceId === place.id;

      const innerFill = isSel ? color : 'white';
      const numColor  = isSel ? 'white' : color;

      const content = `
        <button
          id="pin-${place.id}"
          aria-label="${place.name} ${isDisabled ? '준비 중' : '상세 정보 보기'}"
          style="background:transparent;border:none;padding:0;cursor:pointer;opacity:${isDimmed ? 0.34 : 1};display:block;transition:opacity .2s,transform .2s"
          onmouseover="this.style.transform='scale(1.12)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <div style="display:flex;flex-direction:column;align-items:center;position:relative">
            <svg width="28" height="36" viewBox="0 0 28 36" style="filter:drop-shadow(0 3px 4px rgba(0,0,0,.18));display:block">
              <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22S28 24.5 28 14C28 6.268 21.732 0 14 0z" fill="${color}"/>
              <circle cx="14" cy="14" r="6" fill="${innerFill}"/>
            </svg>
            ${order ? `<span style="position:absolute;top:3px;font-size:10px;font-weight:700;color:${numColor};line-height:1">${order}</span>` : ''}
          </div>
        </button>
      `;

      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(place.lat, place.lng),
        content,
        yAnchor: 1,
        zIndex:  isSel ? 35 : 20,
      });
      overlay.setMap(kakaoMap);
      pinOverlays[place.id] = overlay;

      const pinEl = document.getElementById(`pin-${place.id}`);
      if (pinEl) {
        pinEl.addEventListener('click', (e) => {
          e.stopPropagation();
          if (isDisabled) {
            showComingSoon(DATA.comingSoon.popup);
          } else {
            state.selectedPlaceId = state.selectedPlaceId === place.id ? null : place.id;
            updateUI();
          }
        });
      }
    });
  }

  // ── 코스 경로 폴리라인 렌더링 ──
  function renderRouteLine(activeCourse) {
    if (routePolyline) { routePolyline.setMap(null); routePolyline = null; }
    if (!activeCourse || activeCourse.stops.length < 2) return;

    const path = activeCourse.stops
      .map(s => DATA.places[s.placeId])
      .filter(Boolean)
      .map(p => new kakao.maps.LatLng(p.lat, p.lng));

    routePolyline = new kakao.maps.Polyline({
      path,
      strokeWeight:  3,
      strokeColor:   '#2D6A4F',
      strokeOpacity: 0.85,
      strokeStyle:   'dashed',
    });
    routePolyline.setMap(kakaoMap);

    // 코스 전체가 보이도록 지도 범위 조정
    const bounds = new kakao.maps.LatLngBounds();
    path.forEach(pt => bounds.extend(pt));
    kakaoMap.setBounds(bounds, 70);
  }

  // ── 인포윈도우 렌더링 (Kakao CustomOverlay) ──
  function renderInfoWindow(activeCourse) {
    if (infoOverlay) { infoOverlay.setMap(null); infoOverlay = null; }
    if (!state.selectedPlaceId) return;

    const place = DATA.places[state.selectedPlaceId];
    if (!place || place.category === 'disabled') return;

    const meta     = DATA.categoryMeta[place.category];
    const stopInfo = activeCourse ? activeCourse.stops.find(s => s.placeId === place.id) : null;

    const content = `
      <div style="pointer-events:none">
        <div style="
          width:210px;background:white;border:1px solid rgba(0,0,0,.08);
          border-radius:8px;padding:12px;
          box-shadow:0 4px 12px rgba(0,0,0,.1);
          font-family:Pretendard,-apple-system,sans-serif;font-size:12px;
          position:relative;pointer-events:auto
        ">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:6px">
            <h4 style="font-family:'Noto Serif KR',Georgia,serif;font-size:14px;font-weight:700;color:#1C1C1A;margin:0;line-height:1.3">${place.name}</h4>
            <button id="close-infowindow" style="background:none;border:none;cursor:pointer;color:#9B9B94;font-size:14px;padding:2px;line-height:1;flex-shrink:0" aria-label="창 닫기">✕</button>
          </div>
          ${place.photos && place.photos[0] ? `<img src="${place.photos[0]}" alt="${place.name}" style="width:100%;height:72px;object-fit:cover;border-radius:4px;margin-bottom:8px;display:block">` : ''}
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
            <span style="width:6px;height:6px;border-radius:50%;background:${meta.color};display:inline-block;flex-shrink:0"></span>
            <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${meta.color}">${meta.label}</span>
          </div>
          ${stopInfo ? `<p style="color:#6B6B65;margin:0 0 4px;font-size:11px">🕐 ${stopInfo.arrival} · ${stopInfo.durationMin}분</p>` : ''}
          <p style="color:#6B6B65;margin:0 0 6px;font-size:11px;line-height:1.5">${place.activity}</p>
          ${stopInfo ? `
            <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
              <span style="font-weight:700;color:#2D6A4F;font-size:12px">${stopInfo.costKRW === 0 ? '무료' : `약 ${stopInfo.costKRW.toLocaleString()}원`}</span>
              ${stopInfo.stampNumber ? `<span style="background:#E8F5F0;color:#2D6A4F;font-size:9px;font-weight:700;padding:2px 6px;border-radius:9999px">스탬프 ${stopInfo.stampNumber}번</span>` : ''}
            </div>
          ` : ''}
          <!-- 말풍선 꼬리 -->
          <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%) rotate(45deg);width:12px;height:12px;background:white;border-right:1px solid rgba(0,0,0,.08);border-bottom:1px solid rgba(0,0,0,.08)"></div>
        </div>
        <!-- 핀 위 여백 확보 스페이서 (핀 높이 36px + 여유) -->
        <div style="height:46px"></div>
      </div>
    `;

    infoOverlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(place.lat, place.lng),
      content,
      yAnchor: 1,
      zIndex:  30,
    });
    infoOverlay.setMap(kakaoMap);

    const closeBtn = document.getElementById('close-infowindow');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.selectedPlaceId = null;
        updateUI();
      });
    }
  }

  // ── 코스 카드 그리드 렌더링 ──
  function renderCourses() {
    coursesGrid.innerHTML = '';

    const filtered = DATA.courses.filter(c => state.activeTheme === 'all' || c.theme === state.activeTheme);
    courseCountText.textContent = `${filtered.length}개 코스`;

    filtered.forEach(c => {
      const card = document.createElement('article');
      card.id        = `card-${c.id}`;
      card.className = 'bg-surface-elevated rounded-lg overflow-hidden border border-black/[0.08] shadow-sm hover:shadow-md transition-shadow cursor-pointer duration-200 flex flex-col sm:flex-row';
      card.role      = 'button';
      card.tabIndex  = 0;
      card.setAttribute('aria-label', `${c.name} 코스 상세 보기`);

      let badgeClass, targetText;
      if (c.target === 'couple') {
        badgeClass = 'bg-accent-light text-accent';  targetText = '커플 데이트';
      } else if (c.target === 'family') {
        badgeClass = 'bg-[#EEF2FE] text-[#3B54C2]'; targetText = '4050 / 가족';
      } else {
        badgeClass = 'bg-brand-light text-brand';    targetText = '1인 여행';
      }

      card.innerHTML = `
        <div class="relative h-36 sm:w-44 sm:h-auto overflow-hidden bg-brand-pale flex-shrink-0">
          <img src="${c.coverImage}" alt="${c.name}" class="w-full h-full object-cover" loading="lazy">
        </div>
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-serif text-base font-bold text-content-primary mb-1 leading-tight">${c.name}</h3>
            <p class="text-xs text-content-secondary leading-normal mb-2">${c.tagline}</p>
            <p class="text-[11px] text-content-tertiary mb-3">⏱ 총 ${Math.round(c.totalMinutes / 60 * 10) / 10}시간 · 1인 약 ${c.totalCostKRW.toLocaleString()}원</p>
          </div>
          <div class="flex items-center justify-between mt-auto">
            <span class="px-2.5 py-0.5 rounded-pill text-[10px] font-bold ${badgeClass}">${targetText}</span>
            <span class="text-xs text-brand font-bold flex items-center gap-0.5 hover:translate-x-0.5 transition-transform">자세히 <span class="font-sans">→</span></span>
          </div>
        </div>
      `;

      const handleOpen = () => {
        state.activeCourseId  = c.id;
        state.selectedPlaceId = c.stops[0].placeId;
        updateUI();
        showCourseModal(c);
        document.getElementById('map-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };

      card.addEventListener('click', handleOpen);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(); }
      });

      coursesGrid.appendChild(card);
    });

  }

  // ── 코스 상세 모달 ──
  function showCourseModal(course) {
    modalTitle.textContent     = course.name;
    modalSubtitle.textContent  = `총 약 ${Math.round(course.totalMinutes / 60 * 10) / 10}시간 · 1인 약 ${course.totalCostKRW.toLocaleString()}원`;
    modalTotalCost.textContent = `${course.totalCostKRW.toLocaleString()}원`;

    modalTimeline.innerHTML = '';
    course.stops.forEach((stop, idx) => {
      const place = DATA.places[stop.placeId];
      if (!place) return;

      const color = DATA.categoryMeta[place.category].color;
      const li    = document.createElement('li');
      li.className = 'relative pl-1 pb-4 group';
      li.innerHTML = `
        <span class="absolute -left-[30px] top-0 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center z-10 transition-transform group-hover:scale-105" style="background-color:${color}">${idx + 1}</span>
        <div class="flex items-baseline justify-between gap-3 mb-1">
          <a href="https://map.kakao.com/?q=${encodeURIComponent(place.name)}" target="_blank" rel="noopener noreferrer"
             class="text-sm font-bold text-content-primary hover:text-brand hover:underline flex items-center gap-1 cursor-pointer">
            ${place.name}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-content-tertiary group-hover:text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <span class="text-[11px] font-medium text-content-tertiary font-sans">${stop.arrival}</span>
        </div>
        <p class="text-xs text-content-secondary leading-relaxed mb-2">${place.activity}</p>
        <div class="flex items-center gap-3 text-[10px] text-content-tertiary">
          <span class="flex items-center gap-0.5">⏱ 체류 ${stop.durationMin}분</span>
          <span class="font-bold" style="color:${color}">${stop.costKRW === 0 ? '무료' : `약 ${stop.costKRW.toLocaleString()}원`}</span>
          ${stop.stampNumber ? `<span class="bg-brand-light text-brand font-bold px-2 py-0.5 rounded-pill">스탬프 ${stop.stampNumber}번</span>` : ''}
        </div>
      `;
      modalTimeline.appendChild(li);
    });

    courseModal.classList.remove('hidden');
    courseModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    document.getElementById('map-section').classList.add('pointer-events-none');
    focusTrap(courseModal);
  }

  function closeModal() {
    courseModal.classList.add('hidden');
    courseModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    document.getElementById('map-section').classList.remove('pointer-events-none');
  }

  // ── Coming Soon 팝업 ──
  function showComingSoon(popupText) {
    popupMessage.innerHTML = popupText.replace(/\n/g, '<br>');
    comingSoonPopup.classList.remove('hidden');
    comingSoonPopup.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    document.getElementById('map-section').classList.add('pointer-events-none');
    focusTrap(comingSoonPopup);
  }

  function closePopup() {
    comingSoonPopup.classList.add('hidden');
    comingSoonPopup.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    document.getElementById('map-section').classList.remove('pointer-events-none');
  }

  // ── 웹 접근성: 포커스 트랩 ──
  function focusTrap(container) {
    const focusable = container.querySelectorAll('button, a, [tabindex="0"]');
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    first.focus();

    container.onkeydown = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { last.focus(); e.preventDefault(); }
      } else {
        if (document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    };
  }

  // 스크립트가 <body> 하단에 위치하므로 DOM은 이미 파싱 완료 상태일 수 있음
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
