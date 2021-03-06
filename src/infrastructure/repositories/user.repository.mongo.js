'use strict';

const User = require('../../domain/User');
const MongooseUser = require('../db/mongoose/schemas/User');
const UserRepository = require('../../domain/UserRepository');

module.exports = class extends UserRepository {
  constructor() {
    super();
  }

  async persist(userEntity) {
    const { firstName, lastName, email, password } = userEntity;
    const mongooseUser = new MongooseUser({ firstName, lastName, email, password });
    await mongooseUser.save();
    return new User(
      mongooseUser.id,
      mongooseUser.firstName,
      mongooseUser.lastName,
      mongooseUser.email,
      mongooseUser.password
    );
  }

  async merge(userEntity) {
    const { id, firstName, lastName, email, password } = userEntity;
    const mongooseUser = MongooseUser.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      password,
    });
    return new User(
      mongooseUser[0].id,
      mongooseUser[0].firstName,
      mongooseUser[0].lastName,
      mongooseUser[0].email,
      mongooseUser[0].password
    );
  }

  async remove(userId) {
    return MongooseUser.findOneAndDelete(userId);
  }

  async get(userId) {
    const mongooseUser = await MongooseUser.findById(userId);
    return new User(
      mongooseUser.id,
      mongooseUser.firstName,
      mongooseUser.lastName,
      mongooseUser.email,
      mongooseUser.password
    );
  }

  async getByEmail(userEmail) {
    const mongooseUser = await MongooseUser.find({ email: userEmail });

    if (Object.keys(mongooseUser).length == 0) return new User(mongooseUser);

    return new User(
      mongooseUser[0].id,
      mongooseUser[0].firstName,
      mongooseUser[0].lastName,
      mongooseUser[0].email,
      mongooseUser[0].password
    );
  }

  async find() {
    const mongooseUsers = await MongooseUser.find();
    return mongooseUsers.map((mongooseUser) => {
      return new User(
        mongooseUser.id,
        mongooseUser.firstName,
        mongooseUser.lastName,
        mongooseUser.email,
        mongooseUser.password
      );
    });
  }
};
