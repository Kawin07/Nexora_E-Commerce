const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: "Gold Plated Temple Necklace",
    description: "Beautiful gold plated temple necklace with traditional design",
    price: 2499,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 25
  },
  {
    name: "Silver Heart Pendant",
    description: "Elegant silver heart pendant on delicate chain",
    price: 1299,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 30
  },
  {
    name: "Diamond Stud Earrings",
    description: "Premium diamond stud earrings with brilliant sparkle",
    price: 18999,
    image: "https://images.unsplash.com/photo-1589207212797-cfd6e4aefb1b?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 15
  },
  {
    name: "Pearl Drop Earrings",
    description: "Classic pearl drop earrings with gold hooks",
    price: 999,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 35
  },
  {
    name: "Rose Gold Bracelet",
    description: "Beautiful rose gold bracelet with elegant design",
    price: 1799,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8c87?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 20
  },
  {
    name: "Kundan Bridal Necklace Set",
    description: "Traditional kundan bridal necklace set with matching earrings",
    price: 7999,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 8
  },
  {
    name: "Minimal Silver Ring",
    description: "Modern minimalist silver ring for everyday wear",
    price: 899,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 40
  },
  {
    name: "Antique Gold Jhumkas",
    description: "Traditional antique gold jhumkas with intricate detailing",
    price: 1499,
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 18
  },
  {
    name: "Emerald Stone Necklace",
    description: "Stunning emerald stone necklace with diamond accents",
    price: 4599,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 12
  },
  {
    name: "Charm Anklet",
    description: "Delicate charm anklet perfect for any occasion",
    price: 699,
    image: "https://images.unsplash.com/photo-1617038293538-8f35f8f50b45?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 28
  },
  {
    name: "Solitaire Diamond Ring",
    description: "Luxurious solitaire diamond ring in white gold setting",
    price: 24999,
    image: "https://images.unsplash.com/photo-1586104195538-050b9f5f1b1d?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 6
  },
  {
    name: "Gold Mangalsutra",
    description: "Traditional gold mangalsutra with sacred significance",
    price: 8999,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 10
  },
  {
    name: "Oxidized Silver Necklace",
    description: "Stylish oxidized silver necklace with vintage appeal",
    price: 1999,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 22
  },
  {
    name: "Crystal Stud Earrings",
    description: "Sparkling crystal stud earrings for everyday elegance",
    price: 499,
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 50
  },
  {
    name: "Gold Chain for Men",
    description: "Premium gold chain designed for men with strong design",
    price: 11999,
    image: "https://images.unsplash.com/photo-1602524200889-1e7c43f5c917?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 14
  },
  {
    name: "Ruby Stone Ring",
    description: "Beautiful ruby stone ring with diamond surround",
    price: 2999,
    image: "https://images.unsplash.com/photo-1589987607627-0f6a4f5c4c10?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 16
  },
  {
    name: "Traditional Nose Pin",
    description: "Elegant traditional nose pin in gold finish",
    price: 399,
    image: "https://images.unsplash.com/photo-1610701596131-f5b99b42a3fa?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 45
  },
  {
    name: "Layered Gold Necklace",
    description: "Trendy layered gold necklace with multiple chains",
    price: 6499,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 19
  },
  {
    name: "Infinity Silver Pendant",
    description: "Meaningful infinity pendant in pure silver",
    price: 1099,
    image: "https://images.unsplash.com/photo-1617038221143-56ccdbef3a64?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 32
  },
  {
    name: "Designer Bangles Set",
    description: "Exclusive designer bangles set with intricate patterns",
    price: 3499,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 11
  },
  {
    name: "Gold Plated Choker",
    description: "Elegant gold plated choker necklace",
    price: 2799,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 17
  },
  {
    name: "Silver Toe Ring",
    description: "Delicate silver toe ring for subtle elegance",
    price: 299,
    image: "https://images.unsplash.com/photo-1611591437487-73c4fcb96b8a?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 55
  },
  {
    name: "Peacock Motif Earrings",
    description: "Beautiful peacock motif earrings with traditional design",
    price: 1299,
    image: "https://images.unsplash.com/photo-1622434641091-3dbf44e0c30d?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 26
  },
  {
    name: "Gold Plated Bracelet",
    description: "Premium gold plated bracelet with elegant detailing",
    price: 2199,
    image: "https://images.unsplash.com/photo-1617038260407-b08b68a1a3f8?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 23
  },
  {
    name: "Statement Cocktail Ring",
    description: "Bold statement cocktail ring for special occasions",
    price: 1899,
    image: "https://images.unsplash.com/photo-1589987607627-0f6a4f5c4c10?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 13
  },
  {
    name: "Silver Chain Necklace",
    description: "Classic silver chain necklace in various lengths",
    price: 1599,
    image: "https://images.unsplash.com/photo-1617038221562-bf6d6a7d9b6c?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 34
  },
  {
    name: "Floral Gold Earrings",
    description: "Exquisite floral gold earrings with intricate design",
    price: 1699,
    image: "https://images.unsplash.com/photo-1611652022391-68c59b36e6f2?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 21
  },
  {
    name: "Black Beads Bracelet",
    description: "Modern black beads bracelet for casual wear",
    price: 799,
    image: "https://images.unsplash.com/photo-1617038292294-8f13b6a0c7c5?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 38
  },
  {
    name: "Emerald Drop Earrings",
    description: "Stunning emerald drop earrings with white gold setting",
    price: 2599,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 9
  },
  {
    name: "Luxury Bridal Jewelry Set",
    description: "Complete luxury bridal jewelry set for your special day",
    price: 15999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    category: "Jewels",
    stock: 5
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
    console.log(`Successfully added ${products.length} jewel products!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
