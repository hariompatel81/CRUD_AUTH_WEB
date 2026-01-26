const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

// forget password mail
const sendForgotPasswordMail = async (userEmail, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: userEmail,
      subject: "Reset Your Password - CRUD_AUTH_WEB",
      text: `Your OTP is ${otp}. This OTP is valid for 2 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Forgot Password</h2>
          <p>You requested to reset your password.</p>

          <p style="font-size:18px; font-weight:bold;">
            Your OTP is: <span style="color:#0056b3;">${otp}</span>
          </p>

          <p>This OTP is valid for only <b>10 minutes</b>.</p>

          <p>If you did not request this, please ignore this email.</p>

          <br />
          <p>Thanks,<br/>CRUD_AUTH_WEB Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Forgot password email failed:", error.message);
    throw error;
  }
};

module.exports = { sendForgotPasswordMail, transporter };
