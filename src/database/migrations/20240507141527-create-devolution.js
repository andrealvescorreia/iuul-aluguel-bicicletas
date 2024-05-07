"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Devolucao", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bicicleta: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      horaInicio: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      trancaFim: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      horaFim: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      cobranca: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ciclista: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Devolucao");
  },
};
