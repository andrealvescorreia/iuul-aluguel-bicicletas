"use strict";

const { DataTypes, UUIDV4 } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Funcionario", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nascimento: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      funcao: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cpf: {
        allowNull: false,
        type: DataTypes.CHAR(11),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      senha: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      matricula: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: UUIDV4(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Funcionario");
  },
};
