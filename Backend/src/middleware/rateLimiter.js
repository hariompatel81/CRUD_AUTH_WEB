const rateLimit = require('express-rate-limit');

exports.otpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 3, 
  message: {
    success: false,
    message: "Too many OTP requests. Please try again after 5 minutes."
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});