const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/Person');
passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        const person=await Person.findOne({username:username});
        if(!person){
            return done(null,false,{message:'Incorrect username'});
        }
     const isMatch=await person.comparePassword(password);
        if(isMatch===false){
            return done(null,false,{message:'Incorrect password'});
        }
        return done(null,person);
    }catch(err){
        return done(err);
    }
}));
module.exports=passport;
