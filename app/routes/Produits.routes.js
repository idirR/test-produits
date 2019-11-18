module.exports = (app) => {
    const produits = require('../controllers/Produits.controller.js');

    // Create a new produts
    app.post('/Produits', produits.create);

    // Retrieve all produts
    app.get('/Produits', produits.findAll);

    // Retrieve a single produts with produtsId
    app.get('/Produits/:Id', produits.findOne);

    // Update a produts with produtsId
    app.put('/Produits/:Id', produits.update);

    // Delete a produts with produtsId
    app.delete('/Produits/:Id', produits.delete);
}

