const express = require('express');
const db = require('../db/knex');
const router = express.Router();

router.get('/', (req,res)=>{
  return db.raw('SELECT * FROM products')
  .then(result=>{
    if(!result || !result.rowCount){
      res.status(404).json({"message": "there are no products"})
    }
  })
  .then(result=>{
    return res.json(result.rows);
  })
  .catch(err=>{
    console.log('there has been an error')
    res.send('there has been an error');
  })
})

router.get('/:product_id', (req, res)=>{
  const id = req.params.product_id;
  db.raw('SELECT id, title FROM products WHERE id = ?', [id])
  .then(result=>{
    if(!result || !result.rowCount){
      return res.json({ "message": "Product not found" })
    }
    return result;
  })
  .then(result=>{
    return res.json(result.rows);
  })
  .catch(err=>{
    console.log(err);
    res.send('there has been an error');
  })
})

router.post('/new', (req, res)=>{
  const body = req.body;
  // const fields = [body.title, body.description, body.inventory, body.price];
  if(!body.title || !body.description || !body.inventory || !body.price){
    return res.json({ "message": "Must POST all product fields" })
  }else {
    return db.raw('INSERT INTO products(title, description, inventory, price) VALUES (?, ?, ?, ?) RETURNING *', [body.title, body.description, body.inventory, body.price])
    .then(result=>{
      return res.json(result.rows);
    })
    .catch(err=>{
      console.log(err);
      res.send('there was an error');
    })
  }
})

router.put('/:product_id', (req, res)=>{
  const id = req.params.product_id;
  const data = req.body;
  return db.raw('UPDATE products SET title = ?, description = ?, inventory = ?, price = ?', [data.title, data.description, data.inventory, data.price])
  .then(result=>{
    if (!result || !result.rowCount){
      return res.json({"message": "could not find product under that id"})
    }else {
      return res.json({ "message": "Product: [product_id] has been updated" })
    }
  })
  .catch(err=>{
    console.log(err);
    res.send('there was an error');
  })
})

module.exports = router;