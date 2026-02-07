const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const { sendOrderConfirmation } = require('../services/emailService');

// POST /api/checkout - Process checkout and create order (REQUIRES AUTH)
router.post('/', auth, async (req, res) => {
  try {
    const { customerName, customerEmail } = req.body;
    const userId = req.userId; // Get from auth middleware

    // Validation
    if (!customerName || !customerEmail) {
      return res.status(400).json({ 
        message: 'Customer name and email are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Get cart for authenticated user
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const order = new Order({
      userId,
      customerName,
      customerEmail,
      items: cart.items,
      total: cart.total,
      orderNumber,
      status: 'completed'
    });

    await order.save();

    // Send confirmation email (non-blocking)
    const emailResult = await sendOrderConfirmation(order);
    
    if (!emailResult.success && !emailResult.skipped) {
      console.warn('⚠️ Email sending failed, but order was created:', emailResult.error);
    } else if (emailResult.skipped) {
      console.log('📧 Email not sent (API key not configured)');
    } else {
      console.log('✅ Order confirmation email sent successfully');
    }

    // Clear cart after successful checkout
    cart.items = [];
    await cart.save();

    // Return receipt
    res.json({
      message: 'Checkout successful',
      receipt: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        total: order.total,
        timestamp: order.createdAt,
        status: order.status,
        emailSent: emailResult.success && !emailResult.skipped
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error processing checkout', 
      error: error.message 
    });
  }
});

// GET /api/checkout/orders - Get user's orders (requires auth)
router.get('/orders', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching orders', 
      error: error.message 
    });
  }
});

module.exports = router;
