import React from 'react';
import { SPECIAL_OFFER } from '../data/menuData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const SpecialOffer = ({ onAddSpecialOffer }) => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--accent-burgundy)', color: '#FFFFFF' }}>
      <div className="container">
        <div className="editorial-grid" style={{ alignItems: 'center' }}>
          {/* Image side */}
          <div className="editorial-img-frame" style={{ borderColor: 'var(--accent-gold)' }}>
            <img
              src={SPECIAL_OFFER.image}
              alt="L'Offre Maison Parisian bistro dining experience for two"
              className="editorial-img"
            />
          </div>

          {/* Text side */}
          <div>
            <span
              className="eyebrow-text"
              style={{ color: 'var(--accent-gold)', letterSpacing: '0.25em' }}
            >
              PARISIAN SET COMBO
            </span>

            <h2
              className="heading-section"
              style={{ color: '#FAF7F2', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}
            >
              {SPECIAL_OFFER.title}
            </h2>

            <p
              style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--accent-gold-light)',
                marginBottom: '1.5rem',
              }}
            >
              {SPECIAL_OFFER.subtitle}
            </p>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                padding: '1.5rem',
                borderRadius: '2px',
                marginBottom: '2rem',
              }}
            >
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {SPECIAL_OFFER.details.map((detail, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', color: '#F4EFE6' }}>
                    <CheckCircle2 size={18} color="var(--accent-gold)" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px rgba(255,255,255,0.15) solid',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-sans)', color: '#FFFFFF' }}>
                  Rs. {SPECIAL_OFFER.price.toLocaleString()}
                </span>
                <span style={{ fontSize: '1.1rem', textDecoration: 'line-through', color: 'rgba(255,255,255,0.5)' }}>
                  Rs. {SPECIAL_OFFER.regularPrice.toLocaleString()}
                </span>
                <span
                  style={{
                    backgroundColor: 'var(--accent-gold)',
                    color: 'var(--accent-burgundy)',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '2px',
                    marginLeft: 'auto',
                    textTransform: 'uppercase',
                  }}
                >
                  Save Rs. 400
                </span>
              </div>
            </div>

            <button
              onClick={() => onAddSpecialOffer(SPECIAL_OFFER)}
              className="btn-outline-gold"
              style={{ padding: '1rem 2.25rem' }}
            >
              <Sparkles size={16} />
              <span style={{ marginLeft: '0.5rem' }}>Discover & Order Offer</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
