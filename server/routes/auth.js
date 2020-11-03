const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');
const passportSignin=function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            console.log(`Internal Error`,err);
            return next(err); }
        if (!user) { 
            console.log(`User Status`,user,info.message);
            return res.status(400).json({error:info.message});}
       req.user=user;
       req.message=info.message;
       next();
      })(req, res, next);
    }

const passportGoogle = passport.authenticate('googleToken',{session:false});


const {validSignUp,validSignIn} = require('../helper/valid');

const authController = require('../controllers/auth');

router.post('/signup',validSignUp,authController.signUp);

router.post('/activate',authController.activation);

router.post('/signin',validSignIn,passportSignin,authController.signIn);

router.post('/oauth/google',passportGoogle,authController.googleOAuth);

router.get('/signout',authController.signOut);




module.exports = router;