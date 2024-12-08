const asyncHandler = require('express-async-handler');
const OtpModel = require('../models/otpModel');
const sendOtpEmail = require('../services/emailService');
const generateOtp = require('../utils/generateOtp');

const requestOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  // Generate an OTP
  const otp = generateOtp();

  // Save OTP to the database with an expiration time
  await OtpModel.create({
    email,
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // Valid for 10 minutes
  });

  // Send OTP to user's email
  await sendOtpEmail(email, otp);

  res.status(200).json({ message: 'OTP sent to your email' });
});

module.exports = { requestOtp };
