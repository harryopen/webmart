require('dotenv').config();
const mongoose = require('mongoose');

// Connection URL to your MongoDB Atlas database
const MONGO_URI = process.env.MONGO_URI;

// Product Model Definition
const Product = mongoose.model('Product', {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// Sample Products with stock: 1 for concurrency testing
const sampleProducts = [
  {
    id: 1,
    name: 'Striped Flutter Sleeve Overlap Collar Peplum Top',
    category: 'women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    new_price: 50.0,
    old_price: 80.5,
    stock: 1,
    available: true,
  },
  {
    id: 2,
    name: 'Floral Print Puff Sleeve Casual Top',
    category: 'women',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500',
    new_price: 85.0,
    old_price: 120.5,
    stock: 1,
    available: true,
  },
  {
    id: 3,
    name: 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket',
    category: 'men',
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=500',
    new_price: 60.0,
    old_price: 100.5,
    stock: 1,
    available: true,
  },
  {
    id: 4,
    name: 'Boys Orange Colourblocked Hooded Sweatshirt',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
    new_price: 45.0,
    old_price: 75.0,
    stock: 1,
    available: true,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${sampleProducts.length} products!`);

    await mongoose.disconnect();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
