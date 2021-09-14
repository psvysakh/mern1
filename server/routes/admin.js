const express = require('express');
const router = express.Router();

const {passportJwt} = require('../helper/passportStrategy');

const {isAdmin} = require('../controllers/auth');
const adminController = require('../controllers/admin');


router.get('/orders',passportJwt,isAdmin,adminController.orders);

router.put('/orderStatus',passportJwt,isAdmin,adminController.orderStatus);


module.exports = router;