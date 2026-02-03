const express = require('express');
const { 
  Signup, 
  Login, 
  sendOtp, 
  verifyForgetPasswordOtp, 
  verifySingupOtp, 
  resetPassword 
} = require('../controllers/auth.controller');

const { createUserValidation, loginValidation } = require('../validations/auth.validation');

const authRouter = express.Router();

// Signup flow
authRouter.post('/auth/signup', createUserValidation, Signup);
authRouter.post('/auth/signup/verify-otp', verifySingupOtp);

// Login flow
authRouter.post('/auth/login', loginValidation, Login);

// Forget Password flow
authRouter.post('/auth/send-otp', sendOtp);
authRouter.post('/auth/verify-otp', verifyForgetPasswordOtp);
authRouter.post('/auth/reset-password', resetPassword);

module.exports = authRouter;