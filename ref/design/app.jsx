// app.jsx — 구로 책길 인터랙티브 프로토타입

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cardLayout": "visual",
  "mapArrangement": "stack",
  "showRoute": true,
  "showHero": true,
  "realMap": false
}/*EDITMODE-END*/;

const { useState, useRef, useEffect, useCallback } = React;
const DATA = window.GURO_DATA;

// ── 화면을 뷰포트에 맞춰 스케일하는 스테이지 ──
function Stage({ children }) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const s = Math.min((window.innerHeight - 36) / 874, (window.innerWidth - 36) / 402, 1.08);
      setScale(Math.max(0.4, s));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>{children}</div>
    </div>
  );
}

// ── 상단 히어로 ──
function Hero() {
  return (
    <section style={{ position: 'relative' }}>
      <Photo tone="hero" src={DATA.heroImage} style={{ height: 312 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,40,30,0.34) 0%, rgba(20,40,30,0.10) 34%, rgba(20,40,30,0.74) 100%)' }} />
        {/* 잎/책 모티프 (단순 도형만) */}
        <div aria-hidden="true" style={{ position: 'absolute', right: -28, top: 64, width: 150, height: 150, borderRadius: '50% 50% 50% 8%', background: 'rgba(255,255,255,0.06)', transform: 'rotate(28deg)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: 40, top: 150, width: 96, height: 96, borderRadius: '50% 50% 50% 8%', background: 'rgba(255,255,255,0.05)', transform: 'rotate(-12deg)' }} />
        <div style={{ position: 'absolute', left: 18, top: 62, right: 18 }}>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.85)' }}>GURO · 오류동 · 항동</p>
        </div>
        <div style={{ position: 'absolute', left: 18, bottom: 22, right: 18 }}>
          <h1 className="font-serif" style={{ margin: '0 0 8px', fontSize: 27, fontWeight: 600, color: '#fff', lineHeight: 1.34, textWrap: 'pretty' }}>책과 숲을 잇는<br />동네 한나절</h1>
          <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(255,255,255,0.86)', lineHeight: 1.6 }}>독립서점 네 곳, 시장과 수목원까지<br />흩어진 장소를 하나의 동선으로.</p>
        </div>
      </Photo>
    </section>
  );
}

// ── 토스트 (Coming Soon) ──
function Toast({ text, onClose }) {
  return (
    <div onClick={onClose} className="dim-in" style={{
      position: 'absolute', inset: 0, zIndex: 95, background: 'rgba(0,0,0,0.40)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28,
    }}>
      <div onClick={(e) => e.stopPropagation()} className="pop-in" style={{
        background: '#fff', borderRadius: 18, padding: '22px 20px 18px', maxWidth: 280, textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      }}>
        <div style={{ fontSize: 30, marginBottom: 8 }}>🚧</div>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: '#6B6B65', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{text}</p>
        <button onClick={onClose} style={{
          width: '100%', background: '#2D6A4F', color: '#fff', border: 'none', borderRadius: 12,
          padding: '11px 0', fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>알겠어요</button>
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [theme, setTheme] = useState('all');
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [modalCourse, setModalCourse] = useState(null);
  const [toast, setToast] = useState(null);
  const [justFocused, setJustFocused] = useState(false);

  const scrollRef = useRef(null);
  const mapRef = useRef(null);

  const courses = DATA.courses.filter((c) => theme === 'all' || c.theme === theme);
  const visiblePlaceIds = new Set();
  courses.forEach((c) => c.stops.forEach((s) => visiblePlaceIds.add(s.placeId)));

  const changeTheme = (id) => {
    setTheme(id);
    setActiveCourse(null);
    setSelectedPlaceId(null);
  };

  const jumpToMap = useCallback((course) => {
    setModalCourse(null);
    setActiveCourse(course);
    setSelectedPlaceId(course.stops[0].placeId);
    setJustFocused(true);
    setTimeout(() => {
      if (scrollRef.current && mapRef.current) {
        scrollRef.current.scrollTo({ top: Math.max(0, mapRef.current.offsetTop - 52), behavior: 'smooth' });
      }
    }, 60);
    setTimeout(() => setJustFocused(false), 700);
  }, []);

  const mapHeight = t.mapArrangement === 'pinned' ? 196 : 252;
  const pinned = t.mapArrangement === 'pinned';

  return (
    <Stage>
      <IOSDevice>
        <div ref={scrollRef} className="app-scroll" style={{ position: 'absolute', inset: 0, overflowY: 'auto', background: '#FAFAF8' }}>
          {t.showHero && <Hero />}

          {/* 스티키 헤더: 서비스명 + 테마 탭 */}
          <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingTop: t.showHero ? 0 : 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px 9px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: 7, background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}>책</span>
                <span className="font-serif" style={{ fontSize: 17, fontWeight: 600, color: '#1C1C1A' }}>구로 책길</span>
              </div>
              <span style={{ fontSize: 11.5, color: '#9B9B94' }}>오류동 · 항동</span>
            </div>
            <div style={{ paddingBottom: 10 }}>
              <ThemeTabs themes={DATA.themes} active={theme} onChange={changeTheme} />
            </div>
          </div>

          {/* 지도 섹션 */}
          <div ref={mapRef} style={pinned ? { position: 'sticky', top: 92, zIndex: 30, boxShadow: '0 6px 12px rgba(0,0,0,0.05)' } : {}}>
            <MapView
              data={DATA}
              height={mapHeight}
              visiblePlaceIds={visiblePlaceIds}
              activeCourse={activeCourse}
              selectedPlaceId={selectedPlaceId}
              onSelectPlace={setSelectedPlaceId}
              onComingSoon={() => setToast(DATA.comingSoon.popup)}
              showRoute={t.showRoute}
              justFocused={justFocused}
              realMap={t.realMap}
            />
            {activeCourse && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '9px 16px', background: '#E8F5F0', borderBottom: '1px solid rgba(45,106,79,0.12)' }}>
                <span style={{ fontSize: 12.5, color: '#2D6A4F', fontWeight: 500 }}>📍 «{activeCourse.name}» 동선을 지도에 표시 중</span>
                <button onClick={() => { setActiveCourse(null); setSelectedPlaceId(null); }} style={{ border: 'none', background: 'transparent', color: '#40916C', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>해제</button>
              </div>
            )}
          </div>

          {/* 코스 카드 섹션 */}
          <section style={{ padding: '16px 16px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 className="font-serif" style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#1C1C1A' }}>추천 코스</h2>
              <span style={{ fontSize: 12.5, color: '#9B9B94' }}>{courses.length}개 코스</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} layout={t.cardLayout} onOpen={() => setModalCourse(c)} />
              ))}
              <ComingSoonCard data={DATA} layout={t.cardLayout} onClick={() => setToast(DATA.comingSoon.popup)} />
            </div>
          </section>

          {/* 푸터 안내 */}
          <footer style={{ padding: '8px 18px 28px', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 11.5, color: '#BCBCB5', lineHeight: 1.6 }}>{DATA.footerNote}</p>
          </footer>
        </div>

        {/* 오버레이들 */}
        {modalCourse && (
          <CourseModal course={modalCourse} data={DATA} onClose={() => setModalCourse(null)} onJumpToMap={jumpToMap} />
        )}
        {toast && <Toast text={toast} onClose={() => setToast(null)} />}
      </IOSDevice>

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="코스 카드" />
        <TweakRadio label="레이아웃" value={t.cardLayout}
          options={[{ value: 'visual', label: '이미지형' }, { value: 'compact', label: '컴팩트' }, { value: 'overlay', label: '오버레이' }]}
          onChange={(v) => setTweak('cardLayout', v)} />
        <TweakSection label="지도 · 카드 배치" />
        <TweakRadio label="배치" value={t.mapArrangement}
          options={[{ value: 'stack', label: '상하 분할' }, { value: 'pinned', label: '지도 고정' }]}
          onChange={(v) => setTweak('mapArrangement', v)} />
        <TweakToggle label="동선 경로선 표시" value={t.showRoute} onChange={(v) => setTweak('showRoute', v)} />
        <TweakToggle label="실제 답사 지도" value={t.realMap} onChange={(v) => setTweak('realMap', v)} />
        <TweakSection label="상단" />
        <TweakToggle label="감성 히어로" value={t.showHero} onChange={(v) => setTweak('showHero', v)} />
      </TweaksPanel>
    </Stage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
