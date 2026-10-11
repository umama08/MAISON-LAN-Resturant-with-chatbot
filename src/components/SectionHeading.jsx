import React from 'react';

const SectionHeading = ({ eyebrow, title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`} style={{ textAlign: centered ? 'center' : 'left' }}>
      {eyebrow && <span className="eyebrow-text">{eyebrow}</span>}
      {title && <h2 className="heading-section mb-3">{title}</h2>}
      <div className="divider-ornament">✦</div>
      {subtitle && (
        <p className="text-muted max-w-2xl mx-auto" style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: centered ? '0 auto' : '0' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
