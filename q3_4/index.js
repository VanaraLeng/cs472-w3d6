const express = require('express');
const app = express();
const path = require('path');
const bparser = require('body-parser');
const product = require("./model/product");
const inventory = require("./model/inventory");

const cart = [];

app.use(bparser.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use('/css', express.static(path.join(__dirname, "public", "stylesheets")));


app.get('/', (req, res) => {  
  res.render('product', {
    products : inventory
  });
});

app.post('/addToInventory', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description
  const prod = new product(id, name, price, description)
  inventory.push(prod);
  
  res.redirect('/')
});


app.post('/addToCart', (req, res) => {
  const id = parseInt(req.body.id);
  const prod = inventory.filter(x => x.id === id)[0];
  cart.push(prod);
  res.redirect('/shoppingcart')
});

app.get('/shoppingcart', (req, res) => {
  res.render('shoppingcart', {
    products : cart
  })
});

app.listen(3000, () => { 
    console.log('Server is running at port 3000');
});