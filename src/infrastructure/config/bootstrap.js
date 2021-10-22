'use strict';

require('dotenv').config();

const constants = require('./constants');
const environment = require('./environment');

module.exports = {
  async init() {
    if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
      require('../db/mongoose/mongoose');
    }

    if (environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES) {
      const sequelize = require('../db/sequelize/sequelize');
      try {
        await sequelize.sync();
        console.log('La conexión a la base de datos se ha establecido correctamente.');
      } catch (err) {
        console.error('No se puede conectar a la base de datos:', err);
      }
    }
  },
};
