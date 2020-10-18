const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');
const passportSignin=passport.authenticate('local',{session:false});
const passportJwt=passport.authenticate('jwt',{session:false});
const passportGoogle = passport.authenticate('googleToken',{session:false});


const {check}=require('express-validator');

const userController = require('../controllers/user');

router.post('/signup',
[
    check('name','Name is required').notEmpty(),
    check('email','Email must between 3 to 32 character')
        .isEmail()
        .withMessage('Please enter valid email')
        .normalizeEmail(),
    check('password','Password is required').notEmpty(),
    check('password')
        .isLength({min:5})
        .withMessage('Password must contain min 5 Character')
        .matches(/\d/)
        .withMessage('Password must contain one digit')
   
]
,userController.signUp);

router.post('/signin',
[
    check('email','Email must between 3 to 32 character')
        .isEmail()
        .withMessage('Please enter valid email')
        .normalizeEmail(),
    check('password','Password is required').notEmpty(),
    check('password')
        .isLength({min:5})
        .withMessage('Password must contain min 5 Character')
        .matches(/\d/)
        .withMessage('Password must contain one digit')
   
],
passportSignin,userController.signIn);

router.post('/oauth/google',passportGoogle,userController.googleOAuth);

router.get('/signout',userController.signOut);

router.get('/secret',passportJwt,userController.secret);

module.exports = router;