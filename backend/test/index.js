const express = require('express');
const app = express();
const port = 1338;
const fs = require('node:fs');
const {find} = require("rxjs");

let data;
fs.readFile('./data.json', (err, jsonString) => {
  data = JSON.parse(jsonString);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.use(express.json());
app.use((req, res, next) => {
  console.log('');
  next();
});
app.get('/', (req, res) => {
  res.send("Welcome to Adham's Backend");
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

app.get('/products', (req, res) => {
  if (data) {
    res.json(data)
  } else {
    res.status(500).send('No products found');
  }

});

app.get('/products/:id', (req, res) => {
  const product = data.find(product => product.id === parseInt(req.params.id));
  if (product) {
    res.json(product)
  } else {
    res.status(500).send('<h1 style="font-size: 100px; color: red" >Product not found</h1>');
  }

});

app.get('/products/delete/:id', (req, res) => {
  const product = data.find(product => product.id === parseInt(req.params.id));
  if (product) {
    let productIndex = data.indexOf(data.find(product => product.id === parseInt(req.params.id)));
    data.splice(productIndex, 1);
    fs.writeFile('./data.json', JSON.stringify(data), (err,) => {
    });
    res.send('Product deleted');
  } else {
    res.status(500).send('Product not found');
  }

});

app.post('/products', (req, res) => {
  const product = req.body;
  const existingProduct = data.find(item => item.id === parseInt(product.id));
  if (!existingProduct) {
    data.push(product);
    fs.writeFile('./data.json', JSON.stringify(data), (err,) => {
    });
    res.send('Product added');
  } else {
    res.status(500).send('Product already exists');
  }
});




