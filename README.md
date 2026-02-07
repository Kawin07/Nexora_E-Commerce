# Nexora E-Commerce Platform

**Naksh Jewels Internship Assessment Submission**

A full-stack e-commerce application built with **React**, **Node.js/Express**, and **MongoDB**. This project satisfies all requirements for the Naksh Jewels ReactJS & Node.js internship assessment, demonstrating clean code architecture, proper validation, and containerized deployment.

---

## ✅ Internship Assessment Requirements - ALL SATISFIED

### Part A: Frontend (React) ✅
- [x] **Product listing page using API** - Fetches from `/api/products` with pagination
- [x] **Product cards** - Display image, name, price, and "Add to Cart" button
- [x] **Cart page** - Quantity update and remove item functionality
- [x] **State management (Context API)** - Global state without Redux
- [x] **Responsive design (no UI libraries)** - Pure CSS styling only
- [x] **Functional components only** - All components use React hooks
- [x] **Clean folder structure** - components/, pages/, context/, services/
- [x] **Meaningful git commits** - Repository initialized with meaningful commit messages

### Part B: Backend (Node.js + Express) ✅
- [x] **GET /api/products** - Returns paginated products with metadata
- [x] **POST /api/cart** - Adds items to cart with stock validation
- [x] **Validation middleware** - validateCartItem, validateProductId, validatePagination
- [x] **Proper error handling** - Global error handler + route-level try/catch
- [x] **MongoDB database** - 6 models: Product, User, Cart, Order, Review, Wishlist
- [x] **Environment variables (.env)** - NODE_ENV, PORT, MONGODB_URI, JWT_SECRET

### Part C: Docker (Mandatory) ✅
- [x] **Dockerfile for frontend** - Multi-stage build with Node 18 Alpine
- [x] **Dockerfile for backend** - Node 18 Alpine with health checks
- [x] **docker-compose.yml** - MongoDB, Backend, Frontend with networking
- [x] **Runs with `docker-compose up`** - Complete containerized setup

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended - Single Command)
```bash
docker-compose up --build
```
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

### Option 2: Local Development
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

---

## 📋 Project Structure

```
Nexora - Ecommerce/
├── frontend/
│   ├── src/
│   │   ├── components/        (ProductCard, Cart, Header, etc.)
│   │   ├── pages/             (HomePage, CartPage, ProductDetailPage, etc.)
│   │   ├── context/           (AppContext.js - Context API state)
│   │   ├── services/          (api.js - API calls)
│   │   └── App.js
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── routes/                (products, cart, auth, checkout, wishlist, reviews)
│   ├── middleware/            (auth.js, validation.js)
│   ├── models/                (Product, Cart, Order, User, Review, Wishlist)
│   ├── config/                (db.js)
│   ├── services/              (emailService.js)
│   ├── Dockerfile
│   ├── server.js
│   ├── seedJewels.js          (Sample jewelry data)
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - Global state management (NO Redux)
- **Pure CSS** - Custom styling (NO Bootstrap/MUI/Ant Design)

### Backend
- **Node.js 18** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Token authentication
- **bcryptjs** - Password hashing

### DevOps & Infrastructure
- **Docker** - Container technology
- **Docker Compose** - Container orchestration
- **Alpine images** - Lightweight containers

---

## 🎯 Key Features

### Core E-Commerce Functionality
1. **Product Listing & Search** - API-driven product display with search by name/description
2. **Shopping Cart** - Add items, update quantities, remove items with stock validation
3. **Responsive Design** - Works on desktop, tablet, mobile (pure CSS, no frameworks)
4. **Error Handling** - Comprehensive validation and error messages

### Additional Features
5. **User Authentication** - JWT-based login/register with password hashing
6. **Wishlist System** - Save products for later viewing
7. **Product Reviews** - Users can review and rate products
8. **Order Management** - Complete order history and checkout flow
9. **Email Notifications** - Order confirmation emails
10. **AI Assistant** - AI-powered product recommendations
11. **Similar Products** - Category-based product recommendations

---

## 📡 API Endpoints

### Products
```
GET    /api/products              Get all products (paginated)
GET    /api/products/search?q=    Search products
GET    /api/products/:id          Get single product
GET    /api/products/:id/similar  Get similar products
```

### Cart Operations
```
GET    /api/cart                  Get cart
POST   /api/cart                  Add to cart (validation included)
PUT    /api/cart/:id              Update quantity
DELETE /api/cart/:id              Remove item
```

### Authentication
```
POST   /api/auth/register         Register user
POST   /api/auth/login            Login user
```

### Additional
```
GET    /api/wishlist              Get wishlist
POST   /api/wishlist              Add to wishlist
GET    /api/reviews/:productId    Get reviews
POST   /api/reviews               Add review
POST   /api/checkout              Place order
GET    /api/orders                Get user orders
GET    /api/health                Health check
```

---

## 🔧 Middleware & Validation

### Backend Validation
- **validateCartItem** - Validates productId and quantity (1-1000 range)
- **validateProductId** - Ensures valid product ID format
- **validatePagination** - Validates page and limit parameters (1-100 per page)
- **Error Handler** - Global middleware for consistent error responses

### Authentication
- **JWT Middleware** - Protects protected routes with token verification
- **Password Hashing** - bcryptjs for secure storage

---

## 📦 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexora_db
JWT_SECRET=your_secret_key
GOOGLE_API_KEY=your_api_key
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐳 Docker Architecture

**Service Topology:**
```
┌──────────────────────────────────────────┐
│       Docker Compose Network             │
├──────────────────────────────────────────┤
│                                          │
│  Frontend (port 3000)                    │
│  ↓                                       │
│  Backend (port 5000)  ←→  MongoDB       │
│                            (port 27017)  │
│                                          │
└──────────────────────────────────────────┘
```

**Docker Services:**
1. **MongoDB** - Data persistence with volume mount
2. **Backend** - Express API with health checks
3. **Frontend** - React app served with Node.js serve

**Features:**
- Health checks for automatic restart
- Service dependencies management
- Custom bridge network (nexora_network)
- Volume persistence for database

---

## 🚀 Installation & Setup

### Prerequisites
- **Docker & Docker Compose** (for containerized setup)
- **Node.js 18+** (for local development)
- **MongoDB** (or use Docker)

### Method 1: Docker Compose (Recommended)

```bash
# 1. Clone/Navigate to project
cd "Nexora - Ecommerce"

