const express = require('express');
const router = express.Router();

const { isAdmin } = require('../controllers/auth');

const {passportJwt}=require('../helper/passportStrategy');


const categoryController =require ('../controllers/category');

router.get('/list',categoryController.list);

router.get('/:categoryById',categoryController.read);

router.post('/create',passportJwt,isAdmin,categoryController.create);

router.delete('/:categoryById',passportJwt,isAdmin,categoryController.remove);

router.put('/:categoryById',passportJwt,isAdmin,categoryController.update);

router.param('categoryById',categoryController.categoryById);



module.exports = router;