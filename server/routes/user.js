const express = require('express');
const router = express.Router();

const { isAdmin } = require('../controllers/auth');


const {passportJwt} = require('../helper/passportStrategy');

const userController =require ('../controllers/user');


router.get('/secret',passportJwt,userController.secret);

module.exports = router;