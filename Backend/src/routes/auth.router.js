const express = require('express');
const {Signup, Login, sendOtp, verifyOtp, resetPassword} = require('./../controllers/auth.controller');
const {createUserValidation, loginValidation} = require('./../validations/auth.validation');

const authRouter = express.Router();

authRouter.post('/auth/signup',createUserValidation, Signup);
authRouter.post('/auth/login',loginValidation, Login);
authRouter.post('/auth/send-otp',sendOtp);
authRouter.post('/auth/verify-otp',verifyOtp);
authRouter.post('/auth/reset-password',resetPassword);

module.exports = authRouter;