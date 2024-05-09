import { Model, DataTypes } from "sequelize";

export class Ciclista extends Model {
  static initModel(sequelize) {
    Ciclista.init(
      {
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
          type: DataTypes.ENUM("BRASILEIRO", "ESTRANGEIRO"),
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
      },
      {
        sequelize: sequelize,
        timestamps: false,
      }
    );

    return Ciclista;
  }
}