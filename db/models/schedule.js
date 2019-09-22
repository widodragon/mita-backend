'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    sales_id: DataTypes.INTEGER,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    mobi: DataTypes.STRING,
    sales: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
    image: DataTypes.TEXT
  }, {});
  Schedule.associate = function(models) {
    // associations can be defined here
    Schedule.belongsTo(models.SalesMaster,{
      foreignKey:'sales_id',
      sourceKey:'id',
      as:'sf'
    });
  };
  return Schedule;
};