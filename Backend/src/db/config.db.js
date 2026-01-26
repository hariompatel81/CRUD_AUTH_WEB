const mongoose = require("mongoose");

const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully");
  }catch(err){
    console.log("DB connection faild",err.message);
    process.exit(1);
  }
}

module.exports = connectDB;