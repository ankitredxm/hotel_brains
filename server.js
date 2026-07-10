const express = require('express');
const app=express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT=process.env.PORT || 3000;
app.get("/",(req,res)=>{
  res.send("Welcome to the Hotel Management System");
});



const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);
const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);



app.listen(3000);