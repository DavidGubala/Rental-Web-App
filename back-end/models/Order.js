const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderStatus: { // In Progress, Completed,
        type: String,
        required: true
    },
    orderType: { // rental, load
        type: String,
        required: true
    },
    itemId : {
        type: String,
        required: true
    },
    carrierId: {
        type: String,
        required: true
    },
    otherId:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', OrderSchema);