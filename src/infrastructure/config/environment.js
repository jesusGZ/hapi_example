'use strict';

module.exports = (() => {
  const environment = {
    database: {
      dialect: process.env.DATABASE_DIALECT,
      url: process.env.DATABASE_URI,
    },
  };

  return environment;
})();
