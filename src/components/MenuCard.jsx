import React from 'react';
import { Star, Plus } from 'lucide-react';

const MenuCard = ({ item, onAddToCart }) => {
  return (
    <div className="menu-card">
      <div className="menu-card-img-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="menu-card-img"
          loading="lazy"
        />
        {item.isSignature && (
          <span
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              backgroundColor: 'var(--accent-burgundy)',
              color: '#FFFFFF',
              fontSize: '0.65rem',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.75rem',
              borderRadius: '2px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            ✦ Signature
          </span>
        )}
      </div>

      <div className="menu-card-body">
        <div className="menu-card-header">
          <span className="menu-card-category">{item.category}</span>
          <div className="menu-card-rating">
            <Star className="star-icon" size={14} />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        </div>

        <h3 className="menu-card-title">{item.name}</h3>
        <p className="menu-card-desc">{item.description}</p>

        <div className="menu-card-footer">
          <span className="menu-card-price">Rs. {item.price.toLocaleString()}</span>
          <button
            onClick={() => onAddToCart(item)}
            className="btn-add"
            aria-label={`Add ${item.name} to order`}
          >
            <Plus size={15} />
            <span>Add to Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
