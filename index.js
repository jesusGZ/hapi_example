'use strict';

const bootstrap = require('./lib/infrastructure/config/bootstrap');
const createServer = require('./lib/infrastructure/webserver/server');

const start = async () => {

  try {
    await bootstrap.init();

    const server = await createServer();
    await server.start();

    console.log('Servicio corriendo en:', server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();