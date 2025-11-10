# AI Prompts Used for Generating ShopEase

This document contains the prompts and instructions used to generate various components of the ShopEase e-commerce platform.

---

## 1. Initial Project Setup Prompt

```
Build a full-stack MVP for a modern e-commerce website called "ShopEase" using React.js, Express.js, and MongoDB. 

The frontend should be responsive and feature:
- Home, Product Listing, Product Details, Cart, Login, Register, and Profile pages.
- Use React Router v6 for navigation and Context API for cart management.
- Implement JWT-based authentication with persistent login using localStorage.
- Include protected routes for Cart and Profile pages.
- Display dynamic cart count and total price.

The backend should:
- Use Node.js + Express with modular routing (authRoutes, productRoutes, cartRoutes).
- Include controllers and models for Users, Products, and Cart.
- Use MongoDB Compass with Mongoose schemas.
- Implement JWT auth, bcrypt password hashing, and CRUD operations for products and carts.

Ensure modern UI/UX design with Tailwind or Material UI, and mimic real e-commerce flow (like Amazon/Flipkart).
Structure the project in a modular, scalable way with separate frontend and backend folders.
```

---

## 2. Technical Architecture Documentation Prompt

```
readme should include the following:
1. Technical architecture documentation
```

**Generated Output:**
- System Architecture Overview (3-tier diagram)
- Technology Stack Tables
- Architectural Patterns (MVC, Component-Based, RESTful)
- Data Flow Architecture (Auth, Products, Cart)
- Database Schema Design
- Security Architecture
- State Management Documentation
- API Communication Patterns
- Build & Deployment Architecture
- Performance Optimizations
- Scalability Considerations
- Error Handling Strategy
- Development Workflow

---

## 3. Backend Architecture Prompts

### Authentication System
```
Implement JWT-based authentication with:
- User registration with email validation
- Login with password verification using bcrypt
- Token generation with 7-day expiration
- Protected route middleware
- Password hashing with 10 salt rounds
```

### Product Management
```
Create product CRUD operations with:
- Search functionality (name, description)
- Category filtering
- Price range filtering (min/max)
- Sorting options (latest, price_asc, price_desc, rating)
- Featured products endpoint
- Stock management
```

### Cart System
```
Implement shopping cart with:
- Add items to cart with quantity
- Update item quantities
- Remove individual items
- Clear entire cart
- Automatic total calculation
- Stock availability validation
- User-specific cart persistence
```

---

## 4. Frontend Architecture Prompts

### React Components
```
Create reusable components:
- Navbar with search, cart icon with count, user dropdown
- ProductCard with image, price, rating, add to cart button
- Footer with links and social media
- ProtectedRoute wrapper for authenticated pages
```

### Pages Structure
```
Build the following pages:
- Home: Hero section, category grid, featured products
- Products: Filters (category, price, sort), product grid, search
- ProductDetails: Image gallery, specifications, add to cart, quantity selector
- Cart: Item list, quantity controls, total calculation, checkout button
- Login/Register: Form validation, error handling, redirect on success
- Profile: Editable user information and address
```

### Context API State Management
```
Implement two contexts:
1. AuthContext:
   - User state, token state, loading state
   - login(), register(), logout(), updateProfile() methods
   - localStorage persistence for token
   - Automatic user loading on app mount

2. CartContext:
   - Cart items and total
   - addToCart(), updateCartItem(), removeFromCart(), clearCart() methods
   - Real-time cart count calculation
   - Sync with backend API
```

---

## 5. UI/UX Design Prompts

### Tailwind CSS Styling
```
Create modern, responsive design with:
- Mobile-first approach (sm, md, lg breakpoints)
- Color scheme: primary blue (#3b82f6), secondary green (#10b981)
- Consistent spacing and typography
- Hover effects and transitions
- Shadow and border radius for cards
- Responsive grid layouts (1 col mobile, 2 tablet, 4 desktop)
```

### User Experience
```
Implement UX patterns similar to Amazon/Flipkart:
- Product cards with images, pricing, discount badges
- Search bar in navbar
- Category navigation
- Star ratings display
- Cart with quantity increment/decrement
- Total price calculation
- "Out of Stock" indicators
- Loading spinners for async operations
```

---

## 6. Database Schema Prompts

### User Schema
```
Create User model with:
- name (required, trimmed)
- email (required, unique, lowercase, validated)
- password (required, min 6 chars, hashed, not selected by default)
- phone (optional)
- address object (street, city, state, zipCode, country)
- createdAt timestamp
- Pre-save hook for password hashing
- comparePassword method for login
```

### Product Schema
```
Create Product model with:
- name, description (required)
- price, originalPrice (numbers)
- category (enum: Electronics, Clothing, Books, etc.)
- brand, stock (number with min: 0)
- images array
- rating (0-5), numReviews
- isFeatured boolean
- createdAt timestamp
```

### Cart Schema
```
Create Cart model with:
- user reference (unique per user)
- items array with:
  - product reference
  - quantity (min: 1)
- updatedAt timestamp (auto-updated)
- Pre-save hook to update timestamp
```

---

## 7. API Endpoint Design Prompts

