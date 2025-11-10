const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'iPhone 14 Pro',
    description: 'Latest Apple iPhone with advanced camera system and A16 Bionic chip',
    price: 999,
    originalPrice: 1099,
    category: 'Electronics',
    brand: 'Apple',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500'],
    rating: 4.8,
    numReviews: 245,
    isFeatured: true,
  },
  {
    name: 'Samsung Galaxy S23',
    description: 'Premium Android smartphone with excellent display and camera',
    price: 849,
    originalPrice: 949,
    category: 'Electronics',
    brand: 'Samsung',
    stock: 45,
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'],
    rating: 4.6,
    numReviews: 189,
    isFeatured: true,
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling wireless headphones',
    price: 349,
    originalPrice: 399,
    category: 'Electronics',
    brand: 'Sony',
    stock: 100,
    images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'],
    rating: 4.9,
    numReviews: 312,
    isFeatured: true,
  },
  {
    name: 'MacBook Pro 16"',
    description: 'Powerful laptop with M2 Pro chip, perfect for professionals',
    price: 2499,
    originalPrice: 2699,
    category: 'Electronics',
    brand: 'Apple',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    rating: 4.9,
    numReviews: 167,
    isFeatured: true,
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable and stylish running shoes with Max Air cushioning',
    price: 150,
    originalPrice: 180,
    category: 'Sports',
    brand: 'Nike',
    stock: 150,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    rating: 4.5,
    numReviews: 523,
    isFeatured: true,
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'Classic straight fit jeans, timeless style',
    price: 69,
    originalPrice: 89,
    category: 'Clothing',
    brand: 'Levi\'s',
    stock: 200,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
    rating: 4.4,
    numReviews: 412,
    isFeatured: false,
  },
  {
    name: 'Kindle Paperwhite',
    description: 'Waterproof e-reader with high-resolution display',
    price: 139,
    originalPrice: 159,
    category: 'Electronics',
    brand: 'Amazon',
    stock: 80,
    images: ['https://images.unsplash.com/photo-1592422956891-f83c8b3c0a39?w=500'],
    rating: 4.7,
    numReviews: 892,
    isFeatured: true,
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12,
    originalPrice: 15,
    category: 'Books',
    brand: 'Scribner',
    stock: 300,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
    rating: 4.6,
    numReviews: 1245,
    isFeatured: false,
  },
  {
    name: 'Instant Pot Duo',
    description: '7-in-1 electric pressure cooker, perfect for quick meals',
    price: 89,
    originalPrice: 119,
    category: 'Home & Kitchen',
    brand: 'Instant Pot',
    stock: 60,
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=500'],
    rating: 4.7,
    numReviews: 2341,
    isFeatured: true,
  },
  {
    name: 'Dyson V11 Vacuum',
    description: 'Powerful cordless vacuum cleaner with intelligent cleaning',
    price: 599,
    originalPrice: 699,
    category: 'Home & Kitchen',
    brand: 'Dyson',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'],
    rating: 4.8,
    numReviews: 678,
    isFeatured: false,
  },
  {
    name: 'LEGO Star Wars Set',
    description: 'Build your own Millennium Falcon with 1351 pieces',
    price: 159,
    originalPrice: 179,
    category: 'Toys',
    brand: 'LEGO',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500'],
    rating: 4.9,
    numReviews: 234,
    isFeatured: false,
  },
  {
    name: 'L\'Oreal Face Cream',
    description: 'Revitalizing anti-aging day cream with SPF 30',
    price: 24,
    originalPrice: 29,
    category: 'Beauty',
    brand: 'L\'Oreal',
    stock: 180,
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
    rating: 4.3,
    numReviews: 567,
    isFeatured: false,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');

    // Clear existing products
    await Product.deleteMany();
    console.log('Products cleared');

    // Insert sample products
    await Product.insertMany(products);
    console.log('Sample products added');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
