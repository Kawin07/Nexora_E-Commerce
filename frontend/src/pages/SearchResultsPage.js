import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import './SearchResultsPage.css';

const SearchResultsPage = ({ onAddToCart, onToggleWishlist, wishlistItems }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const results = await searchProducts(query);
        setProducts(results);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="search-results-page">
        <div className="search-loading">
          <div className="spinner"></div>
          <p>Searching for "{query}"...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-page">
        <div className="search-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h2>{error}</h2>
          <Link to="/" className="back-home-btn">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="search-header">
        <h1>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          Search Results
        </h1>
        <p className="search-query">
          {products.length > 0 ? (
            <>Found <strong>{products.length}</strong> result{products.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"</>
          ) : (
            <>No results found for "<strong>{query}</strong>"</>
          )}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="search-results-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlistItems?.some(item => item.productId === product._id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <svg className="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          <h2>No products found</h2>
          <p>Try searching with different keywords or browse our collection</p>
          <Link to="/" className="browse-btn">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
