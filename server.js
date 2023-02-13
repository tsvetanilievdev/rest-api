let list = [{ id: 1, name: 'item1', price: 222 }, { id: 2, name: 'shoes2', price: 333 }, { id: 3, name: 'tracksuit3', price: 111 }]

const express = require('express');

const app = express();


app.use('/static', express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'OK', list })
})
app.post('/', (req, res) => {
    req.body.id = ('000000' + Math.floor(Math.random() * 100000).toString(16)).slice(-8);
    list.push(req.body);
    res.status(201).json(req.body);
})
app.get('/:id', (req, res) => {
    const item = list.find(x => x.id == req.params.id);
    if (!item) {
        res.status(404)
        res.json({ message: 'Not Found' })
    } else {
        res.status(200);
        res.json(item);
    }
})

app.put('/:id', (req, res) => {
    const item = list.find(x => x.id == req.params.id);
    item.name = req.body.name;
    item.price = Number(req.body.price);

    res.status(202).json(item);
})
app.delete('/:id', (req, res) => {
    list = list.filter(x => x.id != req.params.id);
    res.status(202).end();
})
app.listen(3000, () => { console.log('Running on 3000...') })