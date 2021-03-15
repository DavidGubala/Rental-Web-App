const mongoose = require('mongoose');

const TruckSchema = mongoose.Schema({ // Using dummy information for now
    loadWeight: {       
        type: String,
        required: true
    }, 
    price: {
        type: String,
        required: true
    },
    pulocId:  {
        type: String,
        required: true
    },
    destinationId :  {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Truck', LoadSchema);