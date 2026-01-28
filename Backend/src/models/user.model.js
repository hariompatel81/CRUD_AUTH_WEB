const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  age:{
    type: Number
  },
  avatar:{
    type:String,
    default: ""
  },
  bio:{
    type:String,
    default: ""
  }
},{timestamps: true});

const users = mongoose.model("users",userSchema);

module.exports = users;