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

    console.log(req.body)

    // Create a produts
    const produits = new Produits({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warranty_years: req.body.warrantyYears,
        available: req.body.available
    });

    // Save produts in the database
    produits.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Some error occurred while creating the produts."
        });
    });

    
    //#######################################################
};

// Create from array
exports.createBulk = async (req, res) => {
    // Validate request
    if(!req.body.docs) {
        return res.status(400).send({
            message: "produts content can not be empty"
        });
    }

    try {
        const { docs } = req.body;
        for (let i=0; i<docs.length; i++) {
            const doc = docs[i];
            const produits = new Produits({
                name: doc.name,
                type: doc.type,
                price: doc.price,
                rating: doc.rating,
                warranty_years: doc.warranty_years,
                available: doc.available
            }); 
            await produits.save();       
        }
        res.status(200).json({
            message: 'Data successfully saved'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Server error'
        });
    }
};

// Retrieve and return all produts from the database.
exports.findAll = (req, res) => {
    Produits.find().sort({
        createdAt: -1
    }).then(Produits => {
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
    const body = req.body;
    const id = req.params.id;

    Produits.updateOne({
        _id: id
    }, { $set: body}).then(() => {
        res.status(200).json({
            message: 'Successfully updated'
        });
    }).catch(err => {
        res.status(500).json({
            error: 'Server error'
        })
    })
};

// Delete a produts with the specified produtsId in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Produits.deleteOne({
        _id: id
    }).then(() => {
        res.status(200).json({message: "produts deleted successfully!"});
    }).catch(err => {
        res.status(500).json({
            error: 'Server error'
        })
    })
};


