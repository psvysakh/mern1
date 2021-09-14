const stripe = require('stripe')(process.env.STRIPE_KEY);
const Cart = require('../models/cart');

exports.createPaymentIntent = async(req,res,next)=>{
        console.log(`reached`)
    try{
        const {cartTotal} = await Cart.findOne({orderedBy:req.user._id})
        .select('cartTotal').exec();

            if(cartTotal){
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: cartTotal * 100,
                    currency: "inr"
                });
                console.log(paymentIntent);
                return res.status(200).json({
                    clientSecret:paymentIntent.client_secret
                });
            }

        
    }
    catch(error){
        console.log(error);
    }
}