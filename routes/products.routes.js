// post.routes.js

const express = require('express');
const router = express.Router();
//const ObjectId = require('mongodb').ObjectId;
const Product = require('../models/product.model');

const ProductsController =require('../controllers/products.controller')

router.get('/products',ProductsController.getAll)


router.get('/products/random', ProductsController.random)


router.get('/products/:id', ProductsController.getId)


router.post('/products', ProductsController.post)


router.put('/products/:id', ProductsController.putId)


router.delete('/products/:id',ProductsController.delete)


module.exports = router;
