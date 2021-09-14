const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema;

const addressSchema = new Schema({
name:{
    type:String,
    trim:true,
    required:true,
    maxlength:32
},
phone:{
    type:Number,
    trim:true,
    required:true,
    minlength:10,
    maxlength:10
},
pincode:{
    type:Number,
    trim:true,
    required:true,
    minlength:6,
    maxlength:6
},
locality:{
    type:String,
    trim:true,
    required:true,
    maxlength:50
},
address:{
    type:String,
    trim:true,
    required:true,
    maxlength:500
},
city:{
    type:String,
    trim:true,
    required:true,
    maxlength:100
},
state:{
    type:String,
    trim:true,
    required:true,
    maxlength:50
},
userid:{
    type:ObjectId,
    ref:'users'
}
})

module.exports = mongoose.model("Address",addressSchema);