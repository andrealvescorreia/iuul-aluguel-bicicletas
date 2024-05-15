import OperationCode from "./ErrorOperationCodes.js";
import ErrorsView from "../views/ErrorsView.js";

import Ciclista from "../models/Ciclista.js";
import CartaoDeCredito from "../models/CartaoDeCredito.js";

import CiclistaRepository from "../repositories/CiclistaRepositorySequelize.js";
import CartaoDeCreditoRepository from "../repositories/CartaoDeCreditoRepositorySequelize.js";

const view = new ErrorsView();
const ciclistaRepository = new CiclistaRepository();
const cartaoRepository = new CartaoDeCreditoRepository();
const ciclistaModel = new Ciclista(ciclistaRepository);

// !Mock temporário, até que o microserviço Externo esteja pronto 
// e com a rota /validaCartaoDeCredito funcionando!
const isCartaoValidMock = () => true
const cartaoModel = new CartaoDeCredito(cartaoRepository, isCartaoValidMock);

export async function criaCiclista(req, res) {
  try {
    const dadosCiclista = req.body;

    const resCriacaoCiclista = await ciclistaModel.create(dadosCiclista.ciclista)
    console.log(resCriacaoCiclista)
    if (resCriacaoCiclista.failure) {
      let erros = [];
      resCriacaoCiclista.failure.forEach(erro => {
        let msg = view.messages.get(erro.code)
        let campo = erro.field
        erros.push({
          codigo: erro.code,
          mensagem: campo ? campo + ': ' + msg : msg
        })
      })
      res.status(422);
      return res.send(erros);
    }

    const resCriacaoCartao = await cartaoModel.create(dadosCiclista.meioDePagamento)
    console.log(resCriacaoCartao)
    if (resCriacaoCartao.failure) {
      let erros = [];
      resCriacaoCartao.failure.forEach(erro => {
        let msg = view.messages.get(erro.code)
        let campo = erro.field
        erros.push({
          codigo: erro.code,
          mensagem: campo ? campo + ': ' + msg : msg
        })
      })

      res.status(422);
      return res.send(erros);
    }
    res.status(201);
    return res.send(resCriacaoCiclista.success);
  } catch (e) {
    res.status(400);
    return res.send({
      //codigo: OperationCode.EMAIL_REQUIRED,
      mensagem: e,
    });
  }

}

export async function existeEmail(req, res) {
  try {
    if (!req.params.email) {
      res.status(400);
      return res.send({
        codigo: OperationCode.EMAIL_REQUIRED,
        mensagem: view.messages.get(OperationCode.EMAIL_REQUIRED),
      });
    }

    const ciclistaComEmail = await ciclistaRepository.getByEmail(req.params.email)
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

// ! lembre de exportar todas as funcoes!
export default { existeEmail, criaCiclista };
