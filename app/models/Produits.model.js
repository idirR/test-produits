const mongoose = require('mongoose');

const Produits = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: String,
    type: String,
    price: String,
    rating: String,
    warranty_years: String,
    available: String
});

module.exports = mongoose.model('Produits', Produits);