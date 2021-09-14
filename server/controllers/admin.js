const Order = require('../models/order');


exports.orders = async(req,res,next)=>{
    try{
        const orders = await Order.find({})
        .sort('-createdAt')
        .populate('products.product','-photo')
        .exec();

        return res.status(200).json(orders);
    }catch(error){
        next(error);
    }
}

exports.orderStatus = async(req,res,next)=>{

    const {orderId,orderStatus}=req.body;

    console.log(`--------reached`,orderId,orderStatus);
    
    try{
        await Order.findByIdAndUpdate(orderId,{orderStatus},{new:true});

        return res.status(200).json("Order Status Updated");

    }catch(error){
        next(error);
    }

}