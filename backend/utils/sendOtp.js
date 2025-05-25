const axios = require('axios');

const sendOTP = async (phoneNumber, otpCode) => {
  const idInstance = process.env.GREEN_API_ID;
  const apiTokenInstance = process.env.GREEN_API_TOKEN;

  const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  const data = {
    chatId: `963${phoneNumber}@c.us`, // Phone number in international format
    message: `Your OTP code is: ${otpCode}`
  };

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Green API Error:', error.response?.data || error.message);
    throw new Error('Failed to send OTP');
  }
};

module.exports = sendOTP;
