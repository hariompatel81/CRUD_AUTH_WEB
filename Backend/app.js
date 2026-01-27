require("dotenv").config(); // FIRST LINE

const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routes/auth.router');

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173","https://crud-auth-web.netlify.app/"], //  direct allow
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome");
});

app.use("/api", authRouter);

module.exports = app;
