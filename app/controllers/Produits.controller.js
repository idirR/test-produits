//import React {compenent} from 'react';

const Produits = require('../models/Produits.model.js');

// Create and Save a new produts
exports.create = (req, res) => {
    // Validate request
    if(!req.body.type) {
        return res.status(400).send({
            message: "produts content can not be empty"
        });
    }

    // Create a produts
    const produits = new Produits({
        _id: req.body._id || "Untitled produts",
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warranty_year: req.body.warranty_year
    });

    // Save produts in the database
    produits.save()
    .then(data => {
        res.send(data);
        

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the produts."
        });
    });

    
    //#######################################################
};

// Retrieve and return all produts from the database.
exports.findAll = (req, res) => {
    Produits.find()
    .then(Produits => {
        res.send(Produits);
        
       
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving produts."
        });
    });
    //#######################################################
    
};

// Find a single produts with a produtsId
exports.findOne = (req, res) => {
    Produits.findById(req.params.Id)
    .then(Produits => {
        if(!Produits) {
            return res.status(404).send({
                message: "produts not found with id " + req.params.Id
            });            
        }
        res.send(Produits);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "produts not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving produts with id " + req.params.Id
        });
    });
    //#######################################################
};

// Update a produts identified by the produtsId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.type) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find produts and update it with the request body
    Produits.findByIdAndUpdate(req.params.Id, {
        name: req.body.name|| "Untitled produts",
        content: req.body.type
    }, {new: true})
    .then(Produits => {
        if(!Produits) {
            return res.status(404).send({
                message: "produts not found with id " + req.params.Id
            });
        }
        res.send(Produits);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "produts not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Error updating produts with id " + req.params.Id
        });
    });
    //#######################################################
};

// Delete a produts with the specified produtsId in the request
exports.delete = (req, res) => {
    Produits.findByIdAndRemove(req.params.Id)
    .then(Produits => {
        if(!Produits) {
            return res.status(404).send({
                message: "produts not found with id " + req.params.Id
            });
        }
        res.send({message: "produts deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "produts not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete produts with id " + req.params.Id
        });
    });
    //#######################################################
};


