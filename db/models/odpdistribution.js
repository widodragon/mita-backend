'use strict';
module.exports = (sequelize, DataTypes) => {
  const ODPDistribution = sequelize.define('ODPDistribution', {
    sales_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
    status_occ: DataTypes.STRING,
    service_port: DataTypes.STRING,
    device_port: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  ODPDistribution.associate = function(models) {
    // associations can be defined here
    ODPDistribution.belongsTo(models.SalesMaster,{
      foreignKey:'sales_id',
      sourceKey:'id',
      as:'sales'
    });
  };
  return ODPDistribution;
};