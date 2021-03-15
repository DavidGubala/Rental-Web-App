const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5040

app.get('/shipper', (req, res)=>{
    res.send(djs);
});

app.use('/static', express.static(path.resolve(__dirname, 'app', 'static')));

app.use((req, res) => res.sendFile(path.resolve(__dirname, 'app', 'index.html')));


app.listen(PORT, () =>  console.log('server running..'));