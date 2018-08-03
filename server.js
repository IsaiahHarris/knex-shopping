const express = require('express');
const app = express();
const cart = require('./routes/cart');
const users = require('./routes/users');
const products = require('./routes/products');
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req,res)=>{
  res.send('smoke test');
})

app.use('/cart', cart)
app.use('/users', users)
app.use('/products', products)
app.listen(PORT, ()=>{
  console.log('listening to port 3000');
})