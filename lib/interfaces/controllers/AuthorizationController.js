'use strict';

const Boom = require('@hapi/boom');
const GetAccessToken = require('../../aplication/use_cases/GetAccessToken');
const VerifyAccessToken = require('../../aplication/use_cases/VerifyAccessToken');

module.exports = {

  async getAccessToken(request) {

    const serviceLocator = request.server.app.serviceLocator;

    const grantType = request.payload['grant_type'];
    const email = request.payload['username'];
    const password = request.payload['password'];
    
    if (!grantType || grantType !== 'password') throw Boom.badRequest('Invalid authentication strategy');
    
    try {
      const accessToken = await GetAccessToken(email, password, serviceLocator);

      return accessToken;
    } catch (err) {
      return Boom.unauthorized('Bad credentials');
    }
  },

  verifyAccessToken(request, h) {

    const serviceLocator = request.server.app.serviceLocator;

    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) throw Boom.badRequest('Token incorrecto o faltante.', 'oauth');

    const accessToken = authorizationHeader.replace(/Bearer/gi, '').replace(/ /g, '');

    try {
      const { uid } = VerifyAccessToken(accessToken, serviceLocator);

      return h.authenticated({
        credentials: { uid },
        artifacts: { accessToken: accessToken }
      });
    } catch (err) {
      return Boom.unauthorized('Bad credentials');
    }
  },

};