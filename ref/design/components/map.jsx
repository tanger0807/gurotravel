// MapView — Kakao 지도 자리 placeholder + 기능형 핀/경로/인포윈도우
const { useRef: useMapRef, useState: useMapState } = React;

function PinSVG({ color, dimmed }) {
  return (
    <svg width="26" height="34" viewBox="0 0 28 36" style={{ display: 'block', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.22))', opacity: dimmed ? 0.34 : 1 }}>
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22S28 24.5 28 14C28 6.268 21.732 0 14 0z" fill={color} />
      <circle cx="14" cy="14" r="5.4" fill="white" />
    </svg>
  );
}

function InfoWindow({ place, stop, meta, onClose }) {
  return (
    <div className="pop-in" style={{
      position: 'absolute',
      left: `${place.x}%`, top: `${place.y}%`,
      transform: 'translate(-50%, calc(-100% - 30px))',
      width: 212, zIndex: 30,
    }}>
      <div style={{
        background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12,
        padding: '11px 13px', boxShadow: '0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <p className="font-serif" style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#1C1C1A', lineHeight: 1.3 }}>{place.name}</p>
          <button onClick={onClose} aria-label="닫기" style={{
            border: 'none', background: 'transparent', color: '#9B9B94', cursor: 'pointer',
            fontSize: 13, lineHeight: 1, padding: 2, marginRight: -4, marginTop: -2,
          }}>✕</button>
        </div>
        {place.photos && place.photos[0] && (
          <img src={place.photos[0]} alt={place.name} loading="lazy" style={{ width: '100%', height: 92, objectFit: 'cover', borderRadius: 8, margin: '7px 0 2px', display: 'block' }} />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '5px 0 6px' }}>
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: meta.color, flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 500, color: meta.color, letterSpacing: '0.02em' }}>{meta.label}</span>
        </div>
        {stop && (
          <p style={{ margin: '0 0 3px', fontSize: 12, color: '#6B6B65' }}>
            🕐 {stop.arrival} 도착 · {stop.durationMin}분
          </p>
        )}
        <p style={{ margin: '0 0 5px', fontSize: 12, color: '#6B6B65', lineHeight: 1.55 }}>{place.activity}</p>
        {stop && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2D6A4F' }}>
              {stop.costKRW === 0 ? '무료' : `약 ${stop.costKRW.toLocaleString()}원`}
            </span>
            {stop.stampNumber && (
              <span style={{ background: '#E8F5F0', color: '#2D6A4F', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 9999 }}>
                스탬프 {stop.stampNumber}번
              </span>
            )}
          </div>
        )}
      </div>
      {/* 말풍선 꼬리 */}
      <div style={{
        position: 'absolute', left: '50%', bottom: -6, transform: 'translateX(-50%) rotate(45deg)',
        width: 12, height: 12, background: '#fff',
        borderRight: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)',
      }} />
    </div>
  );
}

