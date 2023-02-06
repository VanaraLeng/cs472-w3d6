const express = require('express');
const app = express();
const path = require('path');
const bparser = require('body-parser');

app.use(bparser.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.post('/result', (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  res.render('result', {
    name: name,
    age: age,
  });
});

app.listen(3000, () => { 
    console.log('Server is running at port 3000');
});