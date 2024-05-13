import { Ciclista } from '../models/Ciclista.js';
import ciclistaOperationCode from './ciclistaOperationCode.js';
import CiclistaView from '../views/ciclistaView.js';

const view = new CiclistaView();

export async function existeEmail(req, res) {
  try {
    if (!req.params.email) {
      res.status(400)
      res.send({
        codigo: ciclistaOperationCode.EMAIL_REQUIRED,
        mensagem: view.messages.get(ciclistaOperationCode.EMAIL_REQUIRED)
      })
    }
    const ciclistaComEmail = await Ciclista.findOne({
      where: { email: req.params.email }
    });
    if (ciclistaComEmail === null) {
      res.status(200)
      res.send(false)
    } else {
      res.status(200)
      res.send(true)
    }
  } catch (e) {
    res.status(422)
    res.send({
      codigo: ciclistaOperationCode.INVALID_DATA,
      mensagem: view.messages.get(ciclistaOperationCode.INVALID_DATA)
    })
  }
}

export default { existeEmail }