const express = require('express');
const router = express.Router();
/* const jwt = require('jsonwebtoken');  */

const { isAdmin } = require('../controllers/auth');


const {passportJwt} = require('../helper/passportStrategy');

const userController =require ('../controllers/user');

/* function authenticateToken(req,res,next){
    const token = req.headers['authorization'];
   if(token==null) return res.sendStatus(401);

   jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
       if(err) return res.sendStatus(401);
       req.user=user;
       console.log(user);
       next();
   })
} */


router.get('/address',passportJwt,userController.getAddress);

router.get('/secret',passportJwt,userController.secret);



router.get('/userProfile',passportJwt,userController.readProfile);

router.get('/order',passportJwt,userController.readOrders);

router.post('/cart',passportJwt,userController.cart);

router.post('/order',passportJwt,userController.order);

router.post('/address',passportJwt,userController.addAddress);

router.put('/address',passportJwt,userController.updateAddress);

router.put('/profileUpdate',passportJwt,userController.profileUpdate);

router.delete('/address/:addressId',passportJwt,userController.deleteAddress);

router.delete('/cart',passportJwt,userController.removeCart);

module.exports = router;