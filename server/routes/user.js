const express = require('express');
const router = express.Router();
const passport=require('passport');
require('../passport');

const passportJwt=passport.authenticate('jwt',{session:false});
const userController =require ('../controllers/user');

router.get('/secret',passportJwt,userController.secret);

module.exports = router;