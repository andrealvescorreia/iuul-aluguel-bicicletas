import { Model, DataTypes, UUIDV4 } from "sequelize";

export class Funcionario extends Model {
  static initModel(sequelize) {
    Funcionario.init(
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
        idade: {
          allowNull: false,
          type: DataTypes.INTEGER,
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
          type: DataTypes.UUID,
          defaultValue: UUIDV4(),
        },
      },
      {
        sequelize: sequelize,
        timestamps: false,
        freezeTableName: true,
      }
    );

    return Funcionario;
  }
}
