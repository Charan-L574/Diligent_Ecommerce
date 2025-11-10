# ShopEase API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

---

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

---

### Get Current User
**GET** `/auth/me`  
🔒 **Protected Route**

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }
}
```

---

### Update Profile
**PUT** `/auth/profile`  
🔒 **Protected Route**

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "address": {
    "street": "456 Oak Ave",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "country": "USA"
  }
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": {
      "street": "456 Oak Ave",
      "city": "Los Angeles",
      "state": "CA",
      "zipCode": "90001",
      "country": "USA"
    }
  }
}
```

---

## 📦 Product Endpoints

### Get All Products
**GET** `/products`

**Query Parameters:**
- `category` - Filter by category (Electronics, Clothing, etc.)
- `search` - Search in name and description
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort by: `latest`, `price_asc`, `price_desc`, `rating`

**Example:**
```
GET /products?category=Electronics&minPrice=100&maxPrice=1000&sort=price_asc
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "products": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "iPhone 14 Pro",
      "description": "Latest Apple iPhone...",
      "price": 999,
      "originalPrice": 1099,
      "category": "Electronics",
      "brand": "Apple",
      "stock": 50,
      "images": ["https://..."],
      "rating": 4.8,
      "numReviews": 245,
      "isFeatured": true
    }
  ]
}
```

---

### Get Featured Products
**GET** `/products/featured/list`

**Response:**
```json
{
  "success": true,
  "count": 8,
  "products": [...]
}
```

---

### Get Single Product
**GET** `/products/:id`

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "iPhone 14 Pro",
    "description": "Latest Apple iPhone...",
    "price": 999,
    "originalPrice": 1099,
    "category": "Electronics",
    "brand": "Apple",
    "stock": 50,
    "images": ["https://..."],
    "rating": 4.8,
    "numReviews": 245,
    "isFeatured": true
  }
}
```

---

### Create Product
**POST** `/products`

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "originalPrice": 129.99,
  "category": "Electronics",
  "brand": "Brand Name",
  "stock": 100,
  "images": ["https://..."],
  "rating": 4.5,
  "numReviews": 10,
  "isFeatured": false
}
```

**Response:**
```json
{
  "success": true,
  "product": {...}
}
```

---

### Update Product
**PUT** `/products/:id`

**Request Body:**
```json
{
  "price": 89.99,
  "stock": 150
}
```

**Response:**
```json
{
  "success": true,
  "product": {...}
}
```

---

### Delete Product
**DELETE** `/products/:id`

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 🛒 Cart Endpoints

### Get User Cart
**GET** `/cart`  
🔒 **Protected Route**

**Response:**
```json
{
  "success": true,
  "cart": {
    "items": [
      {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "product": {
          "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
          "name": "iPhone 14 Pro",
          "price": 999,
          "images": ["https://..."],
          "brand": "Apple",
          "stock": 50
        },
        "quantity": 2
      }
    ],
    "total": 1998
  }
}
```

---

### Add Item to Cart
**POST** `/cart`  
🔒 **Protected Route**

**Request Body:**
```json
{
  "productId": "64a1b2c3d4e5f6g7h8i9j0k2",
  "quantity": 1
}
```

**Response:**
```json
{
  "success": true,
  "cart": {
    "items": [...],
    "total": 1998
  }
}
```

---

### Update Cart Item
**PUT** `/cart/:itemId`  
🔒 **Protected Route**

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response:**
```json
{
  "success": true,
  "cart": {
    "items": [...],
    "total": 2997
  }
}
```

---

### Remove Item from Cart
**DELETE** `/cart/:itemId`  
🔒 **Protected Route**

**Response:**
```json
{
  "success": true,
  "cart": {
    "items": [...],
    "total": 999
  }
}
```

---

### Clear Cart
**DELETE** `/cart`  
🔒 **Protected Route**

**Response:**
```json
{
  "success": true,
  "cart": {
    "items": [],
    "total": 0
  }
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "User already exists"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Prices are in USD
- Images URLs should be valid and accessible
- JWT tokens expire after 7 days (configurable)
- Protected routes require valid JWT token
