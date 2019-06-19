'use strict';
module.exports = (sequelize, DataTypes) => {
  const Witel = sequelize.define('Witel', {
    user_id: DataTypes.INTEGER, 
    witel: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
  }, {});
  Witel.associate = function(models) {
    // associations can be defined here
    Witel.hasMany(models.APCDistribution,{
      foreignKey:'witel_id',
      sourceKey:'id',
      as:'apc'
    });
    Witel.hasMany(models.ODPDistribution,{
      foreignKey:'witel_id',
      sourceKey:'id',
      as:'odp'
    });
  };
  return Witel;
};