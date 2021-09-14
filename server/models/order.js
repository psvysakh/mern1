const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const orderSchema = new Schema({
    products:[
        {
            product:{
                type:ObjectId,
                ref:'Product'
            },
            quantity:Number,
            price:Number
        },
    ],
    paymentIntent:{},
    orderStatus:{
        type:String,
        default:'Not Processed',
        enum:[
            'Not Processed',
            'Processing',
            'Dispatched',
            'Cancelled',
            'Completed'
        ]
    },
    orderedBy:{
        type:ObjectId,
        ref:'user'
    }
},{timestamps:true});

module.exports = mongoose.model('Order',orderSchema);