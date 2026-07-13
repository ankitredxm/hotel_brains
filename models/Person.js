const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    phno:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}
);

personSchema.pre('save',async function(){
const person=this;

if(person.isModified('password')){
    const salt=await bcrypt.genSalt(10);
    person.password=await bcrypt.hash(person.password,salt);
    
}



});

personSchema.methods.comparePassword=async function(password){
    try{
        const isMatch=await bcrypt.compare(password,this.password);
        console.log('isMatch:',isMatch);
        return isMatch;
    }
    catch(err){
        throw new Error(err);
    }
};

const person=mongoose.model('Person',personSchema);
module.exports=person;