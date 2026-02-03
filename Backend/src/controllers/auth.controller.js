const { validationResult } = require("express-validator");
const users = require("./../models/user.model");
const otpModel = require("../models/otp.model");
const jwt = require('jsonwebtoken');
const {
  encryptPassword,
  comparePassword,
  generateToken,
  generateOtp,
} = require("./../utils/helper");
const {
  sendForgotPasswordMail,
  sendWelcomeOTP,
} = require("../utils/nodemailer");

exports.Signup = async (req, res) => {
  try {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password, age } = req.body;

    //check user
    const isExist = await users.findOne({ email });

    if (isExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    //generate OTP
    const otp = generateOtp();

    //send otp for verification
    await sendWelcomeOTP(email, otp);

    //encrypt password
    const hashPassword = await encryptPassword(password);

    const newUser = {
      name,
      email,
      password: hashPassword,
      age: age || undefined,
    };

    //create user
    const user = await users.create(newUser);

    //remove otp from otp model
    await otpModel.deleteMany({ userId: user._id });
  
    //add new otp
    await otpModel.create({ userId: user._id, otp });

    const userWithoutPass = user.toObject();
    delete userWithoutPass.password;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      email:email,
      user: userWithoutPass,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    //validation

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    //check user
    const user = await users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        statusCode: 401,
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
        isVerified: false // Frontend ko batane ke liye ki OTP page dikhao
      });
    }

    //compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //generate token
    const token = generateToken({ userId: user._id });

    return res.status(200).json({
      success: true,
      message: "login successfull",
      token: token,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const otp = generateOtp();

    //remove old otps
    await otpModel.deleteMany({ userId: user._id });

    //add new otp
    await otpModel.create({
      userId: user._id,
      otp,
    });

    await sendForgotPasswordMail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP send to email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyForgetPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP required",
      });
    }

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpData = await otpModel.findOne({
      userId: user._id,
      otp,
    });

    if (!otpData) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }

    const resetToken = generateToken({ userId: user._id });

    await otpModel.deleteMany({ userId: user._id });

    return res.status(200).json({
      success: true,
      message: "OTP verified",
      resetToken:resetToken
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifySingupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP required",
      });
    }

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpData = await otpModel.findOne({
      userId: user._id,
      otp,
    });

    if (!otpData) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }

    user.isVerified = true;
    await user.save();
    await otpModel.deleteMany({ userId: user._id });

    return res.status(200).json({
      success: true,
      message: "OTP verified",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token) return res.status(400).json({ message: "Reset token is required" });

    // Helper function ya JWT se userId nikaalein
    // Maan lijiye aapka generateToken JWT use karta hai
    // Token verify
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired reset token" });
    }

    const user = await users.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashPassword = await encryptPassword(newPassword);

    user.password = hashPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
