# ShopEase - Modern E-Commerce Platform

A full-stack e-commerce web application built with React.js, Express.js, and MongoDB. Features a modern UI with Tailwind CSS, JWT authentication, and complete cart management.

## � Technical Architecture Documentation

### System Architecture Overview

ShopEase follows a modern **three-tier architecture**:

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER (Client)                  │
│  React 18 + Vite + Tailwind CSS + React Router v6              │
│  Port: 3000                                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTP/HTTPS
                        (Axios API Calls)
┌─────────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER (Server)                     │
│  Node.js + Express.js + JWT Authentication                      │
│  Port: 5000                                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓ Mongoose ODM
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER (Database)                       │
│  MongoDB (NoSQL Document Database)                              │
│  Port: 27017                                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI component library |
| React Router | 6.15.0 | Client-side routing & navigation |
| Vite | 4.4.9 | Build tool & dev server |
| Tailwind CSS | 3.3.3 | Utility-first CSS framework |
| Axios | 1.5.0 | HTTP client for API requests |
| React Icons | 4.11.0 | Icon library |

#### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 14+ | JavaScript runtime |
| Express.js | 4.18.2 | Web application framework |
| MongoDB | Latest | NoSQL database |
| Mongoose | 7.5.0 | MongoDB ODM |
| JWT | 9.0.2 | Token-based authentication |
| bcryptjs | 2.4.3 | Password hashing |
| CORS | 2.8.5 | Cross-origin resource sharing |
| dotenv | 16.3.1 | Environment variable management |

### Architectural Patterns

#### 1. **MVC Pattern (Backend)**
```
Model (Data Layer)
├── User.js      - User schema & business logic
├── Product.js   - Product schema & validations
└── Cart.js      - Cart schema & relationships

View (API Response)
└── JSON responses with consistent structure

Controller (Business Logic)
├── authController.js    - Authentication operations
├── productController.js - Product CRUD operations
└── cartController.js    - Cart management logic
```

#### 2. **Component-Based Architecture (Frontend)**
```
App.jsx (Root)
├── Context Providers (Global State)
│   ├── AuthContext    - User authentication state
│   └── CartContext    - Shopping cart state
├── Router
│   ├── Public Routes
│   │   ├── Home
│   │   ├── Products
│   │   ├── ProductDetails
│   │   ├── Login
│   │   └── Register
│   └── Protected Routes (Auth Required)
│       ├── Cart
│       └── Profile
└── Shared Components
    ├── Navbar
    ├── Footer
    ├── ProductCard
    └── ProtectedRoute
```

#### 3. **RESTful API Design**
All API endpoints follow REST principles:
- **Resources**: `/api/auth`, `/api/products`, `/api/cart`
- **HTTP Methods**: GET (read), POST (create), PUT (update), DELETE (remove)
- **Status Codes**: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)
- **JSON Format**: Consistent response structure with `success`, `data`, and `message` fields

### Data Flow Architecture

#### Authentication Flow
```
1. User Registration/Login
   ↓
2. Backend validates credentials & hashes password (bcrypt)
   ↓
3. JWT token generated with user ID payload
   ↓
4. Token sent to frontend in response
   ↓
5. Frontend stores token in localStorage
   ↓
6. Token included in Authorization header for protected routes
   ↓
7. Middleware verifies token on each protected request
```

#### Product Browsing Flow
```
Frontend Request
   ↓
GET /api/products?category=Electronics&sort=price_asc
   ↓
Express Router → productController.getProducts()
   ↓
Mongoose Query with filters & sorting
   ↓
MongoDB returns matching documents
   ↓
Controller formats response
   ↓
JSON sent to frontend
   ↓
React renders ProductCard components
```

#### Cart Management Flow
```
User adds product to cart
   ↓
Frontend: cartContext.addToCart(productId, quantity)
   ↓
POST /api/cart with JWT token
   ↓
Middleware verifies user authentication
   ↓
Controller checks product availability
   ↓
Update or create cart document in MongoDB
   ↓
Populate product details
   ↓
Calculate total price
   ↓
Return updated cart to frontend
   ↓
Context updates global cart state
   ↓
UI reflects changes (cart count, total)
```

### Database Schema Design

#### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, validated),
  password: String (hashed with bcrypt, not selected by default),
  phone: String (optional),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  createdAt: Date (auto-generated)
}
```

#### Product Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  originalPrice: Number (optional),
  category: String (enum: Electronics, Clothing, Books, etc.),
  brand: String,
  stock: Number (required, min: 0),
  images: [String] (array of image URLs),
  rating: Number (0-5),
  numReviews: Number,
  isFeatured: Boolean,
  createdAt: Date (auto-generated)
}
```

