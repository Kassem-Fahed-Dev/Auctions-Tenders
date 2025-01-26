const express = require('express');
const morgan = require('morgan');

const app = express();
//const tourRouter = require('./routes/tourRouter');

const userRouter = require('./routs/userRoutes')


// Middellwares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static('public'));

// app.use((req, res, next) => {
//   console.log('welcome');
//   next();
// });
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

//app.use('/api/v1/users',userRouter)

//app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
