import { CartaoDeCredito } from '../database/models/CartaoDeCredito.js'
import { db } from '../database/db.js';
import { initModels } from '../database/models/index.js';
import ErrorOperationCodes from '../controllers/ErrorOperationCodes.js';
export default class CartaoDeCreditoRepository {
  constructor() {
    initModels(db);
  }

  async add(cartao) {
    try {
      const created = await CartaoDeCredito.create(cartao);
      return created;
    } catch (e) {
      if (e.name === 'SequelizeForeignKeyConstraintError') {
        return { failure: [{ code: ErrorOperationCodes.CYCLIST_NOT_FOUND }] }
      }
      return { failure: [{ code: ErrorOperationCodes.INVALID_CARTAO_DE_CREDITO }] }
    }
  }
}