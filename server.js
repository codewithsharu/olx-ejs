// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set views directory
app.use(express.static(path.join(__dirname, 'public')));
console.log('Serving static files from:', path.join(__dirname, 'public'));
// Connect to MongoDB
mongoose.connect('mongodb+srv://shareenpan2:Fgouter55@cluster0.s3dpu.mongodb.net/olx?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema and model for products
const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    images: [String],
    price: Number,
    mrp: Number,
    category: String,
    description: String,
    stock: Number
});

const Product = mongoose.model('Product', productSchema);

// Route to render products
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

// API endpoint to get products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to render the add product form
app.get('/add-product', (req, res) => {
    const productId = generateProductId(); // Generate a random product ID
    res.render('addProduct', { productId });
});

// Function to generate a random product ID
function generateProductId() {
    const randomNum = Math.floor(Math.random() * 1000) + 1; // Random number between 1 and 1000
    return `PRO${String(randomNum).padStart(3, '0')}`; // Format as PRO001, PRO002, etc.
}

// Route to handle form submission
app.post('/products', async (req, res) => {
    try {
        const { name, images, price, mrp, category, description, stock, status, payment } = req.body;
        const productId = parseInt(req.body.id.replace('PRO', '')); // Convert to Number by removing "PRO"
        
        const product = new Product({
            id: productId, // Use the numeric ID
            name,
            images: [req.body.images[0], req.body.images[1], req.body.images[2], req.body.images[3]], // Collecting image URLs
            price,
            mrp,
            category,
            description,
            stock,
            status,
            payment
        });
        await product.save();
        res.status(201).send('Product added successfully!');
    } catch (error) {
        res.status(500).send('Error adding product: ' + error.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});