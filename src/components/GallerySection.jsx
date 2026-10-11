import React from 'react';
import SectionHeading from './SectionHeading';
import { GALLERY_IMAGES } from '../data/menuData';

const InstagramIcon = ({ size = 24, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GallerySection = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="PARISIAN SNAPSHOTS"
          title="A Glimpse Into Maison Élan"
          subtitle="Explore the flavors, textures, and intimate bistro moments captured daily."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginTop: '2.5rem',
          }}
        >
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                height: '300px',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              className="gallery-item-container"
            >
              <img
                src={img.url}
                alt={img.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="gallery-img"
              />

              {/* Hover overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(42, 33, 29, 0.75)',
                  backdropFilter: 'blur(2px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  padding: '1.5rem',
                  textAlign: 'center',
                }}
                className="gallery-overlay"
              >
                <InstagramIcon size={28} style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                  {img.title}
                </h4>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-gold-light)' }}>
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Hover styles for gallery */}
        <style>{`
          .gallery-item-container:hover .gallery-img {
            transform: scale(1.08);
          }
          .gallery-item-container:hover .gallery-overlay {
            opacity: 1 !important;
          }
        `}</style>
      </div>
    </section>
  );
};

export default GallerySection;
