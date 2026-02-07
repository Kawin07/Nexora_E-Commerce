const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// GET /api/wishlist - Get wishlist
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'guest-user';
    let wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
      await wishlist.save();
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
});

// POST /api/wishlist - Add item to wishlist
router.post('/', async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.body.userId || 'guest-user';

    if (!productId) {
      return res.status(400).json({ message: 'ProductId is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    // Check if already in wishlist
    const existingItem = wishlist.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    wishlist.items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image
    });

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
});

// DELETE /api/wishlist/:itemId - Remove item from wishlist
router.delete('/:itemId', async (req, res) => {
  try {
    const userId = req.query.userId || 'guest-user';
    const itemId = req.params.itemId;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.items.pull(itemId);
    await wishlist.save();
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
  }
});

module.exports = router;
