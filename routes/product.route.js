const express =require('express');
const router = express.Router();
const Product = require("../models/product.model.js")
const {getProducts , findProducts , deleteProduct , updateProduct , addProduct} = require('../controllers/product.controller.js')

router.get('/', getProducts);
router.get('/:id',findProducts);
router.put('/:id',updateProduct);
router.post('/',addProduct);
router.delete('/:id',deleteProduct);



module.exports = router;