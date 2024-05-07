import { Model, DataTypes } from "sequelize";

export class Aluguel extends Model {
  bicicleta;
  horaInicio;
  trancaFim;
  horaFim;
  cobranca;
  ciclista;
  trancaInicio;

  static initModel(sequelize) {
    Aluguel.init({
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
      trancaInicio: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    }, {
      sequelize
    })
    
    return Aluguel
  }
}