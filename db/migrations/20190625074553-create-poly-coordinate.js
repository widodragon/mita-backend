'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PolyCoordinates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apc_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'APCDistributions',
          key: 'coordinate'
        },
      },
      lat: {
        type: Sequelize.DOUBLE
      },
      lon: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PolyCoordinates');
  }
};