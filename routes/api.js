const express = require ('express');
const router = express.Router();
const People = require('../models/people');

// get a list of People from the db
router.get('/people', function(req, res, next){

    People.aggregate().near({    
	   near: { type: "point", coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)] },
	   maxDistance: 100000,
	   spherical: true,
	   distanceField: "dist.calculated"
	})﻿.then(function(people){
        res.send(people);
    }).catch(next);
});

// add a new People to the db
router.post('/people', function(req, res, next){
    People.create(req.body).then(function(people){ 
        res.send(people);
    }).catch(next); 
});

// update a People in the db
router.put('/people/:id', function(req, res, next){
    People.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(people){
            res.send(people); 
    }).catch(next);
});

// delete a People from the db
router.delete('/people/:id', function(req, res, next){
    People.findByIdAndRemove({_id: req.params.id}).then(function(people){
        res.send(people);
    }).catch(next);
});

module.exports = router;
