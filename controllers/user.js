
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {validationResult} = require('express-validator');

//JWT token generator

signToken=user=>{
  return jwt.sign({
      email:user.email,
      _id:user._id,
      iat:new Date().getTime(),
      exp:new Date().setDate(new Date().getDate() + 1)
   },process.env.JWT_SECRET);
}



exports.signUp = async (req,res,next)=>{
         const error = validationResult(req);
         if(!error.isEmpty()){
            const firstError = error.array()[0].msg;
            return res.status(400).json({err:firstError})
         }
         const {email,password} = req.body;
         
         try{
            const existing = await User.findOne({"local.email":email});
            if(existing){return res.status(401).json({error:"User already Existing!"})}
           
            const user = new User({
               method:'local',
               local:{
                  email:email,
                  password:password
               },
               ...req.body,
               
            });
            await user.save();
            const token = await signToken(user);
            res.status(200).json({token});
         
         }catch(error){
            console.log(error);
            next(error);
         }
}

exports.signIn= async (req,res,next)=>{
   
   try{
      const token = await signToken(req.user);
      res.status(200).json({token});
   }catch(error){
      console.log(error);
      next(error);
   }
}

exports.googleOAuth = async(req,res,next)=>{
   try{
      const token = await signToken(req.user);
      res.status(200).json({token});
   }catch(error){
      console.log(error);
      next(error);
   }
}


exports.signOut=async (req,res,next)=>{
   res.clearCookie('t');
   res.json({message:"signout success"});
}

exports.secret=async (req,res,next)=>{
console.log("Managed to reach here");
res.status(200).json({message:"Authentication successful!"})
}