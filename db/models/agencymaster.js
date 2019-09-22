'use strict';
module.exports = (sequelize, DataTypes) => {
  const AgencyMaster = sequelize.define('AgencyMaster', {
    datel_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  AgencyMaster.associate = function(models) {
    // associations can be defined here
    AgencyMaster.hasMany(models.SalesMaster,{
      foreignKey:'agency_id',
      sourceKey:'id',
      as:'sales'
    });
    AgencyMaster.belongsTo(models.DatelMaster,{
      foreignKey:'datel_id',
      sourceKey:'id',
      as:'datel'
    });
  };
  return AgencyMaster;
};