const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const useRouter = require('./routes/userRoutes');

// MIddlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(morgan('dev')); // to log which api is called and its related things like time status etc
app.use(express.json()); // middleware to read body data also called body parser
// app.use(express.static(`${__dirname}/public`));
// custom middleware
app.use((req, res, next) => {
  // middleware applies to every request whether it is get post put patch delete etc
  console.log('hello from middleware ...');
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter); // this is called mounting of routers
app.use('/api/v1/users', useRouter);

// Server
module.exports = app;
