'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SalesMasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      agency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AgencyMasters',
          key: 'id'
        },
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
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
    return queryInterface.dropTable('SalesMasters');
  }
};