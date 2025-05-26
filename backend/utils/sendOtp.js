const axios = require('axios');

const sendOTP = async (phoneNumber, otpCode) => {

  const url = process.env.URL_SEND_OTP;

  const data = {
    phone: `963${phoneNumber}`, // Phone number in international format
    message: `Your OTP code is: ${otpCode}`
  };

  try {
    const response = await axios.post(url, data,{
      headers:{
        'x-password':process.env.X_PASSWORD
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Failed to send OTP');
  }
};

module.exports = sendOTP;
