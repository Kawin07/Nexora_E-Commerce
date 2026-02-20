import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import ProductReviews from '../components/ProductReviews';
import RecentlyViewed from '../components/RecentlyViewed';
import './ProductDetailPage.css';

const ProductDetailPage = ({ onAddToCart, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadProduct();
    loadSimilarProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await api.getProduct(id);
      setProduct(data);
      saveToRecentlyViewed(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToRecentlyViewed = (product) => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    
    // Remove product if it already exists
    const filtered = recentlyViewed.filter(p => p._id !== product._id);
    
    // Add product to the beginning
    const updated = [
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      },
      ...filtered
    ].slice(0, 10); // Keep only last 10 viewed products
    
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  const loadSimilarProducts = async () => {
    try {
      const data = await api.getSimilarProducts(id);
      setSimilarProducts(data);
    } catch (error) {
      console.error('Error loading similar products:', error);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart(product._id, quantity);
      navigate('/cart');
    } finally {
      setIsAdding(false);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="detail-loading">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')}>Back to Shop</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>

        <div className="product-detail-content">
          <div className="product-image-section">
            <div className="main-image-wrapper">
              <img src={product.image} alt={product.name} className="main-product-image" />
              {product.stock < 10 && product.stock > 0 && (
                <div className="detail-stock-badge low-stock">Only {product.stock} left in stock!</div>
              )}
              {product.stock === 0 && (
                <div className="detail-stock-badge out-of-stock">Out of Stock</div>
              )}
            </div>
          </div>

          <div className="product-info-section">
            <div className="product-category-badge">{product.category}</div>
            <h1 className="product-detail-title">{product.name}</h1>
            
            <div className="price-section">
              <span className="price-label">Price</span>
              <div className="price-wrapper">
                <span className="detail-price">${product.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="product-description-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>High quality materials</li>
                <li>Fast and free shipping</li>
                <li>30-day money-back guarantee</li>
                <li>1-year warranty included</li>
              </ul>
            </div>

            <div className="quantity-section">
              <label>Quantity</label>
              <div className="quantity-controls-detail">
                <button 
                  className="qty-btn-detail" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  className="qty-btn-detail" 
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <span className="stock-info">{product.stock} available</span>
            </div>

            <button 
              className="add-to-cart-detail-btn"
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
            >
              {isAdding ? (
                <>
                  <span className="spinner-small"></span>
                  Adding to Cart...
                </>
              ) : product.stock === 0 ? (
                'Out of Stock'
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>

            <div className="trust-indicators">
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <strong>Secure Payment</strong>
                  <p>Your payment info is safe</p>
                </div>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <div>
                  <strong>Free Shipping</strong>
                  <p>On all orders over $50</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="similar-products-section">
            <h2 className="similar-products-title">You May Also Like</h2>
            <div className="similar-products-grid">
              {similarProducts.map((similarProduct) => (
                <div 
                  key={similarProduct._id} 
                  className="similar-product-card"
                  onClick={() => navigate(`/product/${similarProduct._id}`)}
                >
                  <div className="similar-product-image-wrapper">
                    <img src={similarProduct.image} alt={similarProduct.name} />
                  </div>
                  <div className="similar-product-info">
                    <span className="similar-product-category">{similarProduct.category}</span>
                    <h3 className="similar-product-name">{similarProduct.name}</h3>
                    <p className="similar-product-price">${similarProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <ProductReviews productId={product._id} user={user} />

        {/* Recently Viewed Section */}
        <RecentlyViewed currentProductId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
