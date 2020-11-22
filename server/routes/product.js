const express = require('express');
const router = express.Router();

const { isAdmin } = require('../controllers/auth');

const {passportJwt}=require('../helper/passportStrategy');


const productController =require ('../controllers/product');

router.get('/list',productController.list);

router.get('/related/:productId',productController.listRelated);

router.get('/:productId',passportJwt,productController.read);

router.post('/create',passportJwt,isAdmin,productController.create);

router.delete('/:productId',passportJwt,isAdmin,productController.remove);

router.put('/:productId',passportJwt,isAdmin,productController.update);

router.param('productId',productController.productById);

module.exports = router;