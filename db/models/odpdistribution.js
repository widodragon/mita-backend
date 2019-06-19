'use strict';
module.exports = (sequelize, DataTypes) => {
  const ODPDistribution = sequelize.define('ODPDistribution', {
    witel_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
    kandatel: DataTypes.STRING,
    status_occ: DataTypes.STRING,
    service_port: DataTypes.STRING,
    device_port: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  ODPDistribution.associate = function(models) {
    // associations can be defined here
  };
  return ODPDistribution;
};