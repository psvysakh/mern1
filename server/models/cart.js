const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const cartSchema= new Schema({

products:[
    {
        product:{
            type:ObjectId,
            ref:'Product'
        },
        price:Number,
        quantity:Number
    },
],
cartTotal:Number,
orderedBy:{
    type:ObjectId,
    ref:'User'
}

},{timestamps:true});


module.exports = mongoose.model("Cart",cartSchema);