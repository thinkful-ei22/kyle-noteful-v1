'use strict';

// eslint-disable-next-line no-console
console.log('Hello Noteful!');

// IMPORT MODULES
const express = require('express');
const { PORT } = require('./config');
const morgan = require('morgan');
const notesRouter = require('./router/notes.router');

const app = express();

// LOGGING
app.use(morgan('dev'));

// STATIC SERVER
app.use(express.static('public'));

// PARSE REQUEST BODY
app.use(express.json());

// ROUTER(S)
app.use('/api', notesRouter);

// ERROR HANDLING
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// LISTENER
app.listen(PORT, function() {
  // eslint-disable-next-line no-console
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  // eslint-disable-next-line no-console
  console.error(err);
});
