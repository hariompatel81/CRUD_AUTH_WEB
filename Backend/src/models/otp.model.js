const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp:{
    type:String
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "users",
    required:true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
    expires: 600
  }

},{timestamps:true});

const otpModel = mongoose.model('otp',otpSchema);

module.exports = otpModel;