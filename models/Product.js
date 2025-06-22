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
    payment: { type: String, required: true },
    buildQuality: { type: Number }, // Renamed field 1
    scratches: { type: Number }, // Renamed field 2
    daysBuying: { type: Number }, // Renamed field 3
    minorProblems: { type: Number }  // Renamed field 4
});

module.exports = mongoose.model('Product', productSchema);