function MapView({
  data, height, visiblePlaceIds, activeCourse, selectedPlaceId,
  onSelectPlace, onComingSoon, showRoute, justFocused, realMap,
}) {
  const places = data.places;
  const meta = data.categoryMeta;

  // ── 실제 답사 지도 이미지 모드 ──
  if (realMap && data.realMapImage) {
    return (
      <div style={{ position: 'relative', width: '100%', height, background: '#E6E7E2', overflow: 'hidden' }}>
        <img src={data.realMapImage} alt="항동 일대 답사 지도" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', top: 9, left: 10, display: 'flex', alignItems: 'center', gap: 5, zIndex: 5, background: 'rgba(255,255,255,0.86)', borderRadius: 9999, padding: '4px 9px' }}>
          <span style={{ width: 5, height: 5, borderRadius: 9999, background: '#2D6A4F' }} />
          <span style={{ fontFamily: 'SF Mono, ui-monospace, Menlo, monospace', fontSize: 9.5, letterSpacing: '0.04em', color: '#2D6A4F' }}>2025 답사 지도 · 항동 일대</span>
        </div>
      </div>
    );
  }

  // 활성 코스의 stop 순서/정보 매핑
  const stopByPlace = {};
  let routePts = [];
  if (activeCourse) {
    activeCourse.stops.forEach((s, i) => {
      stopByPlace[s.placeId] = { ...s, order: i + 1 };
      const p = places[s.placeId];
      if (p) routePts.push({ x: p.x, y: p.y });
    });
  }

  const selected = selectedPlaceId ? places[selectedPlaceId] : null;
  const selStop = selected ? stopByPlace[selected.id] : null;

  const pathD = routePts.length > 1
    ? routePts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    : '';

  return (
    <div style={{ position: 'relative', width: '100%', height, background: '#E6E7E2', overflow: 'hidden' }}>
      {/* ── 지도 자리 placeholder 베이스 ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#E9EAE4',
        backgroundImage:
          'linear-gradient(rgba(45,106,79,0.05) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(45,106,79,0.05) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }} />
      {/* 추상 지형: 초록 녹지(수목원/천왕산) + 물길 */}
      <div aria-hidden="true" style={{ position: 'absolute', right: '-6%', top: '-12%', width: '58%', height: '64%', background: 'radial-gradient(ellipse at 60% 40%, rgba(116,198,157,0.34), rgba(116,198,157,0) 70%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10%', bottom: '-16%', width: '52%', height: '54%', background: 'radial-gradient(ellipse at 40% 60%, rgba(116,198,157,0.22), rgba(116,198,157,0) 70%)' }} />
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M -5 88 Q 30 70 48 78 T 108 58" fill="none" stroke="rgba(74,144,217,0.20)" strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      {/* placeholder 캡션 (좌상단) */}
      <div style={{ position: 'absolute', top: 9, left: 10, display: 'flex', alignItems: 'center', gap: 5, zIndex: 5 }}>
        <span style={{ width: 5, height: 5, borderRadius: 9999, background: '#9B9B94' }} />
        <span style={{ fontFamily: 'SF Mono, ui-monospace, Menlo, monospace', fontSize: 9.5, letterSpacing: '0.04em', color: '#8A8A82' }}>지도 자리 · Kakao Maps</span>
      </div>

      {/* ── 경로선 (활성 코스) ── */}
      {showRoute && pathD && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 8, pointerEvents: 'none' }}>
          <path d={pathD} fill="none" stroke="#40916C" strokeWidth="0.7" strokeDasharray="1.6 1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2 }} />
        </svg>
      )}

      {/* ── 핀 ── */}
      {Object.values(places).map((p) => {
        const isDisabled = p.category === 'disabled';
        const inActive = !!stopByPlace[p.id];
        const visible = isDisabled || visiblePlaceIds.has(p.id);
        const dimmed = !visible || (activeCourse && !inActive);
        const order = stopByPlace[p.id]?.order;
        const color = meta[p.category].color;
        const isSel = selectedPlaceId === p.id;
        return (
          <button
            key={p.id}
            onClick={(e) => { e.stopPropagation(); isDisabled ? onComingSoon() : onSelectPlace(p.id); }}
            aria-label={`${p.name} ${isDisabled ? '준비 중' : '정보 보기'}`}
            className={justFocused && inActive ? 'pin-drop' : ''}
            style={{
              position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
              transform: 'translate(-50%, -100%)',
              border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
              zIndex: isSel ? 25 : (inActive ? 20 : 12),
              transition: 'opacity .25s',
            }}
          >
            <div style={{ position: 'relative' }}>
              <PinSVG color={color} dimmed={dimmed} />
              {order && !dimmed && (
                <span style={{
                  position: 'absolute', top: 3.5, left: '50%', transform: 'translateX(-50%)',
                  fontSize: 11, fontWeight: 700, color: color, lineHeight: 1,
                }}>{order}</span>
              )}
              {isSel && (
                <span style={{
                  position: 'absolute', left: '50%', bottom: -4, transform: 'translateX(-50%)',
                  width: 26, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.12)',
                }} />
              )}
            </div>
          </button>
        );
      })}

      {/* ── 인포윈도우 ── */}
      {selected && selected.category !== 'disabled' && (
        <InfoWindow place={selected} stop={selStop} meta={meta[selected.category]} onClose={() => onSelectPlace(null)} />
      )}

      {/* ── 범례 ── */}
      <div style={{
        position: 'absolute', bottom: 9, right: 9, zIndex: 6,
        display: 'flex', flexDirection: 'column', gap: 4,
        background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(4px)',
        borderRadius: 10, padding: '7px 9px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}>
        {['bookstore', 'market', 'nature'].map((c) => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 9999, background: meta[c].color }} />
            <span style={{ fontSize: 10.5, color: '#6B6B65', fontWeight: 500 }}>{meta[c].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.MapView = MapView;
