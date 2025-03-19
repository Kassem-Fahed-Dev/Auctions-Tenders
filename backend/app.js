const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
//const tourRouter = require('./routes/tourRouter');

const userRouter = require('./routs/userRoutes');
const auctionRouter = require('./routs/auctionRoutes');

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
app.use('/api/v1/auctions', auctionRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