# 2. Build and start all services
docker-compose up --build

# 3. Wait for services to start (~30 seconds)
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017

# 4. (Optional) Seed sample jewelry data
docker-compose exec backend node seedJewels.js

# 5. Stop services
docker-compose down
```

### Method 2: Local Development

#### Backend Setup
```bash
cd backend
npm install

# Create .env file with MongoDB connection
npm run dev  # Starts on http://localhost:5000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start   # Starts on http://localhost:3000
```

### Sample Data

The project includes sample jewelry products. To seed data:

```bash
# Docker
docker-compose exec backend node seedJewels.js

# Local
cd backend
node seedJewels.js
```

---

## 📝 Git Workflow

### Initialize Repository
```bash
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "feat: initial e-commerce project with React, Node.js, and Docker"
```

### Meaningful Commits
Examples of well-structured commits:
```bash
git commit -m "feat: add product listing with pagination"
git commit -m "feat: implement cart functionality with quantity management"
git commit -m "feat: add Context API for state management"
git commit -m "feat: create validation middleware"
git commit -m "feat: add Docker support with docker-compose"
git commit -m "docs: add comprehensive README with setup instructions"
```

---

## ✨ Code Quality

### Frontend Highlights
- ✅ **Functional Components Only** - All React components use hooks (no class components)
- ✅ **Context API** - Global state management without Redux
- ✅ **Pure CSS** - Custom styling (NO Bootstrap, MUI, Ant Design)
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Error Handling** - Try/catch blocks and error boundaries
- ✅ **Clean Code** - Meaningful variable names, modular structure

### Backend Highlights
- ✅ **Validation Middleware** - Input validation for all endpoints
- ✅ **Error Handling** - Global error middleware + route-level handling
- ✅ **Proper Architecture** - Separation of concerns (routes, models, middleware)
- ✅ **Security** - JWT authentication, password hashing, CORS
- ✅ **Database** - MongoDB with Mongoose models
- ✅ **API Design** - RESTful endpoints with proper HTTP methods

### DevOps Highlights
- ✅ **Multi-stage Builds** - Frontend optimized with build stage
- ✅ **Health Checks** - Auto-restart containers on failure
- ✅ **Networking** - Custom bridge network for service communication
- ✅ **Volume Persistence** - MongoDB data preserved across restarts
- ✅ **Alpine Images** - Minimal image sizes for faster deployment

---

## 🔍 Testing the Application

### 1. After `docker-compose up`:
```bash
# Test backend health
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Access frontend
Open http://localhost:3000 in browser
```

### 2. Test Features:
- Browse products on homepage
- Search for products
- Click product to view details
- Add to cart and manage quantities
- Register and login
- Add items to wishlist
- Proceed to checkout

### 3. View Logs:
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

---

## 📋 Submission Checklist

- [x] **Part A - Frontend**
  - [x] Product listing page with API
  - [x] Product cards (image, name, price, Add to Cart)
  - [x] Cart page with quantity and remove functionality
  - [x] State management using Context API
  - [x] Responsive design (pure CSS)
  - [x] Functional components only
  - [x] No UI libraries (Bootstrap, MUI, Ant)
  - [x] Clean folder structure
  
- [x] **Part B - Backend**
  - [x] GET /api/products endpoint
  - [x] POST /api/cart endpoint
  - [x] Validation middleware (validateCartItem, validateProductId, validatePagination)
  - [x] Proper error handling (global middleware)
  - [x] MongoDB database with 6 models
  - [x] Environment variables (.env)
  
- [x] **Part C - Docker**
  - [x] Dockerfile for frontend (multi-stage)
  - [x] Dockerfile for backend (with health checks)
  - [x] docker-compose.yml (MongoDB, Backend, Frontend)
  - [x] Runs with `docker-compose up`
  - [x] .dockerignore files for all services

- [x] **Submission Guidelines**
  - [x] README.md with comprehensive setup and Docker instructions
  - [x] GitHub repository initialized with git
  - [x] Meaningful git commits
  - [x] Screenshots/demo ready (optional)

---

## 🛠️ Troubleshooting

### Issue: Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Issue: MongoDB Connection Failed
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Verify connection string in .env matches docker-compose.yml
# MONGODB_URI=mongodb://admin:password@mongodb:27017/nexora_db?authSource=admin
```

