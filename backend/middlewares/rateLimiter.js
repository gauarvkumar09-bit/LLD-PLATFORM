const rateLimit = require('express-rate-limit');

// 1. General API limiter (Auth & History routes ke liye)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
  message: { message: 'Too many requests, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 2. Submission limiter (AI evaluation expensive hai)
const submissionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // Max 3 submissions per minute per IP
  message: { message: 'Too many submissions. Please wait 1 minute before submitting again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { generalLimiter, submissionLimiter };