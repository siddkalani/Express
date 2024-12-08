const otpGenerator = require('otp-generator');

// Function to generate a 6-digit OTP
const generateOtp = () => {
  return otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
};

module.exports = generateOtp;
