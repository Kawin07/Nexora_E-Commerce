import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add item to cart
  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item._id === product._id);
      
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          total: prevCart.total + (product.price * quantity)
        };
      }

      return {
        items: [...prevCart.items, { ...product, quantity }],
        total: prevCart.total + (product.price * quantity)
      };
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => {
      const item = prevCart.items.find(item => item._id === productId);
      if (!item) return prevCart;

      return {
        items: prevCart.items.filter(item => item._id !== productId),
        total: prevCart.total - (item.price * item.quantity)
      };
    });
  }, []);

  // Update item quantity
  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const item = prevCart.items.find(item => item._id === productId);
      if (!item) return prevCart;

      const quantityDifference = quantity - item.quantity;
      const totalChange = item.price * quantityDifference;

      return {
        items: prevCart.items.map(item =>
          item._id === productId
            ? { ...item, quantity }
            : item
        ),
        total: prevCart.total + totalChange
      };
    });
  }, [removeFromCart]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 });
  }, []);

  // Add to wishlist
  const addToWishlist = useCallback((product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item._id === product._id);
      if (exists) return prevWishlist;
      return [...prevWishlist, product];
    });
  }, []);

  // Remove from wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prevWishlist =>
      prevWishlist.filter(item => item._id !== productId)
    );
  }, []);

  // Set user
  const setCurrentUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  // Logout user
  const logout = useCallback(() => {
    setUser(null);
    clearCart();
    setWishlist([]);
  }, [clearCart]);

  const value = {
    products,
    setProducts,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    user,
    setCurrentUser,
    logout,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    loading,
    setLoading,
    error,
    setError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
