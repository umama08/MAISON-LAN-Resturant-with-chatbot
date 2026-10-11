import React from 'react';
import { CATEGORIES } from '../data/menuData';
import { Search } from 'lucide-react';

const MenuFilter = ({ activeCategory, onSelectCategory, searchQuery, onSearchChange }) => {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Search Input Box */}
      <div
        style={{
          maxWidth: '540px',
          margin: '0 auto 2.5rem',
          position: 'relative',
        }}
      >
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-light)',
          }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search our menu (e.g. fettuccine, croissant, coffee)..."
          style={{
            width: '100%',
            padding: '0.9rem 1.25rem 0.9rem 3.25rem',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-sans)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '2px',
            color: 'var(--text-main)',
            outline: 'none',
            boxShadow: 'var(--shadow-sm)',
            transition: 'var(--transition-smooth)',
          }}
          className="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '0.8rem',
              color: 'var(--text-light)',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              style={{
                padding: '0.6rem 1.35rem',
                fontSize: '0.825rem',
                fontWeight: isActive ? '700' : '500',
                letterSpacing: '0.05em',
                borderRadius: '2px',
                backgroundColor: isActive ? 'var(--accent-burgundy)' : 'var(--bg-cream)',
                color: isActive ? '#FFFFFF' : 'var(--text-main)',
                border: `1px solid ${isActive ? 'var(--accent-burgundy)' : 'var(--border-light)'}`,
                transition: 'var(--transition-smooth)',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuFilter;
