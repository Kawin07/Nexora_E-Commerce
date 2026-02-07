const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    stock: 50
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    description: 'Feature-rich smartwatch with fitness tracking',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    stock: 30
  },
  {
    name: 'Running Shoes',
    price: 89.99,
    description: 'Comfortable running shoes for all terrains',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    stock: 100
  },
  {
    name: 'Coffee Maker',
    price: 129.99,
    description: 'Premium coffee maker with programmable settings',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop',
    stock: 25
  },
  {
    name: 'Backpack',
    price: 49.99,
    description: 'Durable backpack with laptop compartment',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    stock: 75
  },
  {
    name: 'Yoga Mat',
    price: 29.99,
    description: 'Non-slip yoga mat with carrying strap',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop',
    stock: 60
  },
  {
    name: 'Desk Lamp',
    price: 39.99,
    description: 'LED desk lamp with adjustable brightness',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
    stock: 45
  },
  {
    name: 'Water Bottle',
    price: 24.99,
    description: 'Insulated stainless steel water bottle',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
    stock: 120
  },
  {
    name: 'Bluetooth Speaker',
    price: 59.99,
    description: 'Portable waterproof Bluetooth speaker',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
    stock: 40
  },
  {
    name: 'Sunglasses',
    price: 149.99,
    description: 'Polarized sunglasses with UV protection',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    stock: 35
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Successfully seeded 10 products');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
