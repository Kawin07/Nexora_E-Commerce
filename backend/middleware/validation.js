// Validation middleware for cart operations
const validateCartItem = (req, res, next) => {
  const { productId, quantity } = req.body;

  // Validate productId
  if (!productId) {
    return res.status(400).json({ 
      message: 'Validation failed',
      error: 'productId is required' 
    });
  }

  if (typeof productId !== 'string' || productId.trim().length === 0) {
    return res.status(400).json({ 
      message: 'Validation failed',
      error: 'productId must be a non-empty string' 
    });
  }

  // Validate quantity
  if (quantity === undefined || quantity === null) {
    return res.status(400).json({ 
      message: 'Validation failed',
      error: 'quantity is required' 
    });
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ 
      message: 'Validation failed',
      error: 'quantity must be a positive integer' 
    });
  }

  if (quantity > 1000) {
    return res.status(400).json({ 
      message: 'Validation failed',
      error: 'quantity cannot exceed 1000' 
    });
  }

  next();
};

// Validation middleware for product queries
const validateProductId = (req, res, next) => {
  const { id } = req.params;

  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    return res.status(400).json({ 
      message: 'Validation failed',
      error: 'Invalid product ID' 
    });
  }

  next();
};

// Validation middleware for pagination
const validatePagination = (req, res, next) => {
  const { page, limit } = req.query;

  if (page !== undefined) {
    const pageNum = parseInt(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({ 
        message: 'Validation failed',
        error: 'page must be a positive integer' 
      });
    }
  }

  if (limit !== undefined) {
    const limitNum = parseInt(limit);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({ 
        message: 'Validation failed',
        error: 'limit must be a positive integer between 1 and 100' 
      });
    }
  }

  next();
};

module.exports = {
  validateCartItem,
  validateProductId,
  validatePagination
};
