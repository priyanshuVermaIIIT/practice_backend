const express = require('express');
const router = express.Router();

const { addAddress, veiwAddress, deleteAddress, editAddress } = require('../controllers/address.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/add', protect, addAddress);
router.get('/view' , protect , veiwAddress );
router.delete('/delete/:index'  ,protect , deleteAddress );
router.put('/edit/:index' , protect , editAddress);

module.exports = router;


