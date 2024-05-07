import { CartaoDeCredito } from "./CartaoDeCredito";
import { Ciclista } from "./Ciclista";
import { Funcionario } from "./Funcionario";
import { Aluguel } from "./Aluguel";
import { Devolucao } from "./Devolucao";

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
    as: 'ciclista',
    foreignKey: 'id'
  })

  Aluguel.hasOne(Ciclista, {
    as: 'ciclista',
    foreignKey: 'id'
  })

  Devolucao.hasOne(Ciclista, {
    as: 'ciclista',
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
