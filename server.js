const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5040

const djs = {
    id: 123,
    name: 'David Gubala',
    email: 'dgubala727@gmail.com'
};

app.get('/carrier/:id', (req, res)=>{
    res.json(req.params.id)
});

app.use('/static', express.static(path.resolve(__dirname, 'app', 'static')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app', 'index.html'));
});

app.listen(PORT, () =>  console.log('server running..'))