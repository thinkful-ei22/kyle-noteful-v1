'use strict';

const logger = function(req, res, next) {
  const now = new Date();
  const options = { 
    month:'numeric', 
    day:'numeric', 
    year:'numeric', 
    hour:'numeric', 
    minute:'numeric', 
    second:'numeric'
  };
  
  // eslint-disable-next-line no-console
  console.log(`${now.toLocaleDateString('en-US', options)} ${req.method} ${req.url}`);
  next();
};

module.exports = {logger};