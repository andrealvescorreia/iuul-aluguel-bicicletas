import { Ciclista } from '../database/models/Ciclista.js'
import { db } from '../database/db.js';
import { initModels } from '../database/models/index.js';
import ErrorOperationCodes from '../controllers/ErrorOperationCodes.js';

export default class CiclistaRepository {
  constructor() {
    initModels(db);
  }

  async getAll() {
    const ciclistas = await Ciclista.findAll();
    return ciclistas;
  }

  async add(ciclista) {
    try {
      const created = await Ciclista.create(ciclista);
      return created;
    } catch (e) {
      if (e.name === 'SequelizeForeignKeyConstraintError') {
        return { failure: [{ code: ErrorOperationCodes.EMAIL_ALREADY_IN_USE }] }
      }
      return { failure: [{ code: ErrorOperationCodes.INVALID_CYCLIST }] }
    }

  }

  async getByEmail(email) {
    const ciclistaComEmail = await Ciclista.findOne({
      where: { email },
    });
    return ciclistaComEmail;
  }

  async deleteById(id) {
    const ciclista = await Ciclista.findByPk(id);
    await ciclista.destroy();
  }
}