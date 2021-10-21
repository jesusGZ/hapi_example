'use strict';

const Boom = require('@hapi/boom');
const ListUsers = require('../../app/use_cases/ListUsers');
const CreateUser = require('../../app/use_cases/CreateUser');
const GetUser = require('../../app/use_cases/GetUser');
const DeleteUser = require('../../app/use_cases/DeleteUser');

module.exports = {

  async createUser(request) {

    const serviceLocator = request.server.app.serviceLocator;

    const { firstName, lastName, email, password } = request.payload;

    const user = await CreateUser(firstName, lastName, email, password, serviceLocator);

    return serviceLocator.userSerializer.serialize(user);
  },

  async findUsers(request) {

    const serviceLocator = request.server.app.serviceLocator;

    const users = await ListUsers(serviceLocator);

    return users.map(serviceLocator.userSerializer.serialize)
  },

  async getUser(request) {

    const serviceLocator = request.server.app.serviceLocator;

    const userId = request.params.id;

    const user = await GetUser(userId, serviceLocator);

    if (!user) return Boom.notFound();
    
    return serviceLocator.userSerializer.serialize(user);
  },

  async deleteUser(request, h) {

    const serviceLocator = request.server.app.serviceLocator;

    const userId = request.params.id;

    await DeleteUser(userId, serviceLocator);

    return h.response().code(204);
  },

};
