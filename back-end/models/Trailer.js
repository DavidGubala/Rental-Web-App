const mongoose = require('mongoose');

const TrailerSchema = mongoose.Schema({
    trailerType: {       
        type: String,
        required: true
    },
    bodyLength : { // like 53'0''
        type: String,
        required: true
    },
    manuf: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    locationid : {
        type: String,
        //required: true
    },
    price: {
        type: String,
        required: true
    },
    odometer: String,
    ownerId: {
        type: String,
        required: true
    },
    renterId:{
        type: String,
        default: 'available'
    }
});

module.exports = mongoose.model('Trailer', TrailerSchema);