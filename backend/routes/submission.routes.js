const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middlewere');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const {
  createAndEvaluateSubmission,
  getUserSubmissions,
} = require('../controller/ai/submission.Controller');

// Dono routes protected rahenge
router.post('/submit', authMiddleware,submissionLimiter, createAndEvaluateSubmission);
router.get('/history', authMiddleware, getUserSubmissions);

module.exports = router;