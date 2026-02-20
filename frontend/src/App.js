import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import SearchResultsPage from './pages/SearchResultsPage';
import CheckoutForm from './components/CheckoutForm';
import ReceiptModal from './components/ReceiptModal';
import AIAssistant from './components/AIAssistant';
import * as api from './services/api';
import './App.css';

function App() {
  const [, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [user, setUser] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState({
    products: true,
    cart: true
  });
  const [error, setError] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Load products and cart on mount
  useEffect(() => {
    loadProducts();
    loadCart();
    loadWishlist();
    
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update cart item count
  useEffect(() => {
    if (cart && cart.items) {
      const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemCount(count);
    } else {
      setCartItemCount(0);
    }
  }, [cart]);

  const loadProducts = async () => {
    try {
      setLoading(prev => ({ ...prev, products: true }));
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  };

  const loadCart = async () => {
    try {
      setLoading(prev => ({ ...prev, cart: true }));
      const data = await api.getCart();
      setCart(data);
    } catch (err) {
      console.error('Error loading cart:', err);
    } finally {
      setLoading(prev => ({ ...prev, cart: false }));
    }
  };

  const loadWishlist = async () => {
    try {
      const data = await api.getWishlist();
      setWishlistItems(data.items || []);
    } catch (err) {
      console.error('Error loading wishlist:', err);
    }
  };

  const handleToggleWishlist = async (productId) => {
    try {
      const isInWishlist = wishlistItems.some(item => item.productId === productId);
      
      if (isInWishlist) {
        await api.removeFromWishlist(productId);
        showNotification('Removed from wishlist');
      } else {
        await api.addToWishlist(productId);
        showNotification('Added to wishlist');
      }
      
      await loadWishlist();
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      setError('Failed to update wishlist');
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const updatedCart = await api.addToCart(productId, quantity);
      setCart(updatedCart);
      showNotification('Item added to cart!');
    } catch (err) {
      setError('Failed to add item to cart! ');
      console.error('Error adding to cart:', err);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const updatedCart = await api.updateCartItem(itemId, newQuantity);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = await api.removeFromCart(itemId);
      setCart(updatedCart);
      showNotification('Item removed from cart');
    } catch (err) {
      setError('Failed to remove item');
      console.error('Error removing item:', err);
    }
  };

  const handleCheckoutSubmit = async (customerData) => {
    try {
      // Check if user is logged in
      if (!user) {
        setError('Please login to complete checkout');
        return { requiresLogin: true };
      }
      
      const response = await api.checkout(customerData);
      setReceipt(response.receipt);
      await loadCart(); // Reload empty cart
      return { success: true };
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Please login to complete checkout');
        return { requiresLogin: true };
      }
      setError('Checkout failed. Please try again.');
      console.error('Checkout error:', err);
      return { success: false };
    }
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    // Merge guest cart with user cart after login
    mergeCartsAfterLogin(userData.id);
  };

  const mergeCartsAfterLogin = async (userId) => {
    try {
      const mergedCart = await api.mergeGuestCart(userId);
      if (mergedCart) {
        setCart(mergedCart);
      } else {
        // No guest cart to merge, just load user cart
        loadCart();
      }
    } catch (error) {
      console.error('Error merging carts:', error);
      loadCart(); // Fallback to loading user cart
    }
  };

  const handleLogout = () => {
    setUser(null);
    loadCart(); // Reload cart for new guest session
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  };

  return (
    <Router>
      <div className="App">
        <Header cartItemCount={cartItemCount} user={user} onLogout={handleLogout} />

        <main className="app-main">
          {error && (
            <div className="error-banner">
              {error}
              <button onClick={() => setError(null)} className="error-close">×</button>
            </div>
          )}

          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistItems={wishlistItems}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <CartPage
                  cart={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  loading={loading.cart}
                />
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <WishlistPage 
                  onAddToCart={handleAddToCart}
                />
              } 
            />
            <Route 
              path="/login" 
              element={<LoginPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={<RegisterPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetailPage 
                  onAddToCart={handleAddToCart}
                  user={user}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <CheckoutForm
                  onSubmit={handleCheckoutSubmit}
                  onCancel={() => window.history.back()}
                  total={cart?.total}
                />
              } 
            />
            <Route 
              path="/orders" 
              element={<OrdersPage user={user} />} 
            />
            <Route 
              path="/search" 
              element={
                <SearchResultsPage 
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistItems={wishlistItems}
                />
              } 
            />
          </Routes>
        </main>

        {receipt && (
          <ReceiptModal
            receipt={receipt}
            onClose={handleCloseReceipt}
          />
        )}

        {/* AI Shopping Assistant */}
        <AIAssistant />

        <footer className="app-footer">
          <div className="footer-content">
            <p>© 2025 Vibe Commerce. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
