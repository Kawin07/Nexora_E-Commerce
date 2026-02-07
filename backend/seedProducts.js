const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  // Electronics
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-canceling headphones with 30-hour battery life",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    stock: 45
  },
  {
    name: "Smart Watch Pro",
    description: "Fitness tracker with heart rate monitor and GPS",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Electronics",
    stock: 30
  },
  {
    name: "4K Ultra HD Webcam",
    description: "Professional webcam with auto-focus and noise reduction",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500",
    category: "Electronics",
    stock: 25
  },
  {
    name: "Portable Power Bank 20000mAh",
    description: "Fast charging power bank with dual USB ports",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    category: "Electronics",
    stock: 60
  },
  {
    name: "Wireless Gaming Mouse",
    description: "RGB gaming mouse with programmable buttons",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    category: "Electronics",
    stock: 40
  },
  {
    name: "Mechanical Keyboard RGB",
    description: "Cherry MX switches with customizable RGB lighting",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    category: "Electronics",
    stock: 35
  },

  // Fashion
  {
    name: "Classic Leather Jacket",
    description: "Genuine leather jacket with premium finish",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    category: "Fashion",
    stock: 20
  },
  {
    name: "Designer Sunglasses",
    description: "UV protection polarized sunglasses",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    category: "Fashion",
    stock: 50
  },
  {
    name: "Premium Cotton T-Shirt",
    description: "100% organic cotton t-shirt in various colors",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Fashion",
    stock: 100
  },
  {
    name: "Slim Fit Denim Jeans",
    description: "Comfortable stretch denim with modern fit",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1542272454315-7f6ab6ec67c8?w=500",
    category: "Fashion",
    stock: 75
  },
  {
    name: "Canvas Sneakers",
    description: "Casual canvas shoes perfect for everyday wear",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
    category: "Fashion",
    stock: 80
  },
  {
    name: "Crossbody Leather Bag",
    description: "Stylish leather crossbody bag with adjustable strap",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    category: "Fashion",
    stock: 40
  },

  // Home & Living
  {
    name: "Aromatherapy Diffuser",
    description: "Ultrasonic essential oil diffuser with LED lights",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500",
    category: "Home & Living",
    stock: 55
  },
  {
    name: "Memory Foam Pillow Set",
    description: "Ergonomic pillows for better sleep quality",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
    category: "Home & Living",
    stock: 45
  },
  {
    name: "Smart LED Bulb 4-Pack",
    description: "WiFi-enabled color-changing LED bulbs",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500",
    category: "Home & Living",
    stock: 70
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Handcrafted ceramic mugs - set of 4",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
    category: "Home & Living",
    stock: 90
  },
  {
    name: "Decorative Wall Clock",
    description: "Modern minimalist wall clock with silent movement",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500",
    category: "Home & Living",
    stock: 35
  },
  {
    name: "Indoor Plant Collection",
    description: "Set of 3 low-maintenance indoor plants",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
    category: "Home & Living",
    stock: 30
  },

  // Sports & Outdoors
  {
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with carrying strap",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    category: "Sports & Outdoors",
    stock: 65
  },
  {
    name: "Resistance Bands Set",
    description: "5 levels resistance bands for home workout",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500",
    category: "Sports & Outdoors",
    stock: 80
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle keeps drinks cold for 24hrs",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    category: "Sports & Outdoors",
    stock: 100
  },
  {
    name: "Camping Tent 4-Person",
    description: "Waterproof camping tent with easy setup",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500",
    category: "Sports & Outdoors",
    stock: 20
  },
  {
    name: "Hiking Backpack 40L",
    description: "Durable hiking backpack with rain cover",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=500",
    category: "Sports & Outdoors",
    stock: 35
  },
  {
    name: "Running Shoes Pro",
    description: "Cushioned running shoes with breathable mesh",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Sports & Outdoors",
    stock: 50
  },

  // Books & Media
  {
    name: "The Art of Programming",
    description: "Comprehensive guide to modern programming practices",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
    category: "Books & Media",
    stock: 40
  },
  {
    name: "Wireless Earbuds Pro",
    description: "True wireless earbuds with active noise cancellation",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    category: "Electronics",
    stock: 55
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    category: "Electronics",
    stock: 45
  },
  {
    name: "Digital Photo Frame",
    description: "10-inch WiFi digital photo frame",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500",
    category: "Electronics",
    stock: 25
  },
  {
    name: "Winter Wool Scarf",
    description: "Soft merino wool scarf in classic colors",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500",
    category: "Fashion",
    stock: 60
  },
  {
    name: "Leather Wallet",
    description: "RFID-blocking genuine leather wallet",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    category: "Fashion",
    stock: 70
  },
  {
    name: "Ceramic Dinnerware Set",
    description: "16-piece ceramic dinnerware set for 4",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500",
    category: "Home & Living",
    stock: 30
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`Successfully added ${products.length} products!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