### RESTful Routes
```
Design API endpoints following REST principles:

Auth Routes (/api/auth):
- POST /register - Create new user
- POST /login - Authenticate user
- GET /me - Get current user (protected)
- PUT /profile - Update user profile (protected)

Product Routes (/api/products):
- GET / - Get all products with filters
- GET /featured/list - Get featured products
- GET /:id - Get single product
- POST / - Create product
- PUT /:id - Update product
- DELETE /:id - Delete product

Cart Routes (/api/cart):
- GET / - Get user cart (protected)
- POST / - Add item to cart (protected)
- PUT /:itemId - Update cart item (protected)
- DELETE /:itemId - Remove item (protected)
- DELETE / - Clear cart (protected)
```

---

## 8. Sample Data Generation Prompt

```
Create seed data with 12 diverse products:
- Mix of categories (Electronics, Clothing, Books, Home & Kitchen, Sports, Beauty, Toys)
- Include popular brands (Apple, Samsung, Nike, Levi's, etc.)
- Realistic prices with originalPrice for discounts
- Unsplash image URLs
- Ratings and review counts
- Stock quantities
- Mark some as featured
- Cover price range from $12 to $2499
```

---

## 9. Documentation Prompts

### README Generation
```
Create comprehensive README with:
- Project overview and features
- Technology stack
- Folder structure diagram
- Installation instructions (step-by-step)
- Usage guide with test scenarios
- API endpoint documentation
- Troubleshooting section
- Future enhancements
- Development commands
```

### Quick Start Guide
```
Create QUICKSTART.md with:
- 5-minute setup instructions
- Essential commands only
- Pre-requisites checklist
- Test scenarios
- Quick reference for common tasks
```

### API Documentation
```
Create API_DOCUMENTATION.md with:
- Base URL
- Authentication header format
- All endpoints grouped by resource
- Request/response examples
- Query parameters
- Error responses with status codes
- Notes on JWT expiration and protected routes
```

---

## 10. GitHub Repository Setup Prompts

### Repository Description
```
Create short, SEO-friendly GitHub description (50-80 chars):
- Include main technologies (MERN stack)
- Highlight key features (JWT auth, cart, responsive UI)
- Use emojis for visual appeal
- Keep it professional but engaging
```

### .gitignore
```
Create .gitignore for Node.js + React project:
- node_modules/
- dist/
- .env
- .DS_Store
- *.log
```

---

## 11. Performance & Security Prompts

### Security Implementation
```
Implement security best practices:
- CORS configuration for cross-origin requests
- JWT token verification middleware
- Password hashing with bcrypt (10 rounds)
- Email validation with regex
- Input sanitization
- Protected routes requiring authentication
- Token expiration (7 days)
```

### Error Handling
```
Create centralized error handling:
- Try-catch blocks in all async functions
- Consistent error response format
- HTTP status codes (200, 201, 400, 401, 404, 500)
- User-friendly error messages
- Server error logging
- Validation error messages
```

---

## 12. Additional Feature Prompts (Future Enhancements)

### Pagination
```
Add server-side pagination:
- Accept page and limit query parameters
- Calculate skip value: (page - 1) * limit
- Return total count for UI pagination
- Add pagination controls in frontend
```

### Order Management
```
Implement checkout and orders:
- Create Order model with user, items, total, status, address
- Order creation endpoint
- Get user's order history
- Admin order management
- Order status updates
```

### Admin Dashboard
```
Add admin functionality:
- Add role field to User model (user/admin)
- Admin middleware to check role
- Admin pages for product management
- Order management interface
- User management (view, delete)
```

### Reviews & Ratings
```
Add review system:
- Review model or embed in Product
- Create review endpoint (authenticated)
- Get product reviews
- Calculate average rating
- Review display on product page
```

### Wishlist
```
Implement wishlist feature:
- Wishlist model linking user to products
- Add/remove from wishlist endpoints
- Wishlist page in frontend
- Heart icon on product cards
```

### Email Notifications
```
Add Nodemailer for emails:
- Email config with transporter
- Order confirmation emails
- Welcome emails on registration
- Password reset functionality
- Use Ethereal for testing
```

---

## Tips for Using These Prompts

1. **Be Specific**: Include exact technologies, versions, and patterns you want
2. **Structure Clearly**: Break down complex features into smaller components
3. **Provide Examples**: Reference similar apps (Amazon, Flipkart) for context
4. **Specify Conventions**: Mention naming conventions, folder structure, code style
5. **Include Constraints**: Mention what to use/avoid (Context API vs Redux, etc.)
6. **Request Documentation**: Always ask for comments, README updates, or guides
7. **Iterate**: Start with MVP, then add features incrementally
8. **Test Instructions**: Ask for seed data, test scenarios, or demo credentials

---

## Prompt Engineering Best Practices Used

- ✅ Clear problem statement
- ✅ Specific technology requirements
- ✅ Feature breakdown (frontend/backend)
- ✅ Architecture preferences (modular, scalable)
- ✅ UI/UX references (real-world apps)
- ✅ Security requirements (JWT, bcrypt)
- ✅ Documentation requests
- ✅ Code organization preferences
- ✅ Testing and validation needs

---

*Generated for ShopEase E-Commerce Platform - November 2025*
