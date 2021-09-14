
const formidable = require('formidable');
const _ = require('lodash');
const User = require('../models/auth');
const Address = require('../models/address');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Order = require('../models/order');


exports.secret= (req,res,next)=>{
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


exports.getAddress=async(req,res,next)=>{
    try{
        const address =await Address.find({userid:req.user._id});
        console.log(address);
        res.status(200).json(address);
    }catch(error){
        res.status(400).json({error:"Address Not Found"});
    }
}


exports.addAddress =(req,res,next)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,field)=>{
        if(err){
            return res.status(400).json({error:'Field Error'})
        }
        let address = new Address(field);
        address.save((err,result)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            res.status(200).json(result);
        })
    })

}

exports.updateAddress=async(req,res,next)=>{
  
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;

    try{
        let fields = await new Promise((resolve,reject)=>{
            form.parse(req,(err,fields)=>{
                if(err){
                  reject(err);
                  return;
                }
                resolve(fields);
               
            })
        });
        
        let updatedAddress =await Address.findOne({_id:fields._id});
       
        updatedAddress=_.extend(updatedAddress,fields);
      
        await updatedAddress.save();
        res.status(200).json({message:"Address Updated"});
    }
catch(error){
    return res.status(400).json({error:error});
}
   
}
exports.deleteAddress=async(req,res,next)=>{
    const addressId = req.params.addressId;
    try{
        let address = await Address.findByIdAndDelete({_id:addressId});
        const result = await address.remove();
        res.status(200).json(result);
    }catch(error){
        return res.status(400).json({error:error});
    }
}

exports.cart=async(req,res,next)=>{


const cart = req.body;

let products=[];

try{

let cartExists = await Cart.findOne({orderedBy:req.user._id});

if(cartExists){
    cartExists.remove();
    console.log("removed Old Cart");
}

for(let i=0;i<cart.length;i++){
    let object={}
    object.product=cart[i]._id;
    object.quantity=cart[i].quantity;
    let {price} = await Product.findById(cart[i]._id)
    .select('price').exec();
    object.price = price;

    products.push(object);
}

const total = products.reduce((acc,item)=>acc+=item.price * item.quantity,0);

/* console.log(products,total); */

let newCart = await new Cart({
    products,
    cartTotal:total,
    orderedBy:req.user._id
}).save();

if(newCart){
    /* console.log(newCart); */
    res.status(200).json("Cart Saved");
}

}catch(error){
    res.status(401).json("Error Saving Cart");
}

}

exports.removeCart = async(req,res,next)=>{

    try{
        await Cart.findOneAndRemove({orderedBy:req.user._id});

    return res.status(200).json("Cart Removed");
    }
    catch(error){
        return res.status(401).json("Cart Removing Failed");
    }

}

exports.order = async(req,res,next)=>{
   /*  console.log(req.body); */
    const paymentIntent = req.body;

   try{
    const {products}= await Cart.findOne({orderedBy:req.user._id});

   await new Order({
        products,
        paymentIntent,
        orderedBy:req.user._id
    }).save();

    let bulkOption = products.map(item=>{
        return{
            updateOne:{
                filter:{_id:item.product._id},
                update:{$inc:{quantity: -item.quantity,sold: +item.quantity}}
            }
        }
    });

    await Product.bulkWrite(bulkOption,{});

    return res.status(200).json("Order Successfull");


   }catch(error){
    return res.status(401).json("Order Failed");
   }

}

exports.readOrders=async(req,res,next)=>{
    try{
        const orders = await Order.find({orderedBy:req.user._id})
        .populate('products.product','_id name description').exec();

        return res.status(200).json(orders);
    }
    catch(error){
        return res.status(401).json("Error Retreiving Order")
    }
}