import { Ciclista } from "../database/models/Ciclista.js";
import OperationCode from "./ErrorOperationCodes.js";
import ErrorsView from "../views/ErrorsView.js";

const view = new ErrorsView();

export async function existeEmail(req, res) {
  try {
    if (!req.params.email) {
      res.status(400);
      return res.send({
        codigo: OperationCode.EMAIL_REQUIRED,
        mensagem: view.messages.get(OperationCode.EMAIL_REQUIRED),
      });
    }
    const ciclistaComEmail = await Ciclista.findOne({
      where: { email: req.params.email },
    });
    if (ciclistaComEmail === null) {
      res.status(200);
      res.send(false);
    } else {
      res.status(200);
      res.send(true);
    }
  } catch (e) {
    res.status(422);
    res.send({
      codigo: OperationCode.INVALID_DATA,
      mensagem: view.messages.get(OperationCode.INVALID_DATA),
    });
  }
}

export default { existeEmail };
