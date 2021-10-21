'use strict';

const _serializeSingleUser = (user) => {
  return {
    'id': user.id,
    'first-name': user.firstName,
    'last-name': user.lastName,
    'email': user.email,
  };
};

module.exports = class {

  serialize(data) {
    
    if (!data) throw new Error('Se espera que los datos no sean indefinidos ni nulos');
    
    if (Array.isArray(data)) return data.map(_serializeSingleUser);
    
    return _serializeSingleUser(data);
  }

};