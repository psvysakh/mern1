const express = require('express');
const router = express.Router();
const {passportSignin,passportGoogle}=require('../helper/passportStrategy');


const {validSignUp,validSignIn,validEmail,validPassword} = require('../helper/valid');

const authController = require('../controllers/auth');

router.post('/signup',validSignUp,authController.signUp);

router.post('/activate',authController.activation);

router.post('/signin',validSignIn,passportSignin,authController.signIn);

router.post('/resetform',validEmail,authController.resetForm);

router.post('/resetPassword',validPassword,authController.resetPassword);



router.post('/oauth/google',passportGoogle,authController.googleOAuth);


router.get('/signout',authController.signOut);



module.exports = router;