'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("CartaoDeCredito", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nomeTitular: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nomeTitular'
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      validade: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cvv: {
        type: DataTypes.CHAR(3),
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('CartaoDeCredito');
  }
};
