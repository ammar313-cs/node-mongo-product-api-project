const mongoose = require('mongoose');

const productViewSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
  });
  
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    views: [productViewSchema],  // Embedded time series wit the prod
  });
  

module.exports = mongoose.model('Product', productSchema);