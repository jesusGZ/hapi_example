'use strict';

module.exports = async (email, password, { userRepository, accessTokenManager }) => {
  const user = await userRepository.getByEmail(email);

  if (!user || user.password !== password) throw new Error('Credenciales incorrectas');

  return accessTokenManager.generate({ uid: user.id });
};
