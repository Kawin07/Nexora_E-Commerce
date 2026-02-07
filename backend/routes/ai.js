const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');
require('dotenv').config();

// Initialize Gemini AI
let genAI;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// POST /api/ai/chat - AI Shopping Assistant
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if Gemini API is configured
    if (!process.env.GEMINI_API_KEY || !genAI) {
      return res.status(503).json({ 
        error: 'AI assistant is not configured. Please add GEMINI_API_KEY to your .env file.' 
      });
    }

    // Get all products for context
    const allProducts = await Product.find().select('name description price category stock');
    
    // Create product catalog summary
    const productCatalog = allProducts.map(p => 
      `- ${p.name} (Category: ${p.category}, Price: $${p.price}, Stock: ${p.stock})`
    ).join('\n');

    // Build conversation context
    const conversationContext = conversationHistory
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    // Create the prompt
    const prompt = `You are a helpful AI shopping assistant for Vibe Commerce, an e-commerce store. Your job is to help customers find products based on their requirements.

Available Products in our catalog:
${productCatalog}

Previous conversation:
${conversationContext}

Customer's current question: ${message}

Instructions:
1. Understand the customer's requirements (budget, category, brand preferences, features, etc.)
2. Recommend 1-3 most suitable products from the catalog
3. For each recommendation, explain why it matches their needs
4. Include the product name, price, and category
5. Be friendly, concise, and helpful
6. If no products match, suggest the closest alternatives
7. Format product suggestions clearly with product names that can be linked

Respond naturally and helpfully:`;

    // Call Gemini AI
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiMessage = response.text();

    // Extract product names mentioned in the response
    const mentionedProducts = [];
    for (const product of allProducts) {
      if (aiMessage.toLowerCase().includes(product.name.toLowerCase())) {
        mentionedProducts.push({
          id: product._id,
          name: product.name,
          price: product.price,
          category: product.category
        });
      }
    }

    res.json({
      message: aiMessage,
      products: mentionedProducts,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ AI Chat Error:', error.message || error);
    res.status(500).json({ 
      error: 'Failed to process your message. Please try again.',
      details: error.message 
    });
  }
});

// GET /api/ai/suggestions - Get product suggestions based on query
router.get('/suggestions', async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, limit = 5 } = req.query;

    let searchCriteria = {};

    // Text search
    if (query && query.trim()) {
      searchCriteria.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'All') {
      searchCriteria.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      searchCriteria.price = {};
      if (minPrice) searchCriteria.price.$gte = parseFloat(minPrice);
      if (maxPrice) searchCriteria.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(searchCriteria)
      .limit(parseInt(limit))
      .sort({ price: 1 });

    res.json(products);

  } catch (error) {
    console.error('❌ Suggestions Error:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

module.exports = router;
