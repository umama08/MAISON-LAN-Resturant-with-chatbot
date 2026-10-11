import React, { useState, useMemo } from 'react';
import SectionHeading from '../components/SectionHeading';
import MenuFilter from '../components/MenuFilter';
import MenuCard from '../components/MenuCard';
import { MENU_ITEMS } from '../data/menuData';

const Menu = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;

      // Search query check
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '80vh' }}>
      <div className="container">
        <SectionHeading
          eyebrow="LA CARTE PARISIENNE"
          title="Our Complete Menu"
          subtitle="Explore our full selection of freshly baked croissants, hand-rolled pasta, European plates, and specialty coffee."
        />

        <MenuFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Results Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <span>
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'dish' : 'dishes'}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </span>
          {(activeCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              style={{ color: 'var(--accent-burgundy)', fontWeight: '600', fontSize: '0.85rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '4px',
              margin: '2rem 0',
            }}
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              No dishes found
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              We couldn't find anything matching your search. Try searching for "fettuccine", "croissant", or "tart".
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="btn-secondary"
            >
              View Full Menu
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
