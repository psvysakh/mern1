
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/auth');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('../passport');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

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
            console.log(firstError);
            return res.status(400).json({error:firstError});
         }

         const {email,password} = req.body;
        
         try{
            const existing = await User.findOne({"local.email":email});

            if(existing){return res.status(401).json({error:"User already Existing!"})}

            const buffer=crypto.randomBytes(32);  
            if(!buffer){return res.status(401).json({error:"please try again"})}    
            const token = buffer.toString('hex');
            const hashpass=await bcrypt.hash(password,12);
            const user = new User({
               method:'local',
               local:{
                  email:email,
                  password:hashpass,
                  secretToken:token,
                  isActive:false,
               },
              
               ...req.body,
            });
            const emailData = {
               from: process.env.EMAIL_FROM,
               to: email,
               subject: 'Account activation link',
               html: `<h1>Please use the token to activate your account</h1>
                         <p>${token}</p>
                         <hr />
                         <p>This email may containe sensetive information</p>
                         <a href="${process.env.CLIENT_URL}/verifyToken">${process.env.CLIENT_URL}/verifyToken</a>
                     `
             };

            sgMail.send(emailData)
               .then(sent=>{
                  return res.json({
                     message: `Email has been sent to ${email}`
                   });
               }).catch(err=>{
                  console.log(err);
               });

            await user.save();
            res.status(200).json({message:"Please check the mail and verify!"});
         }catch(error){
            console.log(error);
            next(error);
         }
}


exports.activation= async(req,res,next)=>{
   const {token}=req.body;
   try{
      if(token){
               const user=await User.findOne({'local.secretToken':token});
              
               if(!user){ return res.json({ error: `Token not matching to any user`});}

               user.local.secretToken='';
               user.local.isActive=true;

               await user.save((err,user)=>{
                  if (err) {
                     return res.status(401).json({
                       errors: errorHandler(err)
                     });
                   } else if(user) {
                     return res.status(200).json({message:"Email verification is successfull. please Sign In"});
                   }});

              
               
      } else {
         return res.json({message: 'error happening please try again'});
       }
   }catch(error){
      next(error);
   }
   
};


exports.signIn= async (req,res,next)=>{
   const error = validationResult(req);
   if(!error.isEmpty()){
      const firstError = error.array()[0].msg;
      console.log(firstError);
      return res.status(400).json({error:firstError});
   }

   try{
      const newtoken =  signToken(req.user);
      res.status(200).json({newtoken,message:req.message});
   }catch(error){
      console.log(error);
      next(error);
   }
}

exports.googleOAuth = async(req,res,next)=>{
   console.log(`user obtained`, req.user);
   try{
      const newtoken =  signToken(req.user);
      res.status(200).json({newtoken});
   }catch(error){
      console.log(error);
      next(error);
   }
}


exports.signOut=async (req,res,next)=>{
   res.clearCookie('t');
   res.json({message:"signout success"});
}

