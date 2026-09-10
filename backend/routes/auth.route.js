const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, logout } = require('../controller/auth/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewere');

// POST /api/auth/register
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);
router.post('/logout', logout);

module.exports = router;