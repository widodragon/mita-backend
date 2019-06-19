'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    level: DataTypes.STRING,
    regName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Witel,{
      foreignKey:'user_id',
      sourceKey:'id',
      as:'distribution'
    });
    User.hasMany(models.Schedule,{
      foreignKey:'user_id',
      sourceKey:'id',
      as:'schedule'
    });
  };
  return User;
};