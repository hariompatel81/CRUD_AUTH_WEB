const express = require('express');
const { 
  Signup, 
  Login, 
  sendOtp, 
  verifyForgetPasswordOtp, 
  verifySingupOtp, 
  resetPassword,
  resendOtp
} = require('../controllers/auth.controller');

const { otpLimiter } = require('../middleware/rateLimiter');

const { createUserValidation, loginValidation } = require('../validations/auth.validation');

const authRouter = express.Router();

// Signup flow
authRouter.post('/auth/signup', createUserValidation, Signup);
authRouter.post('/auth/signup/verify-otp', verifySingupOtp);

// Login flow
authRouter.post('/auth/login', loginValidation, Login);

// Forget Password flow
authRouter.post('/auth/send-otp', otpLimiter, sendOtp);
authRouter.post('/auth/verify-otp', verifyForgetPasswordOtp);
authRouter.post('/auth/reset-password', resetPassword);

//resend otp flow
authRouter.post('/auth/resend-otp', otpLimiter, resendOtp);

module.exports = authRouter;