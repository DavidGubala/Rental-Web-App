const express =  require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv/config');

app.use(bodyParser.json());

//Import routes
const carrierRoutes = require('./routes/carrier.js');
const partnerRoutes = require('./routes/partner.js');
const shipperRoutes = require('./routes/shipper.js');
const rentalRoutes = require('./routes/rental.js');

app.use('/carrier', carrierRoutes);
app.use('/partner', partnerRoutes);
app.use('/shipper', shipperRoutes);
app.use('/rental', rentalRoutes);

app.get('/', (req,res)=>{
    res.send('We are on home')
});

mongoose.connect(
    process.env.DB_CONNECTION,
    {   useNewUrlParser: true, 
        useUnifiedTopology: true },
    () => {console.log("connected to db")
});

app.listen(5050);