const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//encrypt password
exports.encryptPassword = async (password)=>{
  return await bcrypt.hash(password, 10);
}

//compare password
exports.comparePassword = async (password, hashPassword)=> {
  return await bcrypt.compare(password, hashPassword);
}

//generate token
exports.generateToken = (payload)=> {
  return jwt.sign(payload, process.env.SECRET_KEY,{ expiresIn: "1d"});
}

// Generate 6-digit unique OTP
exports.generateOtp = () => {
  // Math.random() * 900000 + 100000 se hamesha 100000 aur 999999 ke beech number aayega
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
}



