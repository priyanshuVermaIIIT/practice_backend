const express = require('express');
const router = express.Router();

const { addToCart, viewCart } = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/add' ,protect , addToCart);
router.get('/' , protect ,viewCart);

module.exports = router;