### Issue: Frontend Can't Connect to Backend
```bash
# Check REACT_APP_API_URL in frontend/.env
REACT_APP_API_URL=http://localhost:5000/api

# Verify backend is running
curl http://localhost:5000/api/health
```

### Issue: Docker Image Build Fails
```bash
# Rebuild without cache
docker-compose build --no-cache

# Check Docker logs
docker-compose logs backend
docker-compose logs frontend
```

---

## 📚 Additional Resources

- **React Documentation**: https://react.dev
- **Express.js Guide**: https://expressjs.com
- **MongoDB Documentation**: https://docs.mongodb.com
- **Docker Documentation**: https://docs.docker.com
- **Docker Compose**: https://docs.docker.com/compose/

---

## 🎓 Learning Outcomes

This project demonstrates:
1. **Full-stack development** - Frontend to backend integration
2. **React fundamentals** - Hooks, routing, Context API
3. **Node.js/Express** - RESTful API design and validation
4. **Database design** - MongoDB schema and relationships
5. **Authentication** - JWT token-based security
6. **DevOps** - Docker containerization and orchestration
7. **Clean code** - Proper structure and meaningful commits
8. **Error handling** - Validation and exception management

---

## 📄 License

This project is part of the Naksh Jewels Internship Assessment.

---

## ✉️ Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review Docker logs: `docker-compose logs <service>`
3. Verify environment variables are set correctly
4. Check MongoDB connection string format
5. Ensure ports 3000, 5000, 27017 are available

---

**Last Updated:** February 2026  
**Version:** 1.0.0  
**Status:** ✅ Complete & Production Ready
- Consistent color scheme across all pages
- Smooth animations and transitions
- Professional hero section
- Card-based layouts

## 🎯 User Flow

### Guest User Flow:
1. Browse products on home page
2. Search and filter products
3. View product details with similar products
4. Add to cart or wishlist (guest mode)
5. Manage cart
6. Checkout (without login)
7. Receive order confirmation email

### Authenticated User Flow:
1. **Register/Login** - Create account or sign in
2. Browse products with personalized experience
3. Save items to wishlist (persisted per user)
4. View cart (linked to user account)
5. Checkout with saved information
6. Receive confirmation email
7. Logout when done

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Environment Variables**: Sensitive data protection
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Server-side validation
- **Error Handling**: Graceful error responses

## 🎨 Design Highlights

