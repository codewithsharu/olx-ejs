// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    images: { type: [String], required: true }, // Array of image URLs
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    status: { type: String, required: true }, 
    payment: { type: String, required: true } 
});

module.exports = mongoose.model('Product', productSchema);