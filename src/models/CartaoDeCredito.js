import { Model, DataTypes } from "sequelize";

export class CartaoDeCredito extends Model {
  nomeTitular;
  numero;
  validade;
  cvv;

  static initModel(sequelize) {
    CartaoDeCredito.init({
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
    }, {
      sequelize
    })
    
    return CartaoDeCredito
  }
}