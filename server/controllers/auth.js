
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
                         <a href="${process.env.CLIENT_URL}/signup/verifyToken">${process.env.CLIENT_URL}/signup/verifyToken</a>
                     `
             };
            await user.save();
            sgMail.send(emailData)
               .then(sent=>{
                  return res.json({
                     message: `Please check the mail and verify!`
                   });
               }).catch(err=>{
                  console.log(`sendgriderrors`,err.response.body);
               });
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
                       errors: "Issue saving user"
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
      res.status(200).json({newtoken,role:req.user.role});
   }catch(error){
      console.log(error);
      next(error);
   }
}



exports.resetForm=async(req,res,next)=>{
   const error = validationResult(req);

   if(!error.isEmpty()){
      const firstError = error.array()[0].msg;
      console.log(firstError);
      return res.status(400).json({error:firstError});
   }

   const {email} = req.body;
   console.log(`Email Received for reset`,email);
   try{
      const existing = await User.findOne({"local.email":email});
      if(!existing){return res.status(401).json({error:"User not Existing!"})}
      const buffer=crypto.randomBytes(32);  
      if(!buffer){return res.status(401).json({error:"please try again"})}    
      const token = buffer.toString('hex');
      existing.local.resetToken=token;
      existing.local.resetTokenExpiry=Date.now()+36000000;
      await existing.save();
      const emailData = {
         from: process.env.EMAIL_FROM,
         to: email,
         subject: 'Password Reset',
         html: `<h1>You Requested password reset</h1>
                   <hr />
                   <p>This email may containe sensetive information</p>
                   <a href="${process.env.CLIENT_URL}/signin/reset/${token}">Link</a>
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
   }catch(error){
      console.log(error);
      next(error);
   }
}

exports.resetPassword = async (req,res,next)=>{
   const error = validationResult(req);

   if(!error.isEmpty()){
      const firstError = error.array()[0].msg;
      console.log(firstError);
      return res.status(400).json({error:firstError});
   }
 
   const {password,token} = req.body;
   console.log(`Recevied for reseting`,password,token);
   try{
      const resetUser = await User.findOne({'local.resetToken':token,'local.resetTokenExpiry':{$gt:Date.now()}});
      console.log(resetUser);
      if(!resetUser){return res.status(401).json({error:"User not Existing!"})}
      const hashpass = await bcrypt.hash(password,12);
      resetUser.local.password=hashpass;
      resetUser.local.resetToken=undefined;
      resetUser.local.resetTokenExpiry=undefined;
      
      await resetUser.save((err,user)=>{
         if (err) {
            return res.status(401).json({
              errors: "Issue saving user"
            });
          } else if(user) {
            const emailData = {
               from: process.env.EMAIL_FROM,
               to: resetUser.local.email,
               subject: 'Password Reset',
               html: `<h1>You password reset is Successfull</h1>`
             };
      
            sgMail.send(emailData)
               .then(sent=>{
                  res.status(200).json({message:"Passwod reset is successfull. please Sign In"});
               }).catch(err=>{
                  console.log(err);
               });
          }});
   }catch(error){
      console.log(error);
      next(error);
   }
}


exports.googleOAuth = async(req,res,next)=>{
   console.log(`user obtained`, req.user);
   try{
      const newtoken =  signToken(req.user);
      res.status(200).json({newtoken,role:req.user.role});
   }catch(error){
      console.log(error);
      next(error);
   }
}

exports.isAdmin = (req,res,next)=>{
   if(req.user.role===0){
      return res.status(403).json({error:"Admin Resourse. Access Denied!"});
   }
   next();
}


exports.signOut=async (req,res,next)=>{
   res.clearCookie('t');
   res.json({message:"signout success"});
}

