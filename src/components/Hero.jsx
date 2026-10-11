import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const Hero = ({ onExploreMenu, onReserveTable }) => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7rem 1.5rem 4rem',
        backgroundImage: 'linear-gradient(to bottom, rgba(28, 21, 18, 0.4), rgba(28, 21, 18, 0.7)), url("https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#FFFFFF',
        textAlign: 'center',
      }}
    >
      {/* Decorative frame overlay */}
      <div
        style={{
          position: 'absolute',
          inset: '2rem',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '840px' }}>
        <span
          className="eyebrow-text"
          style={{ color: '#E8D8B6', letterSpacing: '0.3em', fontSize: '0.8rem', marginBottom: '1.25rem' }}
        >
          PARISIAN FLAVORS • MODERN EUROPEAN SOUL
        </span>

        <h1
          className="heading-display"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.75rem, 6vw, 5.25rem)',
            color: '#FAF7F2',
            marginBottom: '1.5rem',
            lineHeight: 1.08,
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          “A Taste of Paris, <br />
          Made for You.”
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#F4EFE6',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Discover beautifully crafted dishes inspired by French cafés and European kitchens,
          served with warmth, character, and a little <em>joie de vivre</em>.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          <button
            onClick={onExploreMenu}
            className="btn-primary"
            style={{
              backgroundColor: 'var(--accent-burgundy)',
              padding: '1rem 2.25rem',
              fontSize: '0.9rem',
            }}
          >
            <span>Explore Our Menu</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onReserveTable}
            className="btn-secondary"
            style={{
              borderColor: '#FAF7F2',
              color: '#FAF7F2',
              padding: '1rem 2.25rem',
              fontSize: '0.9rem',
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Calendar size={16} />
            <span>Reserve a Table</span>
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            color: '#C5A059',
            fontSize: '0.875rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          <span style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #C5A059)' }} />
          ✦ Est. 2026 ✦
          <span style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #C5A059, transparent)' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
