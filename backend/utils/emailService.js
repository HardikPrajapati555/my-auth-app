const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.BASE_URL}/api/auth/verify/${token}`;
  await transporter.sendMail({
    from: `"App Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your Email',
    html: `<p>Please verify your email by clicking <a href="${url}">here</a></p>`
  });
};

module.exports = { sendVerificationEmail };
