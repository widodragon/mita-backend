'use strict';
module.exports = (sequelize, DataTypes) => {
  const PolyCoordinate = sequelize.define('PolyCoordinate', {
    apc_id: DataTypes.INTEGER,
    lat: DataTypes.DOUBLE,
    lon: DataTypes.DOUBLE
  }, {});
  PolyCoordinate.associate = function(models) {
    // associations can be defined here
  };
  return PolyCoordinate;
};