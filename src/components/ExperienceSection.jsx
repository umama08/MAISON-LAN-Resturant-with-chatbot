import React from 'react';
import SectionHeading from './SectionHeading';

const ExperienceSection = () => {
  const experiences = [
    {
      number: '01',
      title: 'Freshly Prepared',
      description: 'Every dish is prepared to order using carefully selected ingredients.',
    },
    {
      number: '02',
      title: 'European Inspired',
      description: 'Classic French and European flavors interpreted for a modern palate.',
    },
    {
      number: '03',
      title: 'Made for Moments',
      description: 'Whether it is coffee with friends or dinner for two, every visit should feel special.',
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="OUR PHILOSOPHY"
          title="The Maison Élan Experience"
          subtitle="Crafting quiet moments of elegance through warm European hospitality."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginTop: '3rem',
          }}
        >
          {experiences.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.5rem',
                  fontWeight: '400',
                  color: 'var(--accent-gold)',
                  display: 'block',
                  lineHeight: 1,
                  marginBottom: '1rem',
                }}
              >
                {item.number}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--text-main)',
                  marginBottom: '0.75rem',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
