module.exports = (app) => {
    const produits = require('../controllers/Produits.controller.js');

    // Create a new produts
    app.post('/produits', produits.create);

    // Create a new produts
    app.post('/produits/_bulk', produits.createBulk);

    // Retrieve all produts
    app.get('/produits', produits.findAll);

    // Retrieve a single produts with produtsId
    app.get('/produits/:id', produits.findOne);

    // Update a produts with produtsId
    app.put('/produits/:id', produits.update);

    // Delete a produts with produtsId
    app.delete('/produits/:id', produits.delete);
}

