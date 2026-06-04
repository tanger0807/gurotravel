// cards.jsx — Badge, ThemeTabs, CourseCard(3 variants), ComingSoonCard

const TARGET_META = {
  solo:   { label: '1인 여행', bg: '#E8F5F0', fg: '#2D6A4F' },
  couple: { label: '커플',     bg: '#FEF0EB', fg: '#C45B38' },
  family: { label: '가족',     bg: '#EEF2FE', fg: '#3B54C2' },
};
const THEME_LABEL = { literary: '문학 기행', healing: '힐링 산책' };

function fmtHours(min) {
  const h = min / 60;
  const lo = Math.floor(h);
  const hi = Math.ceil(h);
  return lo === hi ? `약 ${lo}시간` : `${lo}~${hi}시간`;
}

function TargetBadge({ target }) {
  const m = TARGET_META[target];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
      borderRadius: 9999, fontSize: 12, fontWeight: 500,
      background: m.bg, color: m.fg,
    }}>{m.label}</span>
  );
}

function MetaLine({ course, className = '' }) {
  return (
    <p className={className} style={{ margin: 0, fontSize: 13, color: '#6B6B65' }}>
      <span style={{ whiteSpace: 'nowrap' }}>⏱ {fmtHours(course.totalMinutes)}</span>
      <span style={{ margin: '0 6px', color: '#D6D6CF' }}>·</span>
      <span style={{ whiteSpace: 'nowrap' }}>1인 약 {course.totalCostKRW.toLocaleString()}원</span>
    </p>
  );
}

function StampPip({ count }) {
  if (!count) return null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 500,
      color: '#C45B38', background: '#FEF0EB', padding: '3px 8px', borderRadius: 9999,
    }}>
      <span style={{ fontSize: 11 }}>◉</span> 스탬프 {count}
    </span>
  );
}

const REGION_TONE = { '오류동': 'bookstore', '항동': 'nature' };

function CourseCard({ course, layout, onOpen }) {
  const tone = REGION_TONE[course.region] || 'nature';
  const cap = `${course.region} 대표 컷`;

  // ── overlay: 이미지 위 텍스트 ──
  if (layout === 'overlay') {
    return (
      <article role="button" tabIndex={0} onClick={onOpen}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
        className="fade-up"
        style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
          border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <Photo tone={tone} src={course.coverImage} alt={course.name} caption={cap} style={{ height: 184 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,28,22,0.82) 0%, rgba(20,28,22,0.30) 42%, transparent 72%)' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <span style={{ background: 'rgba(255,255,255,0.92)', color: '#2D6A4F', fontSize: 11.5, fontWeight: 600, padding: '4px 9px', borderRadius: 9999 }}>{course.region}</span>
          <span style={{ background: 'rgba(0,0,0,0.35)', color: '#fff', fontSize: 11.5, fontWeight: 500, padding: '4px 9px', borderRadius: 9999, backdropFilter: 'blur(2px)' }}>{THEME_LABEL[course.theme]}</span>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 14px 13px' }}>
          <h3 className="font-serif" style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 600, color: '#fff', lineHeight: 1.28 }}>{course.name}</h3>
          <p style={{ margin: '0 0 9px', fontSize: 12.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>{course.tagline}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.92)' }}>⏱ {fmtHours(course.totalMinutes)} · {course.totalCostKRW.toLocaleString()}원</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>자세히 →</span>
          </div>
        </div>
      </article>
    );
  }

  // ── compact: 좌측 썸네일 + 정보 밀도형 ──
  if (layout === 'compact') {
    return (
      <article role="button" tabIndex={0} onClick={onOpen}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
        className="fade-up"
        style={{ display: 'flex', gap: 12, background: '#fff', borderRadius: 14, padding: 10,
          border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
        <Photo tone={tone} src={course.coverImage} alt={course.name} style={{ width: 92, height: 92, borderRadius: 10, flexShrink: 0 }}>
          <span style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(255,255,255,0.92)', color: '#2D6A4F', fontSize: 10.5, fontWeight: 600, padding: '2px 7px', borderRadius: 9999 }}>{course.region}</span>
        </Photo>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 11.5, fontWeight: 500, color: '#40916C' }}>{THEME_LABEL[course.theme]}</span>
          </div>
          <h3 className="font-serif" style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: '#1C1C1A', lineHeight: 1.3 }}>{course.name}</h3>
          <MetaLine course={course} />
          <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <TargetBadge target={course.target} />
            <StampPip count={course.stamps} />
          </div>
        </div>
      </article>
    );
  }

  // ── visual (기본): 큰 이미지 + 정보 ──
  return (
    <article role="button" tabIndex={0} onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
      className="fade-up"
      style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
        border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <Photo tone={tone} src={course.coverImage} alt={course.name} style={{ height: 152 }}>
        <div style={{ position: 'absolute', top: 11, left: 11, display: 'flex', gap: 6, zIndex: 2 }}>
          <span style={{ background: 'rgba(255,255,255,0.93)', color: '#2D6A4F', fontSize: 11.5, fontWeight: 600, padding: '4px 9px', borderRadius: 9999 }}>{course.region}</span>
          <span style={{ background: 'rgba(0,0,0,0.32)', color: '#fff', fontSize: 11.5, fontWeight: 500, padding: '4px 9px', borderRadius: 9999, backdropFilter: 'blur(2px)' }}>{THEME_LABEL[course.theme]}</span>
        </div>
      </Photo>
      <div style={{ padding: '13px 14px 14px' }}>
        <h3 className="font-serif" style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 600, color: '#1C1C1A', lineHeight: 1.3 }}>{course.name}</h3>
        <p style={{ margin: '0 0 9px', fontSize: 12.5, color: '#9B9B94', lineHeight: 1.5 }}>{course.tagline}</p>
        <MetaLine course={course} style={{ marginBottom: 11 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <TargetBadge target={course.target} />
            <StampPip count={course.stamps} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#2D6A4F', whiteSpace: 'nowrap' }}>자세히 →</span>
        </div>
      </div>
    </article>
  );
}

