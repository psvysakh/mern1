const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser =require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

// import Routes

const authRoutes = require('./routes/auth');
const userRoutes =require('./routes/user');
const categoryRoutes =require('./routes/category');
const productRoutes = require('./routes/product');
// app

const app=express();

 
// db

/* switch online or local db url  */

/* const MONGODB_URI= */ // online db uri
const MONGODB_URI = process.env.MONGO_LOCAL_DATABASE; // local db uri



mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useCreateIndex:true
})
.then(()=>{
console.log('DB Connected');

})

//middleware

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 

/* app.use(cors()); */

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
 });


app.use(cookieParser());

//Route middleware

app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/category',categoryRoutes);
app.use('/product',productRoutes);


module.exports=app;
