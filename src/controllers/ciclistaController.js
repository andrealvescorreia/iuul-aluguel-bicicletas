import OperationCode from "./ErrorOperationCodes.js";
import ErrorsView from "../views/ErrorsView.js";

import Ciclista from "../models/Ciclista.js";
import CartaoDeCredito from "../models/CartaoDeCredito.js";

import CiclistaRepository from "../repositories/CiclistaRepositorySequelize.js";
import CartaoDeCreditoRepository from "../repositories/CartaoDeCreditoRepositorySequelize.js";

const view = new ErrorsView();
const ciclistaRepository = new CiclistaRepository();
const cartaoRepository = new CartaoDeCreditoRepository();

// !Mock temporário, até que o microserviço Externo esteja pronto
const sendEmailMock = () => { return { success: true } }
const isCartaoValidMock = () => true

const ciclistaModel = new Ciclista(ciclistaRepository, sendEmailMock);
const cartaoModel = new CartaoDeCredito(cartaoRepository, isCartaoValidMock);


export async function criaCiclista(req, res) {
  try {
    const dadosCiclista = req.body;

    const resCriacaoCiclista = await ciclistaModel.create(dadosCiclista.ciclista)
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

    const resCriacaoCartao = await cartaoModel.create({
      ...dadosCiclista.meioDePagamento,
      ciclista: resCriacaoCiclista.success.id
    })
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

      // caso não foi possível registrar o cartão, deleta o cadastro do ciclista do sistema
      await ciclistaRepository.deleteById(resCriacaoCiclista.success.id)
      res.status(422);
      return res.send(erros);
    }
    res.status(201);
    return res.send(resCriacaoCiclista.success);
  } catch (e) {
    res.status(404);
    return res.send({
      codigo: OperationCode.BAD_REQUEST,
      mensagem: view.messages.get(erro.code),
    });
  }

}

export async function encontraCiclista(req, res) {
  if (!req.params.idCiclista) {
    res.status(400);
    return res.send({
      codigo: OperationCode.MISSING_REQUIRED_FIELD,
      mensagem: 'idCiclista ' + view.messages.get(OperationCode.MISSING_REQUIRED_FIELD),
    });
  }

  const ciclista = await ciclistaRepository.getById(req.params.idCiclista)
  if (!ciclista) {
    res.status(404);
    return res.send({
      codigo: OperationCode.NOT_FOUND,
      mensagem: view.messages.get(OperationCode.NOT_FOUND),
    });
  }
  res.status(200);
  return res.send({ ciclista });
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
export default { existeEmail, criaCiclista, encontraCiclista };
