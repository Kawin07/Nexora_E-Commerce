import React from 'react';
import ProductCard from './ProductCard';
import './ProductsGrid.css';

const ProductsGrid = ({ products, onAddToCart, loading, error }) => {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="empty-state">No products available</div>;
  }

  return (
    <div className="products-section">
      <h2 className="section-title">Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
