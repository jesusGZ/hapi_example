'use strict';

const Hapi = require('@hapi/hapi');
const Good = require('@hapi/good');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package.json');

const createServer = async () => {
  const server = Hapi.server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  });

  await server.register([
    Blipp,
    Inert,
    Vision,
    {
      // @ts-ignore
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Documentacion de APIs del servicio "hapi example"',
          version: Package.version,
        },
      },
    },
    {
      // @ts-ignore
      plugin: Good,
      options: {
        ops: {
          interval: 1000 * 60,
        },
        reporters: {
          myConsoleReporter: [
            {
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{ ops: '*', log: '*', error: '*', response: '*' }],
            },
            {
              module: '@hapi/good-console',
            },
            'stdout',
          ],
        },
      },
    },
  ]);

  await server.register([
    require('./auth'),
    require('../../interfaces/routes/private'),
    require('../../interfaces/routes/users'),
  ]);

  // @ts-ignore
  server.app.serviceLocator = require('../../infrastructure/config/service-locator');

  return server;
};

module.exports = createServer;
