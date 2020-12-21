const express = require('express');
const router = express.Router();

const { isAdmin } = require('../controllers/auth');


const {passportJwt} = require('../helper/passportStrategy');

const userController =require ('../controllers/user');


router.get('/secret',passportJwt,userController.secret);

router.get('/userProfile',passportJwt,userController.readProfile);

router.put('/profileUpdate',passportJwt,userController.profileUpdate);

module.exports = router;