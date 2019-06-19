'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mobi: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sales: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lon: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Schedules');
  }
};