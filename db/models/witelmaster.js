'use strict';
module.exports = (sequelize, DataTypes) => {
  const WitelMaster = sequelize.define('WitelMaster', {
    regional_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING
  }, {});
  WitelMaster.associate = function(models) {
    // associations can be defined here
    WitelMaster.hasMany(models.DatelMaster,{
      foreignKey:'witel_id',
      sourceKey:'id',
      as:'datel'
    });
  };
  return WitelMaster;
};