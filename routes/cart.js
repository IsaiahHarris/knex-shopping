const express = require('express');
const db = require('../db/knex');
const router = express.Router();

router.get('/', (req,res)=>{
  res.send('you got users')
})

router.get('/:user_id', (req,res)=>{
  const id = req.params.user_id;
  return db.raw('SELECT products.* FROM cart JOIN products ON(cart.products_id = products.id) JOIN users ON (cart.user_id = users.id) WHERE user_id =?',[id])
  .then(result=>{
    if(!result || !result.rowCount){
      return res.json({"message": "user has no posts"})
    }
    return result;
  })
  .then(result=>{
    return res.json(result.rows)
  })
  .catch(err =>{
    res.send('there was an error');
  })
})

router.post

module.exports = router;