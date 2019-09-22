'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WitelMasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      regional_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'RegionalMasters',
          key: 'id'
        },
      },
      name: {
        type: Sequelize.STRING
      },
      lat:{
        type: Sequelize.STRING
      },
      lon:{
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
    return queryInterface.dropTable('WitelMasters');
  }
};