const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const User = require('./models/User');
const app = express();


dotenv.config({ path: `./config.env` });
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds (default is often 30000ms)
  socketTimeoutMS: 45000, 
  })
  .then(() => console.log('done'))
  .catch((err) => console.log(err));

  const deleteUser = async()=>{
    await User.findByIdAndDelete('68a4ad02d7cdc20063c6f147');
  }
  const addAdmin = async()=>{
    await User.create({
    name: "admin",
    role:"admin",
    email: "admin@gmail.com",
    password: "123123123",
    passwordConfirm: "123123123",
    phone: "000000000",
    profileImg: "",
  });
  }
  addAdmin()
  //deleteUser()
    
