const express = require('express');
const db = require('../db/knex');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('you got users');
})

router.get('/:user_id', (req, res) => {
  const id = req.params.user_id;
  return db.raw('SELECT id, email FROM users WHERE id = ?', [id])
    .then(user => {
      if (!user || !user.rowCount) {
        res.status(400).json({ "message": "User not found" })
      }
      return user.rows;
    })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.send('there was an error');
    })
})


router.post('/login', (req, res) => {
  const data = req.body;
  return db.raw('SELECT email, password FROM users WHERE email = ?', [data.email])
    .then(user => {
      if (!user || !user.rowCount) {
        return res.status(400).json({ "message": "User not found" })
      }
      return user;
    })
    .then(user => {
      if (user.rows[0].password !== data.password) {
        return res.status(400).json({ "message": "Incorrect password" })
      }
      return user;
    })
    .then(user => {
      res.json(user.rows[0]);
    })
    .catch(err => {
      res.send('there was an error');
    })
})


router.post('/register', (req, res) => {
  const data = req.body;
  return db.raw('SELECT email FROM users WHERE email = ?', [data.email])
    .then(result => {
      if (!result || !result.rowCount) {
        return db.raw('INSERT INTO users (email, password) VALUES (?, ?) RETURNING *', [data.email, data.password])
      } else {
        return res.status(400).json({ "message": "User already exists" });
      }

    })
    .then(newUser => {
      return res.json(newUser.rows);
    })
    .catch(err => {
      console.log(err);
      res.send('there was an error');
    })
})

router.put('/:user_id/forgot-password', (req, res) => {
  const id = req.params.user_id;
  return db.raw('SELECT password FROM users WHERE id = ?', [id])
    .then(result => {
      if (!result || !result.rowCount) {
        res.status(404).send('could not find user under that id');
      }
      return result;
    })
    .then(result => {
      return db.raw('UPDATE users SET password = ? WHERE id = ? RETURNING *', [req.body.password, id])
    })
    .then(result => {
      return res.json({ "message": "New password created" })
    })
    .catch(err => {
      console.log(err);
      res.send('there has been an error');
    })
})

router.delete('/:user_id', (req, res) => {
  const id = req.params.user_id;
  return db.raw('SELECT id FROM users WHERE id = ?', [id])
    .then(result => {
      if (!result || !result.rowCount) {
        res.json({ "message": "User ID not found" })
      }
      return result;
    })
    .then(result => {
      return db.raw('DELETE FROM users WHERE id = ? RETURNING *', [id])
    })
    .then(result => {
      return res.json({ "message": "User id: [user_id] successfully deleted" })
    })
    .catch(err => {
      console.log(err);
      res.send('there has been an error');
    })
})

// router.get('/:user_id/purchases/:product_id',(req,res)=>{
//   const userId = req.params.user_id;
//   const productId = req.params.product_id;

//   return db.raw('SELECT * FROM purchases INNER JOIN products ON p.products_id = products.id WHERE user_id = ?', [userId])
//   .then(result=>{
//     const inventory = result.rows[0].inventory;
//     return db.raw('UPDATE products SET inventory = ? WHERE id = ?'[inventory, productId])
//   })
//   .then(result=>{
//     return res.json(result.rows[0]);
//   })
//   .catch(err=>{
//     console.log(err);
//   })
// })
module.exports = router;