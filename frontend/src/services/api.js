import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Keep guest cart ID for when user logs out
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Helper to get or create guest cart ID
const getGuestCartId = () => {
  let guestId = localStorage.getItem('guestCartId');
  if (!guestId) {
    guestId = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('guestCartId', guestId);
  }
  return guestId;
};

// Helper to get current user ID (authenticated or guest)
const getCurrentUserId = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    return userData.id;
  }
  return getGuestCartId();
};

// Product APIs
export const getProducts = async (page = 1, limit = 12) => {
  const response = await api.get('/products', { params: { page, limit } });
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getSimilarProducts = async (id) => {
  const response = await api.get(`/products/${id}/similar`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get('/products/search', { params: { q: query } });
  return response.data;
};

// Cart APIs
export const getCart = async () => {
  const userId = getCurrentUserId();
  const response = await api.get('/cart', { params: { userId } });
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const userId = getCurrentUserId();
  const response = await api.post('/cart', { productId, quantity, userId });
  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const userId = getCurrentUserId();
  const response = await api.put(`/cart/${itemId}`, { quantity, userId });
  return response.data;
};

export const removeFromCart = async (itemId) => {
  const userId = getCurrentUserId();
  const response = await api.delete(`/cart/${itemId}`, { params: { userId } });
  return response.data;
};

export const clearCart = async () => {
  const userId = getCurrentUserId();
  const response = await api.delete('/cart', { params: { userId } });
  return response.data;
};

export const mergeGuestCart = async (userId) => {
  const guestCartId = localStorage.getItem('guestCartId');
  if (guestCartId) {
    const response = await api.post('/cart/merge', { guestCartId, userId });
    localStorage.removeItem('guestCartId'); // Clear guest cart ID after merge
    return response.data;
  }
  return null;
};

// Checkout API (requires auth)
export const checkout = async (customerData) => {
  const response = await api.post('/checkout', customerData);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/checkout/orders');
  return response.data;
};

// Wishlist APIs
export const getWishlist = async () => {
  const userId = getCurrentUserId();
  const response = await api.get('/wishlist', { params: { userId } });
  return response.data;
};

export const addToWishlist = async (productId) => {
  const userId = getCurrentUserId();
  const response = await api.post('/wishlist', { productId, userId });
  return response.data;
};

export const removeFromWishlist = async (itemId) => {
  const userId = getCurrentUserId();
  const response = await api.delete(`/wishlist/${itemId}`, { params: { userId } });
  return response.data;
};

// Review APIs
export const getReviews = async (productId) => {
  const response = await api.get(`/reviews/${productId}`);
  return response.data;
};

export const addReview = async (productId, rating, comment) => {
  const response = await api.post('/reviews', { productId, rating, comment });
  return response.data;
};

export const markReviewHelpful = async (reviewId) => {
  const response = await api.put(`/reviews/${reviewId}/helpful`);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};

export default api;
