'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    user_id: DataTypes.INTEGER,
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
    // Schedule.hasOne(models.Vehicle,{
    //   as:'vehicle',
    //   foreignKey:'id',
    //   onDelete: 'CASCADE'
    // });
  };
  return Schedule;
};