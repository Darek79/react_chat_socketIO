const express = require('express');
const app = express();
const compression = require('compression');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(compression());

app.get('/',(req,res,next)=>{
  res.status(200).json({msg:'ok'})
});

app.listen(5000,()=>'server is up')
