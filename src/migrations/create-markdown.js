'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('markdown', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      contentMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT('long')
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      specialty: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('markdown');
  }
};