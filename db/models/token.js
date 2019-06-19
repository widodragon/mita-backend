'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    email: DataTypes.STRING,
    token: DataTypes.TEXT,
  }, {});
  Token.associate = function(models) {
    // associations can be defined here
  };
  return Token;
};