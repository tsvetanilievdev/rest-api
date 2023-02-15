const express = require('express');
const cors = require('./src/middlewares/cors.js');

const app = express();

app.use('/static', express.static('static'));
app.use(express.json());
app.use(cors);

app.get('/data/catalog', (req, res) => {
    res.json([]);
})
app.listen(3030, () => { console.log('Running on 3030...') })