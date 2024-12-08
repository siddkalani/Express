import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state?.email || ''); // Get email from navigation state
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      // Make a POST request to verify the OTP
      const response = await fetch('http://localhost:3002/api/otp/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('OTP verified successfully! Redirecting to your dashboard...');
        setError('');

        // Redirect to the dashboard after successful verification
        setTimeout(() => navigate('/dashboard'), 3000); // Redirect after 3 seconds
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'OTP verification failed');
        setMessage('');
      }
    } catch (e) {
      console.error('Error verifying OTP:', e);
      setError('Something went wrong. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          OTP Verification
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          We sent an OTP to your email <strong>{email}</strong>. Please enter it below.
        </p>

        {/* OTP Input */}
        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <input
            type="number"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleVerify}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Verify OTP
        </button>

        {/* Success or Error Message */}
        {message && (
          <p className="mt-4 text-green-600 text-center font-medium">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;
