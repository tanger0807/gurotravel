// modal.jsx — CourseModal: 타임라인 바텀시트 + 스탬프 + 총비용
function CourseModal({ course, data, onClose, onJumpToMap }) {
  const places = data.places;
  const meta = data.categoryMeta;

  React.useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div onClick={onClose} className="dim-in" style={{
      position: 'absolute', inset: 0, zIndex: 90,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div onClick={(e) => e.stopPropagation()} className="sheet-up scrollbar-hide" style={{
        background: '#FFFFFF', width: '100%',
        borderTopLeftRadius: 22, borderTopRightRadius: 22,
        maxHeight: '88%', overflowY: 'auto',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.12)',
      }}>
        {/* 손잡이 + 대표 이미지 헤더 */}
        <div style={{ position: 'relative' }}>
          <Photo tone={REGION_TONE[course.region] || 'nature'} src={course.coverImage} alt={course.name} style={{ height: 132, borderTopLeftRadius: 22, borderTopRightRadius: 22 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,28,22,0.55), transparent 60%)', borderTopLeftRadius: 22, borderTopRightRadius: 22, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 38, height: 4, borderRadius: 9999, background: 'rgba(255,255,255,0.7)' }} />
          <button onClick={onClose} aria-label="닫기" style={{
            position: 'absolute', top: 11, right: 11, width: 30, height: 30, borderRadius: 9999,
            border: 'none', background: 'rgba(0,0,0,0.32)', color: '#fff', cursor: 'pointer',
            fontSize: 14, backdropFilter: 'blur(2px)',
          }}>✕</button>
          <div style={{ position: 'absolute', left: 16, bottom: 12, right: 16 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <span style={{ background: 'rgba(255,255,255,0.93)', color: '#2D6A4F', fontSize: 11.5, fontWeight: 600, padding: '4px 9px', borderRadius: 9999 }}>{course.region}</span>
              <span style={{ background: 'rgba(0,0,0,0.32)', color: '#fff', fontSize: 11.5, fontWeight: 500, padding: '4px 9px', borderRadius: 9999 }}>{THEME_LABEL[course.theme]}</span>
            </div>
          </div>
        </div>

        {/* 타이틀 블록 */}
        <div style={{ padding: '14px 18px 4px' }}>
          <h2 id="modal-title" className="font-serif" style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 600, color: '#1C1C1A', lineHeight: 1.32 }}>{course.name}</h2>
          <p style={{ margin: '0 0 10px', fontSize: 13.5, color: '#6B6B65', lineHeight: 1.7 }}>{course.summary}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <TargetBadge target={course.target} />
            <span style={{ fontSize: 13, color: '#6B6B65' }}>⏱ {fmtHours(course.totalMinutes)}</span>
            {course.stamps > 0 && (
              <span style={{ fontSize: 12.5, color: '#C45B38', fontWeight: 500 }}>◉ 스탬프 {course.stamps}곳</span>
            )}
          </div>
        </div>

        {/* 타임라인 */}
        <ol style={{ listStyle: 'none', margin: 0, padding: '14px 18px 6px' }}>
          {course.stops.map((stop, i) => {
            const p = places[stop.placeId];
            const m = meta[p.category];
            const isLast = i === course.stops.length - 1;
            return (
              <li key={i} style={{ display: 'flex', gap: 12 }}>
                {/* 순서 + 라인 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 30 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 9999, background: m.color, color: '#fff',
                    fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{i + 1}</span>
                  {!isLast && <div style={{ width: 2, flex: 1, minHeight: 26, background: '#E3E6E1', marginTop: 2 }} />}
                </div>
                {/* 내용 */}
                <div style={{ flex: 1, paddingBottom: isLast ? 4 : 18 }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                        <h3 className="font-serif" style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1C1C1A' }}>{p.name}</h3>
                        <span style={{ fontSize: 12, color: '#9B9B94', whiteSpace: 'nowrap' }}>{stop.arrival}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 0 5px' }}>
                        <span style={{ width: 6, height: 6, borderRadius: 9999, background: m.color }} />
                        <span style={{ fontSize: 11, fontWeight: 500, color: m.color }}>{m.label}</span>
                      </div>
                      <p style={{ margin: '0 0 7px', fontSize: 13, color: '#6B6B65', lineHeight: 1.6 }}>{p.activity}</p>
                    </div>
                    {p.photos && p.photos[0] && (
                      <img src={p.photos[0]} alt={p.name} loading="lazy" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10, flexShrink: 0, border: '1px solid rgba(0,0,0,0.06)' }} />
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: '#9B9B94' }}>⏱ {stop.durationMin}분</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: '#2D6A4F' }}>{stop.costKRW === 0 ? '무료' : `약 ${stop.costKRW.toLocaleString()}원`}</span>
                    {stop.stampNumber && (
                      <span style={{ background: '#E8F5F0', color: '#2D6A4F', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 9999 }}>스탬프 {stop.stampNumber}번</span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* 총비용 + 지도 보기 (sticky 하단) */}
        <div style={{
          position: 'sticky', bottom: 0, background: '#fff',
          borderTop: '1px solid rgba(0,0,0,0.06)', padding: '12px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 11.5, color: '#9B9B94' }}>1인 예상 총비용</p>
            <p style={{ margin: 0, fontSize: 19, fontWeight: 600, color: '#2D6A4F' }}>{course.totalCostKRW.toLocaleString()}원</p>
          </div>
          <button onClick={() => onJumpToMap(course)} style={{
            background: '#2D6A4F', color: '#fff', border: 'none', borderRadius: 12,
            padding: '11px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>지도에서 보기</button>
        </div>
      </div>
    </div>
  );
}

window.CourseModal = CourseModal;
