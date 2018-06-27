'use strict';

console.log('Hello Noteful!');

// IMPORT MODULES
const express = require('express');
const app = express();
const { PORT } = require('./config');
const morgan = require('morgan');
const notesRouter = require('./router/notes.router');

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
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// LISTENER
app.listen(PORT, function() {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
