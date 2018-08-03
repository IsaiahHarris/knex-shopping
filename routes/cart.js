const express = require('express');
const db = require('../db/knex');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('you got users')
})

router.get('/:user_id', (req, res) => {
  const id = req.params.user_id;
  return db.raw('SELECT products.* FROM cart JOIN products ON(cart.products_id = products.id) JOIN users ON (cart.user_id = users.id) WHERE user_id =?', [id])
    .then(result => {
      if (!result || !result.rowCount) {
        return res.json({ "message": "user has no posts" })
      }
      return result;
    })
    .then(result => {
      return res.json(result.rows)
    })
    .catch(err => {
      res.send('there was an error');
    })
})

router.post('/:user_id/:product_id', (req, res) => {
  const userId = req.params.user_id;
  const productId = req.params.product_id;
  return db.raw('SELECT user_id, products_id FROM cart WHERE user_id = ? AND products_id = ?', [userId, productId])
    .then(result => {
      if (!result || !result.rowCount) {
        return res.status(400).json({ "message": "failed" })
      }
      return result;
    })
    .then(result => {
      return db.raw('INSERT INTO cart (user_id, products_id) VALUES (?,?)', [userId, productId])
    })
    .then(result => {
      return res.json({ "success": "true" })
    })
    .catch(err => {

      res.send('there has been an error')
    })
})

router.delete('/:user_id/:product_id', (req, res) => {
  const userId = req.params.user_id;
  const productId = req.params.product_id;
  return db.raw('SELECT * FROM cart WHERE user_id = ? AND products_id = ?', [userId, productId])
    .then(result => {
      if (!result || !result.rowCount) {
        return res.status(404).json({ "message": "cannot find item in cart under that user and product" })
      }
      return result
    })
    .then(result => {
      return db.raw('DELETE FROM cart WHERE user_id = ? and products_id = ?', [userId, productId])
    })
    .then(result => {
      return res.json({ "success": true })
    })
    .catch(err => {
      res.send('there has been an error')
    })
})

module.exports = router;