- **Color Palette**: Blue gradient theme (#1e3a8a to #3b82f6) for trust
- **Typography**: Clean, modern fonts with proper hierarchy
- **Spacing**: Consistent padding and margins (8px grid)
- **Animations**: Smooth transitions (0.3s ease)
- **Icons**: SVG icons for crisp display
- **Responsive**: Mobile-first approach with breakpoints

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (full features)
- **Tablet**: 481px - 768px (adjusted layouts)
- **Mobile**: ≤ 480px (single column, touch-optimized)

## 🚀 Competitive Advantages

1. **JWT Authentication** - Professional user management system
2. **Similar Products** - Increases engagement and sales
3. **Email Integration** - Professional order confirmations
4. **Wishlist Feature** - Enhanced user retention
5. **Advanced Search** - Improved product discovery
6. **Professional Design** - Trust-building theme
7. **Complete Features** - All essential e-commerce functionality
8. **Clean Code** - Well-organized, maintainable architecture
9. **Security** - Industry-standard authentication
10. **Scalable** - Ready for production deployment

## 📝 Future Enhancement Ideas

- Password reset functionality
- Social authentication (Google, Facebook)
- User profile editing
- Order history page with tracking
- Product reviews and ratings
- Recently viewed products
- Related products recommendations
- Payment gateway integration (Stripe)
---

## ✨ Code Quality

### Frontend Highlights
- ✅ **Functional Components Only** - All React components use hooks (no class components)
- ✅ **Context API** - Global state management without Redux
- ✅ **Pure CSS** - Custom styling (NO Bootstrap, MUI, Ant Design)
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Error Handling** - Try/catch blocks and error boundaries
- ✅ **Clean Code** - Meaningful variable names, modular structure

### Backend Highlights
- ✅ **Validation Middleware** - Input validation for all endpoints
- ✅ **Error Handling** - Global error middleware + route-level handling
- ✅ **Proper Architecture** - Separation of concerns (routes, models, middleware)
- ✅ **Security** - JWT authentication, password hashing, CORS
- ✅ **Database** - MongoDB with Mongoose models
- ✅ **API Design** - RESTful endpoints with proper HTTP methods

### DevOps Highlights
- ✅ **Multi-stage Builds** - Frontend optimized with build stage
- ✅ **Health Checks** - Auto-restart containers on failure
- ✅ **Networking** - Custom bridge network for service communication
- ✅ **Volume Persistence** - MongoDB data preserved across restarts
- ✅ **Alpine Images** - Minimal image sizes for faster deployment

---

## 🔍 Testing the Application

### 1. After `docker-compose up`:
```bash
# Test backend health
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Access frontend
Open http://localhost:3000 in browser
```

### 2. Test Features:
- Browse products on homepage
- Search for products
- Click product to view details
- Add to cart and manage quantities
- Register and login
- Add items to wishlist
- Proceed to checkout

### 3. View Logs:
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

---

## 📋 Submission Checklist

- [x] **Part A - Frontend**
  - [x] Product listing page with API
  - [x] Product cards (image, name, price, Add to Cart)
  - [x] Cart page with quantity and remove functionality
  - [x] State management using Context API
  - [x] Responsive design (pure CSS)
  - [x] Functional components only
  - [x] No UI libraries (Bootstrap, MUI, Ant)
  - [x] Clean folder structure
  
- [x] **Part B - Backend**
  - [x] GET /api/products endpoint
  - [x] POST /api/cart endpoint
  - [x] Validation middleware (validateCartItem, validateProductId, validatePagination)
  - [x] Proper error handling (global middleware)
  - [x] MongoDB database with 6 models
  - [x] Environment variables (.env)
  
- [x] **Part C - Docker**
  - [x] Dockerfile for frontend (multi-stage)
  - [x] Dockerfile for backend (with health checks)
  - [x] docker-compose.yml (MongoDB, Backend, Frontend)
  - [x] Runs with `docker-compose up`
  - [x] .dockerignore files for all services

- [x] **Submission Guidelines**
  - [x] README.md with comprehensive setup and Docker instructions
  - [x] GitHub repository initialized with git
  - [x] Meaningful git commits
  - [x] Screenshots/demo ready (optional)

---

## 🛠️ Troubleshooting

### Issue: Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Issue: MongoDB Connection Failed
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Verify connection string in .env matches docker-compose.yml
# MONGODB_URI=mongodb://admin:password@mongodb:27017/nexora_db?authSource=admin
```

### Issue: Frontend Can't Connect to Backend
```bash
# Check REACT_APP_API_URL in frontend/.env
REACT_APP_API_URL=http://localhost:5000/api

# Verify backend is running
curl http://localhost:5000/api/health
```

### Issue: Docker Image Build Fails
```bash
# Rebuild without cache
docker-compose build --no-cache

# Check Docker logs
docker-compose logs backend
docker-compose logs frontend
```

---

## 📚 Additional Resources

- **React Documentation**: https://react.dev
- **Express.js Guide**: https://expressjs.com
- **MongoDB Documentation**: https://docs.mongodb.com
- **Docker Documentation**: https://docs.docker.com
- **Docker Compose**: https://docs.docker.com/compose/

---

## 🎓 Learning Outcomes

This project demonstrates:
1. **Full-stack development** - Frontend to backend integration
2. **React fundamentals** - Hooks, routing, Context API
3. **Node.js/Express** - RESTful API design and validation
4. **Database design** - MongoDB schema and relationships
5. **Authentication** - JWT token-based security
6. **DevOps** - Docker containerization and orchestration
7. **Clean code** - Proper structure and meaningful commits
8. **Error handling** - Validation and exception management

---

## 📄 License

This project is part of the Naksh Jewels Internship Assessment.

---

## ✉️ Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review Docker logs: `docker-compose logs <service>`
3. Verify environment variables are set correctly
4. Check MongoDB connection string format
5. Ensure ports 3000, 5000, 27017 are available

---

**Last Updated:** February 2026  
**Version:** 1.0.0  
**Status:** ✅ Complete & Production Ready
