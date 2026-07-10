const router = require('express').Router()  ;
const Menu = require('../models/menu');

router.post('/',async (req,res)=>{
  try{
    const data=req.body;
    const menu=new Menu(data);
    const response=await menu.save();
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
    const response=await Menu.find();
    res.status(200).json(response);
  }
  catch(err){
    console.error('Error saving data',err);
    res.status(400).json({error: err.message}); 
  }
});

router.get('/:ct',async (req,res)=>{
    try{
const ct=req.params.ct;
if(!['sweet','sour','spicy'].includes(ct)){
  res.status(400).json({error:'Invalid category'});
}
const response=await Menu.find({taste:ct});
res.status(200).json(response);

    }
    catch(err){
      console.error('Error fetching data',err);
      res.status(400).json({error: err.message});
    }
});

module.exports=router;