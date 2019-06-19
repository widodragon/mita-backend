'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('APCDistributions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      witel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Witels',
          key: 'id'
        },
      },
      nama_lop: {
        type: Sequelize.STRING
      },
      nama_segment: {
        type: Sequelize.STRING
      },
      nama_kemitraan: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      stat: {
        type: Sequelize.STRING
      },
      potensi_hh: {
        type: Sequelize.STRING
      },
      jumlah_huni: {
        type: Sequelize.STRING
      },
      developer: {
        type: Sequelize.STRING
      },
      nama_mitra: {
        type: Sequelize.STRING
      },
      status_bangunan: {
        type: Sequelize.STRING
      },
      coordinate: {
        type: Sequelize.INTEGER
      },
      jml_odp: {
        type: Sequelize.STRING
      },
      status_ftth: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('APCDistributions', ['coordinate'],{
      type: 'unique',
      name: 'custom_unique_constraint_name'
    }))
    .then(() => {
        // perform further operations if needed
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('APCDistributions');
  }
};