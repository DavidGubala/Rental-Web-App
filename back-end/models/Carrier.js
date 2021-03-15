const mongoose = require('mongoose');

const CarrierSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        default : 'none'
    },
    addressId :{
        type: String,
        default : 'none'
    },
    licenseId : {
        type: String,
        default : 'none'
    }
});

module.exports = mongoose.model('Carrier', CarrierSchema);