function ComingSoonCard({ data, layout, onClick }) {
  const cs = data.comingSoon;
  const horizontal = layout === 'compact';
  return (
    <article onClick={onClick} aria-label="온수동 코스 — 준비 중"
      className="fade-up"
      style={{
        display: horizontal ? 'flex' : 'block', gap: 12, alignItems: 'center',
        background: '#F3F3F0', borderRadius: 14, overflow: 'hidden',
        border: '1px dashed rgba(0,0,0,0.12)', cursor: 'pointer', padding: horizontal ? 10 : 0,
      }}>
      <div style={{
        width: horizontal ? 92 : '100%', height: horizontal ? 92 : 96,
        borderRadius: horizontal ? 10 : 0, flexShrink: 0,
        background: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.035) 0 2px, transparent 2px 12px), #E9E9E4',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'SF Mono, ui-monospace, monospace', fontSize: 10.5, color: '#BCBCB5' }}>사진 준비 중</span>
      </div>
      <div style={{ padding: horizontal ? 0 : '12px 14px 14px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
          <h3 className="font-serif" style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#BCBCB5' }}>{cs.name}</h3>
          <span style={{ fontSize: 11, fontWeight: 500, background: '#E4E4DE', color: '#9B9B94', padding: '2px 8px', borderRadius: 9999 }}>Coming Soon</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#BCBCB5' }}>{cs.note}</p>
      </div>
    </article>
  );
}

function ThemeTabs({ themes, active, onChange }) {
  return (
    <div className="scrollbar-hide" role="tablist" aria-label="여행 테마 필터"
      style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px' }}>
      {themes.map((t) => {
        const on = active === t.id;
        return (
          <button key={t.id} role="tab" aria-selected={on} onClick={() => onChange(t.id)}
            style={{
              flexShrink: 0, whiteSpace: 'nowrap', cursor: 'pointer',
              borderRadius: 9999, padding: '7px 15px', fontSize: 13, fontWeight: 500,
              border: on ? '1.5px solid transparent' : '1.5px solid rgba(0,0,0,0.08)',
              background: on ? '#2D6A4F' : 'transparent',
              color: on ? '#fff' : '#6B6B65',
              transition: 'all .16s',
            }}>{t.label}</button>
        );
      })}
    </div>
  );
}

Object.assign(window, { CourseCard, ComingSoonCard, ThemeTabs, TargetBadge, fmtHours, THEME_LABEL, TARGET_META });
