const express =  require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv/config');

app.use(bodyParser.json());

//Import routes
const carrierRoutes = require('./routes/carrier');
const partnerRoutes = require('./routes/partner');
const shipperRoutes = require('./routes/shipper');
const rentalRoutes = require('./routes/rental');
const truckRoutes = require('./routes/truck');
const trailerRoutes = require('./routes/trailer');
const orderRoutes = require('./routes/order');
const loadRoutes = require('./routes/load');

app.use('/carrier', carrierRoutes);
app.use('/partner', partnerRoutes);
app.use('/shipper', shipperRoutes);
app.use('/rental', rentalRoutes);
app.use('/rental/truck', truckRoutes);
app.use('/rental/trailer', trailerRoutes);
app.use('/order', orderRoutes);
app.use('/load', loadRoutes);

mongoose.connect(
    process.env.DB_CONNECTION,
    {   useNewUrlParser: true, 
        useUnifiedTopology: true },
    () => {console.log("connected to db")
});

module.exports = app