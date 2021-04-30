const express =  require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')

require('dotenv/config');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
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
const loginRoutes = require('./routes/login');

app.use(cors({origin: true}))
app.options('*', cors({origin: true}))
app.use('/carrier', carrierRoutes);
app.use('/partner', partnerRoutes);
app.use('/shipper', shipperRoutes);
app.use('/rental', rentalRoutes);
app.use('/rental/truck', truckRoutes);
app.use('/rental/trailer', trailerRoutes);
app.use('/order', orderRoutes);
app.use('/load', loadRoutes);
app.use('/login', loginRoutes);

mongoose.connect(
    process.env.DB_CONNECTION,
    {   useNewUrlParser: true, 
        useUnifiedTopology: true },
    () => {console.log("connected to db")
});

module.exports = app