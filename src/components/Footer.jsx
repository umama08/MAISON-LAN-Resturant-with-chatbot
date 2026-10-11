import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = ({ onNavigate }) => {
  return (
    <footer style={{ backgroundColor: 'var(--text-main)', color: '#F4EFE6', paddingTop: '5rem', paddingBottom: '2.5rem', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Column 1: Brand */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#FAF7F2',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              MAISON ÉLAN <span style={{ color: 'var(--accent-gold)' }}>✦</span>
            </a>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'var(--accent-gold-light)',
                marginBottom: '1.5rem',
              }}
            >
              “A Taste of Paris, Made for You.”
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(244, 239, 230, 0.7)', lineHeight: 1.7, maxWidth: '280px' }}>
              A modern Parisian bistro bringing refined European dining, freshly churned pastries, and cozy café culture to Karachi.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: 'var(--accent-gold)',
                marginBottom: '1.25rem',
                letterSpacing: '0.05em',
              }}
            >
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'home', label: 'Home' },
                { id: 'menu', label: 'Menu' },
                { id: 'about', label: 'Our Story' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    style={{
                      color: 'rgba(244, 239, 230, 0.8)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--accent-gold)')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(244, 239, 230, 0.8)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visit Us & Hours */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: 'var(--accent-gold)',
                marginBottom: '1.25rem',
                letterSpacing: '0.05em',
              }}
            >
              Visit Us & Hours
            </h4>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'rgba(244, 239, 230, 0.8)' }}>
              <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>Main Boulevard, Karachi, Pakistan</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(244, 239, 230, 0.8)' }}>
              <Clock size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <p style={{ marginBottom: '0.25rem' }}>
                  <strong>Mon – Thu:</strong> 11:00 AM – 11:00 PM
                </p>
                <p>
                  <strong>Fri – Sun:</strong> 11:00 AM – 12:00 AM
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: 'var(--accent-gold)',
                marginBottom: '1.25rem',
                letterSpacing: '0.05em',
              }}
            >
              Connect
            </h4>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'rgba(244, 239, 230, 0.8)' }}>
              <Phone size={16} style={{ color: 'var(--accent-gold)' }} />
              <a href="tel:+923001234567" style={{ color: 'inherit', textDecoration: 'none' }}>
                +92 300 1234567
              </a>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'rgba(244, 239, 230, 0.8)' }}>
              <Mail size={16} style={{ color: 'var(--accent-gold)' }} />
              <a href="mailto:hello@maisonelan.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                hello@maisonelan.com
              </a>
            </div>

            <div style={{ display: 'flex', gap: '1rem', color: 'var(--accent-gold)' }}>
              <a href="#instagram" aria-label="Instagram" style={{ color: 'inherit' }}>
                <InstagramIcon size={20} />
              </a>
              <a href="#facebook" aria-label="Facebook" style={{ color: 'inherit' }}>
                <FacebookIcon size={20} />
              </a>
              <a href="#tiktok" aria-label="TikTok" style={{ color: 'inherit' }}>
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(244, 239, 230, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.825rem',
            color: 'rgba(244, 239, 230, 0.5)',
          }}
        >
          <p>© 2026 Maison Élan. All Rights Reserved.</p>
          <p>A Taste of Paris, Made for You.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
