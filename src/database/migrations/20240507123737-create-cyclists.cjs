"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Ciclista", {
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
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      status: {
        allowNull: false,
        defaultValue: "AGUARDANDO_CONFIRMACAO",
        type: DataTypes.ENUM("ATIVO", "INATIVO", "AGUARDANDO_CONFIRMACAO"),
      },
      nascimento: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      cpf: {
        allowNull: false,
        type: DataTypes.CHAR(11),
      },
      nacionalidade: {
        allowNull: false,
        type: DataTypes.ENUM('BRASILEIRO', 'ESTRANGEIRO'),
      },
      urlFotoDocumento: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      senha: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      passaporte: {
        type: DataTypes.JSON(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Ciclista");
  },
};
