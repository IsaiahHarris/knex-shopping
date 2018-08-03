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
  return db.raw('SELECT email FROM users WHERE email = ?',[data.email])
    .then(result => {
      if (!result || !result.rowCount) {
        return db.raw('INSERT INTO users (email, password) VALUES (?, ?) RETURNING *', [data.email, data.password])
      }else {
        return res.status(400).json({"message": "User already exists"});
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
module.exports = router;