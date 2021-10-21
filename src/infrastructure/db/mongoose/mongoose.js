'use strict';

const mongoose = require('mongoose');
const environment = require('../../config/environment');

mongoose.connect(environment.database.url, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexion:'));
db.once('open', () => {
  console.log('Conectado a MongoDB!')
});

module.exports = mongoose;
