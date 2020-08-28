const winston = require('winston');

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: `logs/${process.env.NODE_ENV}.error.v1.log`, level: 'error' }),
    new winston.transports.File({ filename: `logs/${process.env.NODE_ENV}.info.v1.log`, level: 'info' }),
    new winston.transports.File({ filename: `logs/${process.env.NODE_ENV}.info.v1.log`, level: 'warn' }),
  ],
});
 
module.exports = logger;