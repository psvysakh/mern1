const express = require('express');
const router = express.Router();

const {createPaymentIntent} = require('../controllers/stripe');

const { passportJwt } = require('../helper/passportStrategy');

router.post('/create-payment-intent',passportJwt,createPaymentIntent);


module.exports = router;