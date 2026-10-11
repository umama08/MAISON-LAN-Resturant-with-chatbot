import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';

const ToastNotification = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="toast-msg">
        <Check size={18} style={{ color: 'var(--accent-gold)' }} />
        <span>
          <strong>{toast.name}</strong> added to your order.
        </span>
      </div>
    </div>
  );
};

export default ToastNotification;
