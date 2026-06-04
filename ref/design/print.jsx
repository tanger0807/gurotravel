// print.jsx — 정적 인쇄 페이지 구성
const DATA = window.GURO_DATA;
const REGION_TONE = { '오류동': 'bookstore', '항동': 'nature' };

function PageFrame({ children, footer, idx, total }) {
  return (
    <div className="page">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px 20px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={{ fontSize: 11, color: '#BCBCB5' }}>{footer || DATA.footerNote}</span>
        {idx && <span style={{ fontSize: 11, color: '#BCBCB5' }}>{idx} / {total}</span>}
      </div>
    </div>
  );
}

// ── 1. 표지 ──
function CoverPage({ total }) {
  return (
    <div className="page">
      <Photo tone="hero" style={{ flex: 1 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,40,30,0.34) 0%, rgba(20,40,30,0.14) 40%, rgba(20,40,30,0.72) 100%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: -50, top: 180, width: 280, height: 280, borderRadius: '50% 50% 50% 8%', background: 'rgba(255,255,255,0.06)', transform: 'rotate(28deg)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: 70, top: 360, width: 170, height: 170, borderRadius: '50% 50% 50% 8%', background: 'rgba(255,255,255,0.05)', transform: 'rotate(-12deg)' }} />
        <div style={{ position: 'absolute', left: 48, top: 64 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2D6A4F', fontSize: 17 }} className="font-serif">책</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }} className="font-serif">구로 책길</span>
          </span>
        </div>
        <div style={{ position: 'absolute', left: 48, bottom: 90, right: 48 }}>
          <p style={{ margin: '0 0 18px', fontSize: 13, fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.85)' }}>GURO · 오류동 · 항동</p>
          <h1 className="font-serif" style={{ margin: '0 0 18px', fontSize: 52, fontWeight: 600, color: '#fff', lineHeight: 1.3, textWrap: 'pretty' }}>책과 숲을 잇는<br/>동네 한나절</h1>
          <p style={{ margin: 0, fontSize: 17, color: 'rgba(255,255,255,0.88)', lineHeight: 1.7 }}>독립서점 네 곳, 시장과 수목원까지 — 흩어진 장소를<br/>하나의 동선으로 잇는 구로 여행코스 안내.</p>
        </div>
        <div style={{ position: 'absolute', left: 48, bottom: 40 }}>
          <p className="ph-cap" style={{ fontSize: 11 }}>웹 디자인 시안 · 2026-06 · 1 / {total}</p>
        </div>
      </Photo>
    </div>
  );
}

// ── 2. 지도 + 코스 개요 ──
function OverviewPage({ idx, total }) {
  const allPlaceIds = new Set(Object.keys(DATA.places).filter((k) => DATA.places[k].category !== 'disabled'));
  return (
    <PageFrame idx={idx} total={total}>
      <div style={{ padding: '40px 40px 18px' }}>
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: '#40916C' }}>OVERVIEW</p>
        <h2 className="font-serif" style={{ margin: '0 0 7px', fontSize: 29, fontWeight: 600 }}>한눈에 보는 책길 지도</h2>
        <p style={{ margin: 0, fontSize: 14, color: '#6B6B65', lineHeight: 1.7 }}>오류동·항동 일대 독립서점·시장·자연 명소 {Object.keys(DATA.places).length - 1}곳을 한 지도에 모았습니다.</p>
      </div>
      <div style={{ padding: '0 40px', height: 340 }} className="avoid-break">
        <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', height: '100%' }}>
          <MapView data={DATA} height={340} visiblePlaceIds={allPlaceIds} activeCourse={null} selectedPlaceId={null} onSelectPlace={() => {}} onComingSoon={() => {}} showRoute={false} justFocused={false} />
        </div>
      </div>
      <div style={{ padding: '24px 40px 10px' }}>
        <h3 className="font-serif" style={{ margin: '0 0 14px', fontSize: 19, fontWeight: 600 }}>추천 코스 {DATA.courses.length}선</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {DATA.courses.map((c) => (
            <div key={c.id} className="avoid-break">
              <CourseCard course={c} layout="compact" onOpen={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </PageFrame>
  );
}

// ── 3~6. 코스 상세 ──
function CourseDetailPage({ course, idx, total }) {
  const places = DATA.places;
  const meta = DATA.categoryMeta;
  const targetLabel = { solo: '1인 여행', couple: '커플', family: '가족' }[course.target];
  return (
    <PageFrame idx={idx} total={total}>
      <div style={{ position: 'relative' }} className="avoid-break">
        <Photo tone={REGION_TONE[course.region] || 'nature'} caption={`${course.region} 대표 컷`} style={{ height: 200 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,28,22,0.74), transparent 64%)' }} />
          <div style={{ position: 'absolute', top: 22, left: 40, display: 'flex', gap: 7 }}>
            <span style={{ background: 'rgba(255,255,255,0.93)', color: '#2D6A4F', fontSize: 12, fontWeight: 600, padding: '5px 11px', borderRadius: 9999 }}>{course.region}</span>
            <span style={{ background: 'rgba(0,0,0,0.34)', color: '#fff', fontSize: 12, fontWeight: 500, padding: '5px 11px', borderRadius: 9999 }}>{THEME_LABEL[course.theme]}</span>
            <span style={{ background: 'rgba(0,0,0,0.34)', color: '#fff', fontSize: 12, fontWeight: 500, padding: '5px 11px', borderRadius: 9999 }}>{targetLabel}</span>
          </div>
          <div style={{ position: 'absolute', left: 40, bottom: 20, right: 40 }}>
            <h2 className="font-serif" style={{ margin: '0 0 5px', fontSize: 30, fontWeight: 600, color: '#fff' }}>{course.name}</h2>
            <p style={{ margin: 0, fontSize: 14.5, color: 'rgba(255,255,255,0.86)' }}>{course.tagline}</p>
          </div>
        </Photo>
      </div>

      <div style={{ padding: '18px 40px 6px' }}>
        <p style={{ margin: '0 0 14px', fontSize: 14, color: '#6B6B65', lineHeight: 1.75 }}>{course.summary}</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
          {[['소요 시간', fmtHours(course.totalMinutes)], ['1인 총비용', `${course.totalCostKRW.toLocaleString()}원`], ['스탬프', course.stamps > 0 ? `${course.stamps}곳` : '없음'], ['방문지', `${course.stops.length}곳`]].map(([k, v]) => (
            <div key={k} style={{ flex: 1, background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 12, padding: '11px 13px' }}>
              <p style={{ margin: '0 0 3px', fontSize: 11.5, color: '#9B9B94' }}>{k}</p>
              <p className="font-serif" style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#2D6A4F' }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      <ol style={{ listStyle: 'none', margin: 0, padding: '14px 40px 10px' }}>
        {course.stops.map((stop, i) => {
          const p = places[stop.placeId];
          const m = meta[p.category];
          const isLast = i === course.stops.length - 1;
          return (
            <li key={i} style={{ display: 'flex', gap: 14 }} className="avoid-break">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 32 }}>
                <span style={{ width: 30, height: 30, borderRadius: 9999, background: m.color, color: '#fff', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                {!isLast && <div style={{ width: 2, flex: 1, minHeight: 22, background: '#E3E6E1', marginTop: 3 }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: isLast ? 2 : 16 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <h3 className="font-serif" style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{p.name}</h3>
                  <span style={{ fontSize: 12.5, color: '#9B9B94' }}>{stop.arrival} 도착</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '5px 0 5px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 9999, background: m.color }} />
                  <span style={{ fontSize: 11.5, fontWeight: 500, color: m.color }}>{m.label}</span>
                </div>
                <p style={{ margin: '0 0 7px', fontSize: 13.5, color: '#6B6B65', lineHeight: 1.6 }}>{p.activity}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12.5, color: '#9B9B94' }}>⏱ {stop.durationMin}분</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#2D6A4F' }}>{stop.costKRW === 0 ? '무료' : `약 ${stop.costKRW.toLocaleString()}원`}</span>
                  {stop.stampNumber && <span style={{ background: '#E8F5F0', color: '#2D6A4F', fontSize: 11.5, fontWeight: 600, padding: '3px 9px', borderRadius: 9999 }}>스탬프 {stop.stampNumber}번</span>}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </PageFrame>
  );
}

function PrintDoc() {
  const total = 2 + DATA.courses.length;
  return (
    <React.Fragment>
      <CoverPage total={total} />
      <OverviewPage idx={2} total={total} />
      {DATA.courses.map((c, i) => (
        <CourseDetailPage key={c.id} course={c} idx={3 + i} total={total} />
      ))}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrintDoc />);

// 폰트 + 렌더 완료 후 자동 인쇄 다이얼로그
(async () => {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
  setTimeout(() => { window.print(); }, 600);
})();
