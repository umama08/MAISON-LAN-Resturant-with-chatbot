import React from 'react';

const AboutSection = ({ onReadMore }) => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <div className="container">
        <div className="editorial-grid">
          {/* Content Column */}
          <div style={{ paddingRight: '1rem' }}>
            <span className="eyebrow-text">BIENVENUE À MAISON ÉLAN</span>
            <h2 className="heading-section" style={{ marginBottom: '1.5rem', lineHeight: 1.2 }}>
              “Where Every Meal Becomes a Little Occasion.”
            </h2>
            <div className="divider-ornament" style={{ justifyContent: 'flex-start', margin: '1rem 0 1.5rem' }}>
              ✦
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              At Maison Élan, we believe dining should be more than simply satisfying hunger. From buttery
              croissants and delicate pastries to creamy pasta and beautifully prepared European classics, every plate
              is created to make ordinary moments feel special.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
              “Good food should never feel ordinary. It should transport you straight to a quiet sidewalk bistro in Paris.”
            </p>
            
            {onReadMore && (
              <button onClick={onReadMore} className="btn-secondary">
                Our Full Story
              </button>
            )}
          </div>

          {/* Image Column - Editorial Layout */}
          <div style={{ position: 'relative' }}>
            <div className="editorial-img-frame">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80"
                alt="Freshly baked French croissants at Maison Élan"
                className="editorial-img"
              />
            </div>
            {/* Floating Editorial Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                left: '-1.5rem',
                backgroundColor: 'var(--bg-cream)',
                border: '1px solid var(--border-subtle)',
                padding: '1.25rem 1.75rem',
                boxShadow: 'var(--shadow-md)',
                maxWidth: '220px',
                borderRadius: '2px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-burgundy)', marginBottom: '0.25rem' }}>
                Handcrafted Daily
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Fresh pastries, churned butter & French herbs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
