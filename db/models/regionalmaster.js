'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegionalMaster = sequelize.define('RegionalMaster', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  RegionalMaster.associate = function(models) {
    // associations can be defined here
    RegionalMaster.hasMany(models.WitelMaster,{
      foreignKey:'regional_id',
      sourceKey:'id',
      as:'witel'
    });
  };
  return RegionalMaster;
};