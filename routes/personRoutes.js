const router=require('express').Router();
const Person = require('../models/Person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

router.post('/signup',async (req,res)=>{
 try{
  const data=req.body;
  const person=new Person(data);
  const response=await person.save();
  console.log('data saved successfully');
  const payload={
    id:response.id,
    username:response.username
  };
  const token=generateToken(payload);
  console.log('payload:',payload);
  console.log('token:',token);
  res.status(200).json({message:'data saved successfully',data:response,token:token});
 }
 catch(err){
  console.error('Error saving data:', err);
  res.status(400).json({error: err.message});
 }
});

// login route
router.post('/login',async (req,res)=>{
  try{
    const {username,password}=req.body;
    const person=await Person.findOne({username:username});
    if(!person){
      return res.status(400).json({error:'Invalid username or password'});
    }
    const isMatch=await person.comparePassword(password);
    if(!isMatch){
      return res.status(400).json({error:'Invalid username or password'});
    }
    const payload={
      id:person.id,
      username:person.username
    };
    const token=generateToken(payload);
console.log('token:',token);
    res.status(200).json({message:'Login successful',data:person,token:token});
  }
  catch(err){
    console.error('Error logging in:', err);
    res.status(400).json({error: err.message});
  }
});

router.get('/',jwtAuthMiddleware,async (req,res)=>{
try{
  const response=await Person.find();
  res.status(200).json(response);
}
catch(err){
  console.error('Error saving data',err);
  res.status(400).json({error: err.message});
}

});
//profile route
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
  try{
    const userId=req.user.id;
    const person=await Person.findById(userId);
    if(!person){
      return res.status(404).json({error:'User not found'});
    }
    res.status(200).json(person);
  }
  catch(err){
    console.error('Error fetching profile',err);
    res.status(400).json({error: err.message});
  }
});
router.get('/:worktype',async (req,res)=>{
  try{
    const wt=req.params.worktype;
    if(!['chef','waiter','manager'].includes(wt)){
      res.status(400).json({error:'Invalid work type'});
    }
    const response=await Person.find({work:wt});
    res.status(200).json(response);
  }
  catch(err){
    console.error('Error fetching data',err);
    res.status(400).json({error: err.message});
  }
});


router.put('/:id',async (req,res)=>{
  try{
    const personid=req.params.id;
    const updatedpersondata=req.body;

    const response=await Person.findByIdAndUpdate(personid,updatedpersondata,{
      returnDocument:'after',
      runValidators:true
    });

if(!response){
return  res.status(400).json({error:"Person not found"});
}
console.log("data updated");
res.status(200).json(response);

  }
    catch(err){
    console.error('Error fetching data',err);
    res.status(400).json({error: err.message});
  }
});


router.delete('/:id',async (req,res)=>{
  try{
    const personid=req.params.id;
    const response=await Person.findByIdAndDelete(personid);
    if(!response){
      return res.status(400).json({error:"Person not found"});
    }
    console.log("data deleted");
    res.status(200).json({message:"data deleted successfully"});
  }
  catch(err){
    console.error('Error deleting data',err);
    res.status(400).json({error: err.message});
  }
});
module.exports=router;