const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    userType : {
        type: String,
        required: true
    },
    reftok: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Token', TokenSchema);