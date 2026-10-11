import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Calendar } from 'lucide-react';

const Navbar = ({ activePage, setActivePage, cartCount, onOpenCart, onOpenReservation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`navbar-header ${scrolled || activePage !== 'home' ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="nav-brand"
          >
            MAISON ÉLAN <span>✦</span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="nav-actions">
            <button
              onClick={onOpenReservation}
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.75rem' }}
            >
              <Calendar size={15} />
              <span>Reserve a Table</span>
            </button>

            <button
              onClick={onOpenCart}
              className="cart-icon-btn"
              aria-label="View Order Bag"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-nav-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`mobile-menu-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <span className="nav-brand" style={{ fontSize: '1.3rem' }}>MAISON ÉLAN ✦</span>
          <button onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)' }}>
            <X size={24} />
          </button>
        </div>

        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="mobile-nav-link"
                style={{
                  color: activePage === item.id ? 'var(--accent-burgundy)' : 'var(--text-main)',
                  fontWeight: activePage === item.id ? '700' : '400'
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReservation();
            }}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            <Calendar size={16} />
            <span>Reserve a Table</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
