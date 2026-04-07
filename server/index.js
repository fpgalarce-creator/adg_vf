const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const productsPath = path.join(__dirname, 'data', 'products.json');
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    res.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Error loading products' });
  }
});

// Get featured products
app.get('/api/products/featured', (req, res) => {
  try {
    const productsPath = path.join(__dirname, 'data', 'products.json');
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const featured = products.filter(p => p.featured);
    res.json(featured);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Error loading products' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
