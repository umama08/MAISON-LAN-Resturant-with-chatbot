import React from 'react';
import SectionHeading from './SectionHeading';
import { REVIEWS } from '../data/menuData';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="GUEST REFLECTIONS"
          title="Words From Our Guests"
          subtitle="Real experiences shared by visitors who found a little piece of Paris at Maison Élan."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2.5rem',
          }}
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: '4px',
                padding: '2.25rem 2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.15, color: 'var(--accent-burgundy)' }}>
                <Quote size={48} />
              </div>

              <div>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    fontStyle: 'italic',
                    color: 'var(--text-main)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  “{review.quote}”
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--accent-burgundy)' }}>
                  — {review.author}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', letterSpacing: '0.05em' }}>
                  {review.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
