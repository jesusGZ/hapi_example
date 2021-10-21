'use strict';

module.exports = (accessToken, { accessTokenManager }) => {
  const decoded = accessTokenManager.decode(accessToken);
  
  if (!decoded) throw new Error('Token de acceso invalido');
  
  return { uid: decoded.uid };
};
