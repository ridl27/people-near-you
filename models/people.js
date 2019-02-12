const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    type: { 
        type: String, 
        default: 'Point' 
    },
    coordinates: {
        type: [Number],  
        index: '2dsphere' 
    }
});

// create People Schema & model
const PeopleSchema = new Schema({ 
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const People = mongoose.model('people', PeopleSchema);

module.exports = People;
