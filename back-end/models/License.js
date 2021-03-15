const mongoose = require('mongoose');

const LicenseSchema = mongoose.Schema({
    LicenseType: {
        type: String,
        required: true
    },
    LicenseNumber: {
        type: String,
        required: true
    },
    expirationDate: {
        type: String,
        required: true
    },
    pics_loc:String
});

module.exports = mongoose.model('License', LicenseSchema);