'use strict';

const { Sequelize } = require('sequelize');
const environment = require('../../config/environment');

const sequelize = new Sequelize(environment.database.url);

// @ts-ignore
sequelize.import('./models/User');

module.exports = sequelize;
