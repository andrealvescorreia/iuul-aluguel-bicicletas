import { CartaoDeCredito } from "./CartaoDeCredito.js";
import { Ciclista } from "./Ciclista.js";
import { Funcionario } from "./Funcionario.js";
import { Aluguel } from "./Aluguel.js";
import { Devolucao } from "./Devolucao.js";

export { Ciclista, CartaoDeCredito, Funcionario, Aluguel, Devolucao };

export function initModels(sequelize) {
  CartaoDeCredito.initModel(sequelize);
  Ciclista.initModel(sequelize);
  Funcionario.initModel(sequelize);
  Aluguel.initModel(sequelize);
  Devolucao.initModel(sequelize);

  Ciclista.hasOne(CartaoDeCredito, {
    as: 'meioDePagamento',
    foreignKey: 'id'
  })

  CartaoDeCredito.belongsTo(Ciclista, {
    foreignKey: 'id'
  })

  Aluguel.hasOne(Ciclista, {
    foreignKey: 'id'
  })

  Devolucao.hasOne(Ciclista, {
    foreignKey: 'id'
  })

  return {
    Ciclista,
    CartaoDeCredito,
    Funcionario,
    Aluguel,
    Devolucao,
  };
}