#### Cart Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, unique),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number (min: 1)
  }],
  updatedAt: Date (auto-updated on save)
}
```

### Security Architecture

#### 1. **Authentication Security**
- Passwords hashed using bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Tokens stored in localStorage (client-side)
- Authorization header: `Bearer <token>`

#### 2. **API Security**
- CORS enabled for cross-origin requests
- Protected routes require valid JWT
- Middleware validates token on each request
- User context attached to `req.user` after validation

#### 3. **Data Validation**
- Mongoose schema validation (required fields, type checking, enums)
- Email format validation with regex
- Password minimum length enforcement
- Stock availability checks before cart operations

### State Management

#### Frontend State Architecture
```
Global State (Context API)
├── AuthContext
│   ├── user (current user object)
│   ├── token (JWT token)
│   ├── loading (auth check in progress)
│   └── Methods: login(), register(), logout(), updateProfile()
│
└── CartContext
    ├── cart (items array, total)
    ├── loading (cart operation in progress)
    └── Methods: addToCart(), updateCartItem(), removeFromCart(), clearCart()

Local State (Component useState)
├── Form data (inputs, validation)
├── UI state (modals, dropdowns)
└── Fetched data (product lists, details)
```

### API Communication

#### Request/Response Pattern
```javascript
// Frontend Request
axios.get('/api/products', {
  headers: { Authorization: `Bearer ${token}` },
  params: { category: 'Electronics', sort: 'price_asc' }
})

// Backend Processing
Express Router → Controller → Mongoose → MongoDB

// Response Format
{
  success: true,
  count: 10,
  products: [...],
  // or
  message: "Error message"
}
```

### Build & Deployment Architecture

#### Development Environment
- **Frontend**: Vite dev server with HMR (Hot Module Replacement)
- **Backend**: Nodemon for auto-restart on file changes
- **Proxy**: Vite proxies `/api` requests to `http://localhost:5000`

#### Production Build
```
Frontend Build Process:
1. npm run build (Vite)
2. Output: dist/ folder with optimized assets
3. Deploy to: Netlify, Vercel, or static hosting

Backend Deployment:
1. Set NODE_ENV=production
2. Use production MongoDB URI
3. Deploy to: Heroku, Railway, Render, or VPS
```

### Performance Optimizations

1. **Frontend**
   - Code splitting with React.lazy (potential enhancement)
   - Image optimization (placeholder URLs used)
   - Tailwind CSS purging in production builds
   - Vite's optimized bundling

2. **Backend**
   - MongoDB indexing on frequently queried fields (email, category)
   - Mongoose query optimization with select() and populate()
   - Connection pooling for MongoDB

3. **Caching Strategy** (Future Enhancement)
   - Redis for session storage
   - CDN for static assets
   - API response caching

### Scalability Considerations

1. **Horizontal Scaling**
   - Stateless backend (JWT tokens, no sessions)
   - Multiple server instances behind load balancer
   - MongoDB replica sets for high availability

2. **Microservices Potential**
   - Auth service
   - Product service
   - Order service
   - Payment service

3. **Database Optimization**
   - Indexing on email, category, price
   - Query performance monitoring
   - Pagination for large datasets

### Error Handling Strategy

```
Frontend Error Handling
├── API errors caught in try-catch
├── User-friendly error messages displayed
└── Fallback UI for failed states

Backend Error Handling
├── Centralized error middleware
├── HTTP status codes for different error types
├── Detailed error logging to console
└── Sanitized error messages to client
```

### Development Workflow

```
1. Local Development
   ├── MongoDB running on localhost:27017
   ├── Backend on localhost:5000
   └── Frontend on localhost:3000

2. Version Control (Git)
   ├── .gitignore for node_modules, .env
   └── Feature branches → main branch

3. Testing Strategy
   ├── Manual testing during development
   ├── API testing with Postman/Thunder Client
   └── Future: Jest + React Testing Library

4. Deployment Pipeline
   ├── Push to GitHub
   ├── CI/CD (optional: GitHub Actions)
   └── Deploy to production hosting
```

## �🚀 Features

