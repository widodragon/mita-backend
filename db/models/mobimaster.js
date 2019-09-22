'use strict';
module.exports = (sequelize, DataTypes) => {
  const MobiMaster = sequelize.define('MobiMaster', {
    sales_id: DataTypes.INTEGER,
    no_mobi: DataTypes.STRING
  }, {});
  MobiMaster.associate = function(models) {
    // associations can be defined here
     MobiMaster.belongsTo(models.SalesMaster,{
      foreignKey:'sales_id',
      sourceKey:'id',
      as:'sf'
    });
  };
  return MobiMaster;
};