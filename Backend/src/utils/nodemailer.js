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

const sendWelcomeOTP = async (userEmail, otp) => {
  try {
    await transporter.sendMail({
      from: `"CRUD AUTH WEB" <${process.env.USER_EMAIL}>`,
      to: userEmail,
      subject: "Your OTP for Verification",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:20px;">
          <div style="max-width:500px; margin:auto; background:white; padding:25px; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,0.1)">
            
            <h2 style="color:#0f172a; text-align:center;">
              Welcome to CRUD_AUTH_WEB
            </h2>

            <p style="color:#334155; font-size:15px;">
              Hi there,<br/><br/>
              Use the following OTP to verify your email address:
            </p>

            <div style="text-align:center; margin:20px 0;">
              <span style="
                display:inline-block;
                background:#38bdf8;
                color:#0f172a;
                font-size:22px;
                font-weight:bold;
                padding:12px 25px;
                border-radius:8px;
                letter-spacing:2px;">
                ${otp}
              </span>
            </div>

            <p style="color:#475569; font-size:14px;">
              ⏰ This OTP is valid for <b>5 minutes</b> only.
            </p>

            <p style="color:#64748b; font-size:13px;">
              If you did not request this, please ignore this email.
            </p>

            <hr style="margin:20px 0"/>

            <p style="text-align:center; font-size:12px; color:#94a3b8;">
              © ${new Date().getFullYear()} CRUD_AUTH_WEB
            </p>
          </div>
        </div>
      `
    });

    console.log("OTP Email sent successfully");

  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};


module.exports = { sendForgotPasswordMail, sendWelcomeOTP, transporter };
