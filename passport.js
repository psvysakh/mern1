const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');

const User = require('./models/user');


// JWT Strategy

passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:process.env.JWT_SECRET
},async (payload,done)=>{
console.log(payload);
    try{
        //find user from token
        const user = await User.findById({_id:payload._id});
        
        //if user doesn't exist, handle
        if(!user){return done(null,false)}
        //otherwise, return user
        return done(null,user);
    }catch(error){
        return done(error,false);
    }
}));

// GOOGLE OAUTH  Strategy

passport.use('googleToken',new GooglePlusTokenStrategy({
clientID:'580298208669-u84m6necdmummh834ul7ghtiqls4iovg.apps.googleusercontent.com',
clientSecret:'kgfbQkviWu3ap7rrnJQTDfsC'
},async(accessToken,refreshToken,profile,done)=>{

try{
 //find user with profile id from google
 const existing = await User.findOne({"google.id":profile.id});
 //if user  exist, handle
 
 if(existing){
    console.log(`user already existing in Database`); 
    return done(null,existing)}
    //if user  not exist, create this user 
    console.log(`user not existing ,we are creating new one`); 
 const newUser = new User({
     method:'google',
     google:{
         id:profile.id,
         email:profile.emails[0].value
     }
 });
 await newUser.save();
 return done(null,newUser);
}catch(error){
    return done(error,false);
}



}))

// LOCAL Strategy

passport.use(new LocalStrategy({
    usernameField:'email'
},async (email,password,done)=>{
    console.log(email,password);
    try{
    //find user with given email
    const user = await User.findOne({"local.email":email});
    //if user doesn't exist, handle
    if(!user){return done(null,false)}
    //Check if password matchs
    const isEqual =await user.isValidPassword(password);
    if(!isEqual){return done(null,false)}
    //otherwise, return user
    return done(null,user);
    }catch(error){
       return done(error,false);
    }
    
}));