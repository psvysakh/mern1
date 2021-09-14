const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    method:{
        type:[String],
        enum:['local','google'],
        required:true
    },
    local:{
        email:{
            type:String,
            lowercase:true
        },
        password:{
            type:String,
        },
        secretToken:String,
        isActive:Boolean,
        resetToken:String,
        resetTokenExpiry:Date,
      
    },
    google:{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        }
    },
    name:{
        type:String,
        trim:true,
        maxlength:32
    },
    about:{
        type:String,
        trim:true
    },
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }
},{timestamps:true});

/* userSchema.pre('save',async function(next){
    try{
        if(this.method !== 'local'){return next();}
        const hashpass = await bcrypt.hash(this.local.password,12);
        this.local.password=hashpass;
        next();
    }catch(error){
    next(error);
} 
}); */

userSchema.methods.isValidPassword = async function(newPassword){
        try{
            
            return await bcrypt.compare(newPassword,this.local.password);

        }catch(error){
            next(error);
        }
    }


module.exports = mongoose.model("Users",userSchema);