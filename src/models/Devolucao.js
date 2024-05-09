import { Model, DataTypes } from "sequelize";

export class Devolucao extends Model {
  static initModel(sequelize) {
    Devolucao.init(
      {
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
          references: {
            model: "Ciclista",
            key: "id",
          },
        },
      },
      {
        sequelize: sequelize,
        timestamps: false,
      }
    );

    return Devolucao;
  }
}