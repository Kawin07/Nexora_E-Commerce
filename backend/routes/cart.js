const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart - Get cart with all items and total
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'guest-user';
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.body.userId || 'guest-user';

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'ProductId and quantity are required' });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
});

// PUT /api/cart/:itemId - Update cart item quantity
router.put('/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.body.userId || 'guest-user';
    const itemId = req.params.itemId;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
});

// DELETE /api/cart/:itemId - Remove item from cart
router.delete('/:itemId', async (req, res) => {
  try {
    const userId = req.query.userId || 'guest-user';
    const itemId = req.params.itemId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove item using pull
    cart.items.pull(itemId);
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
});

// DELETE /api/cart - Clear entire cart
router.delete('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'guest-user';
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
});

// POST /api/cart/merge - Merge guest cart with user cart after login
router.post('/merge', async (req, res) => {
  try {
    const { guestCartId, userId } = req.body;

    if (!guestCartId || !userId) {
      return res.status(400).json({ message: 'Guest cart ID and user ID are required' });
    }

    // Find guest cart
    const guestCart = await Cart.findOne({ userId: guestCartId });
    
    // Find or create user cart
    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      userCart = new Cart({ userId, items: [], isGuest: false });
    } else {
      userCart.isGuest = false;
    }

    // Merge items from guest cart if it exists
    if (guestCart && guestCart.items.length > 0) {
      for (const guestItem of guestCart.items) {
        const existingItemIndex = userCart.items.findIndex(
          item => item.productId.toString() === guestItem.productId.toString()
        );

        if (existingItemIndex > -1) {
          // Add quantities if item already exists
          userCart.items[existingItemIndex].quantity += guestItem.quantity;
        } else {
          // Add new item
          userCart.items.push(guestItem);
        }
      }

      // Delete guest cart after merge
      await Cart.deleteOne({ userId: guestCartId });
    }

    await userCart.save();
    res.json(userCart);
  } catch (error) {
    res.status(500).json({ message: 'Error merging carts', error: error.message });
  }
});

module.exports = router;