### Frontend
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Pages**: Home, Product Listing, Product Details, Cart, Login, Register, Profile
- **React Router v6**: Client-side routing with protected routes
- **Context API**: Global state management for authentication and cart
- **JWT Authentication**: Persistent login with localStorage
- **Dynamic Cart**: Real-time cart count and total price updates
- **Product Features**: Search, filtering, sorting, categories

### Backend
- **RESTful API**: Express.js with modular routing
- **MongoDB**: NoSQL database with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Models**: Users, Products, Cart with proper schemas
- **CRUD Operations**: Complete product and cart management
- **Middleware**: Authentication and error handling

## 📁 Project Structure

```
ShopEase/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── productController.js  # Product operations
│   │   └── cartController.js     # Cart management
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   └── Cart.js              # Cart schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── productRoutes.js     # Product endpoints
│   │   └── cartRoutes.js        # Cart endpoints
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   ├── seed.js                   # Sample data seeder
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   ├── Footer.jsx        # Footer component
    │   │   ├── ProductCard.jsx   # Product display card
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Authentication context
    │   │   └── CartContext.jsx   # Cart context
    │   ├── pages/
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── Products.jsx      # Product listing
    │   │   ├── ProductDetails.jsx # Single product view
    │   │   ├── Cart.jsx          # Shopping cart
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   └── Profile.jsx       # User profile
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- MongoDB Compass (optional, for GUI)
- npm or yarn

### Step 1: Clone or Navigate to Project
```bash
cd ShopEase
```

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file
   - Update MongoDB URI if needed:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shopease
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. Start MongoDB:
   - **Windows**: Open MongoDB Compass or start MongoDB service
   - **Mac/Linux**: `sudo service mongod start` or `mongod`

5. Seed the database with sample products:
```bash
node seed.js
```

6. Start the backend server:
```bash
npm run dev
```
The backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`

## 🎯 Usage

### Accessing the Application
- Open your browser and go to `http://localhost:3000`

### Testing the Application

#### 1. Browse Products
- Visit the home page to see featured products
- Click "Products" in the navbar to view all products
- Use search, filters, and sorting options

#### 2. Create an Account
- Click "Register" in the navbar
- Fill in your details:
  - Name
  - Email
  - Password (min 6 characters)
  - Phone (optional)
- Click "Create account"

#### 3. Login
- Click "Login" in the navbar
- Enter your credentials
- You'll be automatically logged in after registration

#### 4. Add Products to Cart
- Browse products and click "Add to Cart"
- Cart count will update in the navbar
- You must be logged in to add items to cart

#### 5. Manage Cart
- Click the cart icon in navbar
- Update quantities using +/- buttons
- Remove items with the trash icon
- Clear entire cart if needed
- View total price

#### 6. Update Profile
- Click your name in navbar → "My Profile"
- Click "Edit Profile"
- Update your information and address
- Click "Save Changes"

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item (protected)
- `DELETE /api/cart/:itemId` - Remove from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

## 🎨 Technologies Used

### Frontend
- **React 18.2.0** - UI library
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected routes (Cart, Profile)
- Token stored in localStorage
- Authorization headers for API calls
- Input validation

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🎭 Sample Data

The seed file includes 12 sample products across categories:
- Electronics (iPhone, Samsung Galaxy, MacBook, Sony Headphones, Kindle)
- Clothing (Levi's Jeans)
- Sports (Nike Air Max)
- Home & Kitchen (Instant Pot, Dyson Vacuum)
- Books (The Great Gatsby)
- Toys (LEGO Star Wars)
- Beauty (L'Oreal Face Cream)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MongoDB URI in `.env`
- Try: `mongodb://127.0.0.1:27017/shopease` instead of localhost

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Change port in `vite.config.js`

### CORS Errors
- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.js`

### Authentication Issues
- Clear localStorage: `localStorage.clear()` in browser console
- Check JWT_SECRET in `.env`

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use strong JWT_SECRET
3. Update MongoDB URI to production database
4. Deploy to Heroku, Railway, or Render

### Frontend
1. Build the app: `npm run build`
2. Deploy `dist` folder to Netlify, Vercel, or similar
3. Update API URLs for production

## 📝 Future Enhancements

- Payment integration (Stripe/PayPal)
- Order management system
- Product reviews and ratings
- Admin dashboard
- Email notifications
- Wishlist functionality
- Product recommendations
- Multiple product images
- Advanced search with filters
- Order history

## 👨‍💻 Development

### Run Backend in Development
```bash
cd backend
npm run dev
```

### Run Frontend in Development
```bash
cd frontend
npm run dev
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

**Happy Shopping! 🛍️**
