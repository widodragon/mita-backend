'use strict';
module.exports = (sequelize, DataTypes) => {
  const APCDistribution = sequelize.define('APCDistribution', {
    witel_id: DataTypes.INTEGER,
    nama_lop: DataTypes.STRING,
    nama_segment: DataTypes.STRING,
    nama_kemitraan: DataTypes.STRING,
    alamat: DataTypes.STRING,
    stat: DataTypes.STRING,
    potensi_hh: DataTypes.STRING,
    jumlah_huni: DataTypes.STRING,
    developer: DataTypes.STRING,
    nama_mitra: DataTypes.STRING,
    status_bangunan: DataTypes.STRING,
    coordinate: DataTypes.INTEGER,
    jml_odp: DataTypes.STRING,
    status_ftth: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  APCDistribution.associate = function(models) {
    // associations can be defined here
    APCDistribution.hasMany(models.PolyCoordinate,{
      foreignKey:'apc_id',
      sourceKey:'coordinate',
      as:'polygon'
    });
  };
  return APCDistribution;
};