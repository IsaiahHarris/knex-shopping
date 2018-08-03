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
  db.raw('SELECT id FROM products WHERE id = ?', [id])
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


module.exports = router;