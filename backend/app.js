const express = require('express');
const morgan = require('morgan');
const i18next = require('./utils/i18n');
const i18nextMiddleware = require('i18next-http-middleware');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
const cors = require('cors');

const paymentRouter = require('./routs/paymentRoutes');
const userRouter = require('./routs/userRoutes');
const auctionRouter = require('./routs/auctionRoutes');
const categoryRouter = require('./routs/categoryRoutes');
const tenderRouter = require('./routs/tenderRoutes');
const favoriteRouter = require('./routs/favoriteRoutes');
if (process.env.ENABLE_CRON == 'true') {
  require('./utils/scheduler');
}
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionSuccessStatus: 200,
};
// Middellwares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

//app.use('/api/v1/users',userRouter)

//app.use('/api/v1/tours', tourRouter);
app.use(i18nextMiddleware.handle(i18next));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auctions', auctionRouter);
app.use('/api/v1/categories', categoryRouter);

app.use('/api/v1/tenders', tenderRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/favorites', favoriteRouter);
app.use('/api/v1/tenders', tenderRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
