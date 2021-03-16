const mongoose = require('mongoose');

const TruckSchema = mongoose.Schema({
    truckType: {       // Freight Trucks, box trucks, cab-over, vans, etc.
        type: String,
        required: true
    }, 
    vin: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    locationId : {
        type: String,
        required: true
    },
    odometer: String,
    ownerId:{
        type: String,
        required: true
    },
    renterId: {
        type: String,
        default: 'available'
    }
});

module.exports = mongoose.model('Truck', TruckSchema);