const express = require('express');
const router = express.Router();

const{registerUser , loginUser} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware'); // Import the middleware
const { getUserProfile } = require('../controllers/user.controller '); // Import the profile controller


router.post('/register' , registerUser);
router.post('/login' , loginUser);


router.get('/profile', protect, getUserProfile);

module.exports = router;