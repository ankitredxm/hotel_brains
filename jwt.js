const jwt=require('jsonwebtoken');
require("dotenv").config();
const  jwtAuthMiddleware=(req,res,next)=>{
    try{
    const authHeaderr=req.headers.authorization;
    if(!authHeaderr){
        return res.status(401).json({error:'Unauthorized Token not provided'});
    }
    const authHeader=req.headers.authorization.split(' ')[1];
    if(!authHeader){
        return res.status(401).json({error:'Unauthorized'});
    }
        const decoded=jwt.verify(authHeader,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(401).json({error:'Unauthorized'});
    }

};

const generateToken=(user)=>{
    return jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'30m'});
};
module.exports={jwtAuthMiddleware,generateToken};