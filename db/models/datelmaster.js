'use strict';
module.exports = (sequelize, DataTypes) => {
  const DatelMaster = sequelize.define('DatelMaster', {
    witel_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING
  }, {});
  DatelMaster.associate = function(models) {
    // associations can be defined here
    DatelMaster.hasMany(models.AgencyMaster,{
      foreignKey:'datel_id',
      sourceKey:'id',
      as:'agency'
    });
    DatelMaster.belongsTo(models.WitelMaster,{
      foreignKey:'witel_id',
      sourceKey:'id',
      as:'witel'
    });
  };
  return DatelMaster;
};