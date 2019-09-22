'use strict';
module.exports = (sequelize, DataTypes) => {
  const SalesMaster = sequelize.define('SalesMaster', {
    agency_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  SalesMaster.associate = function(models) {
    // associations can be defined here
    SalesMaster.hasMany(models.ODPDistribution,{
      foreignKey:'sales_id',
      sourceKey:'id',
      as:'odp'
    });
    SalesMaster.hasMany(models.APCDistribution,{
      foreignKey:'sales_id',
      sourceKey:'id',
      as:'apc'
    });
    SalesMaster.hasMany(models.Schedule,{
      foreignKey:'sales_id',
      sourceKey:'id',
      as:'schedule'
    });
    SalesMaster.hasMany(models.MobiMaster,{
      foreignKey:'sales_id',
      sourceKey:'id',
      as:'mobi'
    });
    SalesMaster.belongsTo(models.AgencyMaster,{
      foreignKey:'agency_id',
      sourceKey:'id',
      as:'agency'
    });
  };
  return SalesMaster;
};