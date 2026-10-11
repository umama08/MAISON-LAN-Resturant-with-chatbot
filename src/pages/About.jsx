import React from 'react';
import SectionHeading from '../components/SectionHeading';
import ExperienceSection from '../components/ExperienceSection';
import GallerySection from '../components/GallerySection';

const About = ({ onExploreMenu, onReserveTable }) => {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container">
        <SectionHeading
          eyebrow="NOTRE HISTOIRE"
          title="Our Story"
          subtitle="Discover the philosophy, passion, and Parisian roots behind Maison Élan."
        />

        {/* Main Editorial Story Section */}
        <div className="editorial-grid" style={{ gap: '4rem', marginBottom: '6rem', alignItems: 'center' }}>
          <div>
            <span className="eyebrow-text">SINCE 2026</span>
            <h2 className="heading-section" style={{ fontSize: '2.25rem', marginBottom: '1.5rem' }}>
              “Bringing Parisian Café Culture to the Heart of the City.”
            </h2>
            <div className="divider-ornament" style={{ justifyContent: 'flex-start', margin: '1rem 0 1.5rem' }}>
              ✦
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Maison Élan was created from a simple idea: bring the warmth and charm of a European café to the heart of the city.
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Inspired by the cafés of Paris, the bistros of Lyon and the relaxed dining culture of Europe, Maison Élan combines familiar comfort with thoughtful ingredients and modern presentation.
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-cream)',
                borderLeft: '4px solid var(--accent-burgundy)',
                padding: '1.5rem',
                margin: '2rem 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  fontStyle: 'italic',
                  color: 'var(--accent-burgundy)',
                  lineHeight: 1.5,
                }}
              >
                “Good food should never feel ordinary.”
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={onExploreMenu} className="btn-primary">
                Explore Menu
              </button>
              <button onClick={onReserveTable} className="btn-secondary">
                Reserve Table
              </button>
            </div>
          </div>

          <div className="editorial-img-frame">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"
              alt="Maison Élan French bistro interior dining room"
              className="editorial-img"
              style={{ maxHeight: '560px' }}
            />
          </div>
        </div>

        {/* Experience Section */}
        <ExperienceSection />

        {/* Photo Gallery Grid */}
        <GallerySection />
      </div>
    </div>
  );
};

export default About;
