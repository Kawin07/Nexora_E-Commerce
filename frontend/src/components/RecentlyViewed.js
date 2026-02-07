import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecentlyViewed.css';

const RecentlyViewed = ({ currentProductId }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecentlyViewed();
  }, [currentProductId]);

  const loadRecentlyViewed = () => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    // Filter out the current product if it's in the list
    const filtered = viewed.filter(product => product._id !== currentProductId);
    setRecentlyViewed(filtered.slice(0, 4)); // Show max 4 products
  };

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <h2 className="recently-viewed-title">Recently Viewed</h2>
      <div className="recently-viewed-grid">
        {recentlyViewed.map((product) => (
          <div 
            key={product._id} 
            className="recently-viewed-card"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="recently-viewed-image-wrapper">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="recently-viewed-info">
              <span className="recently-viewed-category">{product.category}</span>
              <h3 className="recently-viewed-name">{product.name}</h3>
              <p className="recently-viewed-price">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
