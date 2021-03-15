const mongoose = require('mongoose');

const PartnerSchema = mongoose.Schema({
    fname:  {
        type: String,
        default : 'none'
    },
    lname:  {
        type: String,
        default : 'none'
    },
    companyName:  {
        type: String,
        default : 'none'
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default : 'none'
    },
    addressId : {
        type: String,
        default : 'none'
    }
});

module.exports = mongoose.model('Partner', PartnerSchema);