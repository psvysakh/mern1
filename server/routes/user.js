const express = require('express');
const router = express.Router();
const passport=require('passport');
const { isAdmin } = require('../controllers/auth');
require('../passport');

const passportJwt=function(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) { 
            console.log(`Internal Error`,err);
            return next(err); }
        if (!user) { 
            console.log(`User Status`,user,info.message);
            return res.status(400).json({error:info.message});}
            console.log(`User Status`,user,info.message);
       req.user=user;
       req.message=info.message;
       next();
      })(req, res, next);
    }
const userController =require ('../controllers/user');


router.get('/secret',passportJwt,userController.secret);

module.exports = router;