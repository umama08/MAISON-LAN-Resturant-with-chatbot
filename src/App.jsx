import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './components/Cart';
import ReservationForm from './components/ReservationForm';
import ToastNotification from './components/ToastNotification';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { X } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Show temporary toast notification
  const showToast = (name) => {
    setToast({ name });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Add individual dish to cart
  const handleAddToCart = (dish) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === dish.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
    showToast(dish.name);
  };

  // Add L'Offre Maison set offer to cart
  const handleAddSpecialOffer = (offer) => {
    const offerItem = {
      id: 'special-offer-maison',
      name: offer.title,
      category: 'Special Combo',
      price: offer.price,
      image: offer.image,
      quantity: 1,
    };

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === offerItem.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === offerItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, offerItem];
    });

    showToast(offer.title);
    setIsCartOpen(true);
  };

  // Update Item Quantity
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Remove Item
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Total cart items count badge
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Page Routing View */}
      <div style={{ flexGrow: 1 }}>
        {activePage === 'home' && (
          <Home
            onNavigate={setActivePage}
            onAddToCart={handleAddToCart}
            onAddSpecialOffer={handleAddSpecialOffer}
            onOpenReservation={() => setIsReservationOpen(true)}
          />
        )}
        {activePage === 'menu' && (
          <Menu onAddToCart={handleAddToCart} />
        )}
        {activePage === 'about' && (
          <About
            onExploreMenu={() => setActivePage('menu')}
            onReserveTable={() => setIsReservationOpen(true)}
          />
        )}
        {activePage === 'contact' && (
          <Contact />
        )}
      </div>

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Reservation Modal (when invoked from header button) */}
      {isReservationOpen && (
        <div className="modal-overlay" onClick={() => setIsReservationOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '720px', padding: '2rem 1.5rem', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
              <button
                onClick={() => setIsReservationOpen(false)}
                style={{ color: 'var(--text-main)', padding: '0.25rem' }}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <ReservationForm />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ToastNotification toast={toast} />

      {/* Floating Chatbot Widget (Frontend UI Demo) */}
      <Chatbot />

      {/* Footer */}
      <Footer onNavigate={setActivePage} />
    </div>
  );
}

export default App;
