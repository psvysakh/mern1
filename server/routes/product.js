const express = require('express');
const router = express.Router();

const { isAdmin } = require('../controllers/auth');

const {passportJwt}=require('../helper/passportStrategy');


const productController =require ('../controllers/product');

router.get('/list',productController.list);

router.get('/search',productController.listSearch);

router.get('/related/:productId',productController.listRelated);

router.get('/:productId',productController.read);

router.get('/photo/:productId',productController.photo);



router.post('/bysearch',productController.listBySearch);

router.post('/create',passportJwt,isAdmin,productController.create);



router.delete('/:productId',passportJwt,isAdmin,productController.remove);

router.put('/update/:productId',passportJwt,isAdmin,productController.update);

router.param('productId',productController.productById);

module.exports = router;