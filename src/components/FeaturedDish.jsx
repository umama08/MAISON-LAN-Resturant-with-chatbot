import React from 'react';
import SectionHeading from './SectionHeading';
import MenuCard from './MenuCard';
import { MENU_ITEMS } from '../data/menuData';

const FeaturedDish = ({ onAddToCart, onViewFullMenu }) => {
  // Filter signatures
  const signatureItems = MENU_ITEMS.filter((item) => item.isSignature).slice(0, 4);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="CHEF'S SELECTION"
          title="Our Signatures"
          subtitle="A few favorites from our kitchen, crafted with timeless European technique and fresh local ingredients."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {signatureItems.map((dish) => (
            <MenuCard key={dish.id} item={dish} onAddToCart={onAddToCart} />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onViewFullMenu} className="btn-primary">
            Explore Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDish;
