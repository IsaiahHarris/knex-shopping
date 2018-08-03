const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req,res)=>{
  res.send('smoke test');
})

app.listen(PORT, ()=>{
  console.log('listening to port 3000');
})