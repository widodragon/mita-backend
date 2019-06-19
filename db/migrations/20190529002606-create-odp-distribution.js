'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ODPDistributions', {
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
      name: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.STRING
      },
      lon: {
        type: Sequelize.STRING
      },
      kandatel: {
        type: Sequelize.STRING
      },
      status_occ: {
        type: Sequelize.STRING
      },
      service_port: {
        type: Sequelize.STRING
      },
      device_port: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ODPDistributions');
  }
};