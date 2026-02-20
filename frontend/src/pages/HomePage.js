import React, { useState, useMemo, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductsGrid from '../components/ProductsGrid';
import './HomePage.css';

const HomePage = ({ onAddToCart, onToggleWishlist, wishlistItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts(currentPage, 12);
      
      // Handle both old and new response formats
      if (data.products) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
      } else {
        // Old format - array of products
        setProducts(data);
        setTotalPages(1);
        setTotalProducts(data.length);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Premium Products
            <span className="hero-subtitle">Shop with confidence, delivered with care</span>
          </h1>
          <p className="hero-description">
            Explore our curated collection of high-quality products at unbeatable prices
          </p>
        </div>
      </section>

      <section className="products-section">
        <div className="filters-section">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {filteredProducts.length === 0 && !loading ? (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try selecting a different category</p>
          </div>
        ) : (
          <>
            <ProductsGrid 
              products={filteredProducts}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              wishlistItems={wishlistItems}
              loading={loading}
              error={error}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && !loading && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Previous
                </button>

                <div className="pagination-numbers">
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                    ) : (
                      <button
                        key={page}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            )}

            {totalProducts > 0 && (
              <div className="products-info">
                Showing {filteredProducts.length} of {totalProducts} products
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;
