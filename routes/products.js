const express = require('express');
const db = require('../db/knex');
const router = express.Router();

router.get('/', (req,res)=>{
  res.send('you got products');
})

module.exports = router;