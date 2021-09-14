const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-token').Strategy;


const User = require('./models/auth');


// JWT Strategy

passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:process.env.JWT_SECRET,
    ignoreExpiration:false
    
},async (payload,done)=>{
console.log(`received payload`,payload);
    try{
        //find user from token
        const user = await User.findById({_id:payload.sub});
        
        //if user doesn't exist, handle
        if(!user){return done(null,false,{message:"User not existing!"})}
        //otherwise, return user
        
        return done(null,user,{message:"User Found"});
        
    }catch(error){
        return done(error,false);
    }
}));



// GOOGLE OAUTH  Strategy for get user profile using google access token 

passport.use('googleToken',new GoogleStrategy({
    clientID:'580298208669-lbhqf67ulguuhi0siq9ad9dmis4370g3.apps.googleusercontent.com',
    clientSecret:'4xG6C8IUXdX4ZuYCQp5lrCb3'
},async(accessToken,refreshToken,profile,done)=>{
  
try{

//Checking already have signed in as Google User
 const googleUserexisting = await User.findOne({"google.id":profile.id});

 //IF exist then returns the same
 if(googleUserexisting){

    console.log(`user already existing in Database`); 

    return done(null,googleUserexisting,{message:"User existing"})
}

//If not Google User, but Local User with Same Email ID, then Link Google Account with this User

const localWithSameEmail = await User.findOne({"local.email":profile.emails[0].value});

if(localWithSameEmail){

    localWithSameEmail.method.push('google');

    localWithSameEmail.google={
        id:profile.id,
        email:profile.emails[0].value
    }

    await localWithSameEmail.save(); 

    return done(null,localWithSameEmail,{message:"Found you as a local with Same Email"});
}

// IF no GoogleAccount and not a user with Same Email ID, then Add as New Google User
    console.log(`user not existing ,we are creating new one`); 

 const newUser = new User({
     method:'google',
     google:{
         id:profile.id,
         email:profile.emails[0].value,
         
     },
     name:profile._json.name
 });

 await newUser.save();

 return done(null,newUser,{message:"New user"});

}catch(error){
    return done(error,false);
}



}))

// LOCAL Strategy

passport.use(new LocalStrategy({
    usernameField:'email'
},async (email,password,done)=>{
    try{
        const user = await User.findOne({"local.email":email});
        
        if(!user){return done(null,false,{message:"User not existing!"})}
        
        const isEqual = await user.isValidPassword(password);
        if(!isEqual){

            return done(null,false,{message:"Password not matching!"});
        }
        if(!user.local.isActive){

            return done(null,false,{message:"Please verify your email"});
        }

        return done(null,user,{message:"Local Signin Successfull"});

    }catch(error){
       return done(error,false);
    }
    
}));