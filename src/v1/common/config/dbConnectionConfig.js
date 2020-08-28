const logger = require('./logger');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db_url_conn = process.env.NODE_ENV === "test" ? global.__MONGO_URI__ : process.env.DB_URL_CONN;

mongoose.connect(db_url_conn, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, (err) => {
  if (err) throw err;
  logger.info('Conexão com o MongoDB conectada.')
});

exports.Schema = Schema;

exports.applicationDbConnection = () => {
  return mongoose.connection.useDb('rogalabs');
};

exports.closeConnections = () => {
  mongoose.connection.close()
  logger.info('Conexão com o MongoDB encerrada.')
};