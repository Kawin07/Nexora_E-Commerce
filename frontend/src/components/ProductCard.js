import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addToWishlist } from '../services/api';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [isInWishlist, setIsInWishlist] = React.useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAdding(true);
    try {
      await onAddToCart(product._id);
    } finally {
      setIsAdding(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    try {
      await addToWishlist(product._id);
      setIsInWishlist(true);
      setTimeout(() => setIsInWishlist(false), 2000);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <button 
          className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
          onClick={handleWishlist}
          title="Add to wishlist"
        >
          <svg viewBox="0 0 24 24" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        {product.stock < 10 && product.stock > 0 && (
          <div className="stock-badge low-stock">Only {product.stock} left!</div>
        )}
        {product.stock === 0 && (
          <div className="stock-badge out-of-stock">Out of Stock</div>
        )}
      </div>
      <div className="product-content">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-bottom">
          <div className="price-container">
            <span className="price-label">Price</span>
            <span className="product-price">${product.price.toFixed(2)}</span>
          </div>
          <button 
            className="add-cart-btn" 
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
          >
            {isAdding ? (
              <span className="btn-loading">
                <span className="spinner"></span>
                Adding...
              </span>
            ) : product.stock === 0 ? (
              'Out of Stock'
            ) : (
              <>
                <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
