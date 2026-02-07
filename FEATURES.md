# Vibe Commerce - Feature Documentation

## Recently Implemented Features

### 1. **Product Reviews & Ratings** ✅
Complete review system allowing authenticated users to share feedback on products.

**Features:**
- ⭐ 5-star rating system with interactive star selection
- 💬 Written comments with character validation
- 👍 Helpful voting system for reviews
- 📊 Average rating calculation and display
- 🔒 Authentication required for submitting/deleting reviews
- 🎨 Beautiful UI with user avatars and timestamps

**Files:**
- Backend: `backend/models/Review.js`, `backend/routes/reviews.js`
- Frontend: `frontend/src/components/ProductReviews.js`, `frontend/src/components/ProductReviews.css`

**API Endpoints:**
- `GET /api/reviews/:productId` - Get all reviews for a product
- `POST /api/reviews` - Submit a new review (auth required)
- `PUT /api/reviews/:reviewId/helpful` - Mark review as helpful
- `DELETE /api/reviews/:reviewId` - Delete own review (auth required)

---

### 2. **Recently Viewed Products** ✅
Automatic tracking of products viewed by users to enhance discovery.

**Features:**
- 📍 Tracks last 10 viewed products in localStorage
- 🔄 Displays recently viewed on product detail pages
- 🎯 Smart filtering (excludes current product)
- 📱 Responsive grid layout (max 4 displayed)
- 💾 Persists across sessions

**Files:**
- Frontend: `frontend/src/components/RecentlyViewed.js`, `frontend/src/components/RecentlyViewed.css`
- Integration: `frontend/src/pages/ProductDetailPage.js` (saveToRecentlyViewed function)

**Storage:**
- localStorage key: `recentlyViewed`
- Format: Array of product objects with id, name, price, image, category

---

### 3. **Order Tracking Page** ✅
Dedicated page for authenticated users to view their complete order history.

**Features:**
- 📋 Complete order history with timeline
- 🔢 Unique order numbers for tracking
- 📊 Order status badges (Completed, Pending, Shipped)
- 📦 Detailed item breakdown with images
- 💰 Total calculation per order
- 👤 Customer information display
- 🔒 Authentication required
- 📧 Email confirmation integration

**Files:**
- Frontend: `frontend/src/pages/OrdersPage.js`, `frontend/src/pages/OrdersPage.css`
- Backend: `backend/routes/checkout.js` (GET /orders endpoint)
- Navigation: Updated `frontend/src/components/Header.js` with Orders link

**API Endpoints:**
- `GET /api/checkout/orders` - Get user's order history (auth required)

**Order Status Types:**
- **Completed**: Order successfully processed
- **Pending**: Payment/processing in progress
- **Shipped**: Order dispatched for delivery

---

## Authentication System

### JWT Authentication ✅
Secure user authentication with token-based authorization.

**Features:**
- 🔐 Password hashing with bcryptjs
- 🎟️ JWT token generation and validation
- 🔒 Protected routes for authenticated actions
- 👤 User registration and login
- 🔓 Logout functionality
- 💾 Token stored in localStorage

**Files:**
- Backend: `backend/routes/auth.js`, `backend/middleware/auth.js`
- Frontend: `frontend/src/pages/LoginPage.js`, `frontend/src/pages/RegisterPage.js`
- Service: `frontend/src/services/api.js` (axios interceptors)

---

## Shopping Cart System

### Individual Carts with Guest Support ✅
Flexible cart system supporting both authenticated users and guests.

**Features:**
- 👤 Individual carts per user
- 🕵️ Guest cart support (no login required)
- 🔐 Login required at checkout
- 🔄 Automatic cart merging on login
- 💾 Persistent storage (MongoDB + localStorage)
- ✅ Real-time cart count in header

**Cart Flow:**
1. **Guest User**: Add items to cart → Unique session ID generated → Stored in localStorage
2. **Login/Register**: Guest cart merges with user cart → Session ID cleared
3. **Checkout**: Authentication required → Order created → Cart cleared

**Files:**
- Backend: `backend/models/Cart.js`, `backend/routes/cart.js`
- Frontend: `frontend/src/pages/CartPage.js`, `frontend/src/services/api.js`

---

## Product Features

### Similar Products Recommendation ✅
Category-based product recommendations on detail pages.

**Features:**
- 🎯 Shows products from same category
- 🔀 Randomized selection (max 4 products)
- 🚫 Excludes current product
- 🖼️ Carousel/grid display

**API Endpoint:**
- `GET /api/products/:id/similar` - Get similar products

---

## Email Integration

### Order Confirmation Emails ✅
Automated email notifications using Resend service.

**Features:**
- 📧 Automatic order confirmation emails
- 📊 Detailed order summary with items
- 💰 Total amount and order number
- 🎨 HTML formatted emails

**Service:**
- Provider: Resend (resend.com)
- File: `backend/services/emailService.js`
- Environment: `RESEND_API_KEY` in `.env`

---

## Tech Stack

### Backend
- Node.js with Express 4.18.2
- MongoDB with Mongoose 8.0.0
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- Resend 3.0.0 for emails

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.6.0 for API calls
- CSS3 with modern gradients and animations

---

## Getting Started

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# RESEND_API_KEY=your_resend_api_key
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The app will run on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

---

## User Journey

1. **Browse Products**: View all products on homepage with categories
2. **Product Details**: Click product → See details, reviews, similar products, recently viewed
3. **Add to Cart**: Add items (no login required)
4. **Wishlist**: Save favorites for later
5. **Checkout**: Login required → Fill details → Order created → Email sent
6. **View Orders**: Navigate to Orders page → See complete history
7. **Leave Review**: After purchase → Rate and review products

---

## Security Features

- ✅ Password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Email validation
- ✅ User-specific data isolation
- ✅ Secure cart management

---

## Future Enhancements (Optional)

- 🔍 Advanced search and filtering
- 📱 Mobile app version
- 💳 Payment gateway integration
- 📦 Shipping tracking
- 🎁 Discount codes and promotions
- 📸 Product image gallery
- 🌍 Multi-language support
- 📊 Admin dashboard
- 🔔 Real-time notifications
- ⭐ Featured/trending products

---

**Last Updated**: January 2025
**Version**: 1.0.0
