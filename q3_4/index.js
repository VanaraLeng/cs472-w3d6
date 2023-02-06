const express = require('express');
const app = express();
const path = require('path');
const bparser = require('body-parser');
const Product = require("./Product");

app.use(bparser.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use('/css', express.static(path.join(__dirname, "public", "stylesheets")));

// Hard-coded product
const products = [];

const product = new Product(12, "Macbook Pro M2", 3.5, "Apple Laptop")

app.get('/', (req, res) => {  
  res.render('product', {
    product : product
  });
});

app.post('/addToCart', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description
  const product = new Product(id, name, price, description)

  products.push(product);
  console.log(products);
  
  res.redirect('/shoppingcart')
});

app.get('/shoppingcart', (req, res) => {
  res.render('shoppingcart', {
    products : products
  })
});

app.listen(3000, () => { 
    console.log('Server is running at port 3000');
});