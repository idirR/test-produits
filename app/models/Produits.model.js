const mongoose = require('mongoose');

const Produits = mongoose.Schema({
    _id:String,
    name: String,
    type: String,
    price: String,
    rating: String,
    warranty_years: String,
    available: String
});

module.exports = mongoose.model('Produits', Produits);