const express = require('express');
const router = express.Router();
const { register, verifyEmail, loginAdmin } = require('../controllers/authController');

router.post('/register', register); // role in body
router.get('/verify/:token', verifyEmail);
router.post('/admin-login', loginAdmin);

module.exports = router;
