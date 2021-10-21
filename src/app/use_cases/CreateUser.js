'use strict';

const User = require('../../domain/User');
const Boom = require('@hapi/boom');

module.exports = async (firstName, lastName, email, password, { userRepository }) => {
  
  const data_user = await userRepository.getByEmail(email);
  
  if (data_user.email === email) throw Boom.badRequest('Email ya registrado.');

  const user = new User(null, firstName, lastName, email, password);

  return userRepository.persist(user);
};
