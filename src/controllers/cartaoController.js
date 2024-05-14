import OperationCode from "./ErrorOperationCodes.js";
import ErrorsView from "../views/ErrorsView.js";
import { CartaoDeCredito } from "../database/models/CartaoDeCredito.js";

const view = new ErrorsView();

export async function obterCartao(req, res) {
  try {
    if (!req.params.idCiclista) {
      res.status(404);
      return res.send({
        codigo: OperationCode.CYCLIST_REQUIRED,
        mensagem: view.messages.get(OperationCode.CYCLIST_REQUIRED),
      });
    }

    const cartao = await CartaoDeCredito.findOne({
      where: { ciclista: req.params.idCiclista },
    });

    if (cartao === null) {
      res.status(404);
      return res.send({
        codigo: OperationCode.INVALID_CYCLIST,
        mensagem: view.messages.get(OperationCode.INVALID_CYCLIST),
      });
    }

    res.status(200);
    res.send(cartao.toJSON());
  } catch (e) {
    res.status(422);
    res.send({
      codigo: OperationCode.INVALID_DATA,
      mensagem: view.messages.get(OperationCode.INVALID_DATA),
    });
  }
};

export async function atualizarCartao(req, res) {
  try {
    const dadosCartao = req.body;

    if (!req.params.idCiclista) {
      res.status(404);
      return res.send({
        codigo: OperationCode.CYCLIST_REQUIRED,
        mensagem: view.messages.get(OperationCode.CYCLIST_REQUIRED),
      });
    }

    if (!dadosCartao) {
      res.status(422);
      return res.send({
        codigo: OperationCode.INVALID_DATA,
        mensagem: view.messages.get(OperationCode.INVALID_DATA),
      });
    }

    const cartao = await CartaoDeCredito.update(dadosCartao, {
      where: {
        ciclista: req.params.idCiclista
      },
      returning: true,
    });

    if (cartao === null) {
      res.status(404);
      return res.send({
        codigo: OperationCode.INVALID_DATA,
        mensagem: view.messages.get(OperationCode.INVALID_DATA),
      });
    }

    res.status(200).send(cartao[1][0]);
  } catch (e) {
    res.status(422);
    res.send({
      codigo: OperationCode.INVALID_DATA,
      mensagem: view.messages.get(OperationCode.INVALID_DATA),
    });
  }
};

export default { obterCartao, atualizarCartao };
