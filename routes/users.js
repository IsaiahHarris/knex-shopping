const express = require('express');
const db = require('../db/knex');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('you got users');
})

router.get('/:user_id', (req, res) => {
  const id = req.params.id;
  db.raw('SELECT email FROM users WHERE id = ?', [id])
    .then(user => {
      if (!user || !user.rowCount) {
        res.status(400).send("{ message: 'User not found }");
      }
      res.json(user.rows[0])
    })
    .catch(err=>{
      res.send('there was an error');
    })
})

module.exports = router;