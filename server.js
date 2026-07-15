const express = require('express');
const app=express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const passport=require('./auth');

const PORT=process.env.PORT || 3000;

const logrequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);next();

}

app.use(logrequest);
app.use(passport.initialize());


const localAuth=passport.authenticate('local',{session:false});

app.get("/",(req,res)=>{
  res.send("Welcome to the Hotel Management System");
});



const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);
const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);



app.listen(3000);