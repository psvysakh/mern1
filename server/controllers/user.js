const User = require('../models/auth');

exports.secret=async (req,res,next)=>{
    if(req.user.method==='local'){
        req.user.local.password=undefined;
    }
    return res.status(200).json(req.user);
    
    }

exports.readProfile =(req,res,next)=>{
        req.user.local.password=undefined;
        req.user.secretToken=undefined
        res.status(200).json(req.user);
    
}

exports.profileUpdate=async(req,res,next)=>{
   try{
    const UpdatedUser = await User.findOneAndUpdate({_id:req.user._id},{$set:req.body},{new:true});
    console.log(UpdatedUser);
    res.status(200).json(UpdatedUser);
   }catch(error){
    res.status(400).json({error:"Not Authorized"});
   }
}