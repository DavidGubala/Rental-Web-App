const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Login', LoginSchema);