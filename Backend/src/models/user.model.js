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
  gender:{
    type:String,
    enum:['Male','Female','Other','Prefer not to say'],
    default:'Prefer not to say',
  },
  location:{
    city:{
      type:String,
      trim:true,
      default:"",
    },
    country:{
      type:String,
      trim:true,
      default:"",
    }
  },
  socialLinks:{
    linkedin:{type:String, default:""},
    github:{type:String, default:""},
  },
  skills: [{
    type:String,
    trim:true,
  }],
  age:{
    type: Number
  },
  avatar:{
    type:String,
    default: ""
  },
  bio:{
    type:String,
    default: "",
    maxlength: 250,
  },
  isVerified:{
    type:Boolean,
    default:false
  }
},{timestamps: true});

const users = mongoose.model("users",userSchema);

module.exports = users;