const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser =require('cookie-parser');

require('dotenv').config();

// import Routes

const userRoutes = require('./routes/user');

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
app.use(bodyParser.json());
app.use(cookieParser());

//Route middleware

app.use('/api',userRoutes);


module.exports=app;
