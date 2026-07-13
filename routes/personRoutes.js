const router=require('express').Router();
const Person = require('../models/Person');

router.post('/',async (req,res)=>{
 try{
  const data=req.body;
  const person=new Person(data);
  const response=await person.save();
  console.log('data saved successfully');
  res.status(200).json({message:'data saved successfully',data:response});
 }
 catch(err){
  console.error('Error saving data:', err);
  res.status(400).json({error: err.message});
 }
});

router.get('/',async (req,res)=>{
try{
  const response=await Person.find();
  res.status(200).json(response);
}
catch(err){
  console.error('Error saving data',err);
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