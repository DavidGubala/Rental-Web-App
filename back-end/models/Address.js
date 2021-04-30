const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    streetAddress: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    postalCode: {
        type: String
    }
});

module.exports = mongoose.model('Address', AddressSchema);