// Photo — 실제 답사 사진 우선, 없으면 브랜드 톤 플레이스홀더
const PHOTO_TONES = {
  bookstore: ['#2D6A4F', '#40916C'],
  market:    ['#E8915F', '#F4A579'],
  nature:    ['#4A90D9', '#6BA8E2'],
  hero:      ['#2D6A4F', '#3E7E62'],
  warm:      ['#C9A66B', '#D8BC8C'],
};

function Photo({ tone = 'nature', src, alt, caption, className = '', style = {}, children, rounded, overlay }) {
  const [a, b] = PHOTO_TONES[tone] || PHOTO_TONES.nature;
  const base = {
    position: 'relative', overflow: 'hidden',
    borderRadius: rounded,
    ...style,
  };

  if (src) {
    return (
      <div className={className} style={{ ...base, backgroundColor: a }}>
        <img src={src} alt={alt || caption || ''} loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {overlay && <div style={{ position: 'absolute', inset: 0, background: overlay }} />}
        {children}
      </div>
    );
  }

  return (
    <div
      className={`ph ${className}`}
      style={{
        ...base,
        '--ph-base': a,
        backgroundColor: a,
        backgroundImage:
          `repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0 2px, transparent 2px 11px),` +
          `linear-gradient(150deg, ${a} 0%, ${b} 100%)`,
      }}
    >
      {caption && (
        <div style={{ position: 'absolute', left: 10, bottom: 9, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: 9999, background: 'rgba(255,255,255,0.75)', display: 'inline-block' }} />
          <span className="ph-cap">{caption}</span>
        </div>
      )}
      {children}
    </div>
  );
}

window.Photo = Photo;
window.PHOTO_TONES = PHOTO_TONES;
