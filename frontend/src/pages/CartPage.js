import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ cart, onUpdateQuantity, onRemoveItem, loading }) => {
  const navigate = useNavigate();
  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <div className="loading-spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container-page">
        <div className="cart-header">
          <h1 className="cart-page-title">Shopping Cart</h1>
          <p className="cart-item-count">
            {isEmpty ? 'Your cart is empty' : `${cart.items.length} item${cart.items.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {isEmpty ? (
          <div className="empty-cart-state">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              {cart.items.map((item) => (
                <div key={item._id} className="cart-item-card">
                  <div className="item-image-wrapper">
                    <img src={item.image} alt={item.name} className="item-image" />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">${item.price.toFixed(2)} each</p>
                    
                    <div className="item-actions">
                      <div className="quantity-selector">
                        <button
                          className="qty-button"
                          onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          className="qty-button"
                          onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() => onRemoveItem(item._id)}
                        aria-label="Remove item"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    <span className="total-label">Total</span>
                    <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-section">
              <div className="summary-card">
                <h2 className="summary-title">Order Summary</h2>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${cart.total?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span className="free-shipping">FREE</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row summary-total">
                    <span>Total</span>
                    <span className="total-amount">${cart.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>

                <button className="checkout-button" onClick={handleCheckout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Proceed to Checkout
                </button>

                <button className="continue-btn" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>

                <div className="trust-badges">
                  <div className="trust-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="trust-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
