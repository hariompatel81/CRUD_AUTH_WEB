const app = require("./app");
const connectDB = require('./src/db/config.db');
require("dotenv").config();

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
  console.log("Server started at ",PORT);
});

