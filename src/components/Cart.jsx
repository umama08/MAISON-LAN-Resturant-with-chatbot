import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const DELIVERY_FEE = 150;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = cartItems.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
    }, 200);
  };

  const handleClose = () => {
    setCheckoutComplete(false);
    onClose();
  };

  return (
    <>
      {/* Drawer Overlay */}
      <div className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose} />

      {/* Drawer Panel */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingBag size={22} color="var(--accent-burgundy)" />
            <h3 className="cart-title">Votre Panier</h3>
          </div>
          <button onClick={handleClose} className="cart-close-btn" aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        {checkoutComplete ? (
          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: 'rgba(107, 29, 47, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-burgundy)',
                marginBottom: '1.5rem',
              }}
            >
              <CheckCircle size={40} />
            </div>
            <h3 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              Merci! Your order has been received.
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Our Parisian kitchen is preparing your dishes with care. Estimated arrival in 35-45 minutes.
            </p>
            <button onClick={handleClose} className="btn-primary">
              Continue Browsing
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <ShoppingBag size={48} style={{ color: 'var(--border-strong)', marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Your bag is currently empty
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Explore our Parisian menu to add croissants, pasta, or coffee.
            </p>
            <button onClick={handleClose} className="btn-secondary">
              Discover Menu
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="cart-items-container">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  
                  <div className="cart-item-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 className="cart-item-name">{item.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ color: 'var(--text-light)', padding: '0.2rem' }}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-item-price">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>

                    <div className="cart-item-qty">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-count">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer Summary */}
            <div className="cart-footer">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="cart-summary-row">
                <span>Delivery Fee</span>
                <span>Rs. {DELIVERY_FEE.toLocaleString()}</span>
              </div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span style={{ color: 'var(--accent-burgundy)' }}>Rs. {total.toLocaleString()}</span>
              </div>

              <button onClick={handleCheckout} className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
