import OperationCode from "./ErrorOperationCodes.js";
import ErrorsView from "../views/ErrorsView.js";
import { Aluguel } from "../database/models/Aluguel.js";
import axios from "axios";

const view = new ErrorsView();

export async function realizarAluguel(req, res) {
  try {
    const data = req.body;

    // MOCK
    const ciclistaRes = await axios.get(`/ciclista/${data.ciclista}/`);

    //Verifica se o ciclista existe
    if (ciclistaRes.status != 200) {
      res.status(422);
      return res.send({
        codigo: OperationCode.INVALID_CYCLIST,
        mensagem: view.messages.get(OperationCode.INVALID_CYCLIST),
      });
    }

    const ciclista = ciclistaRes.data;

    const permiteAluguel = await axios.get(
      `/ciclista/${data.ciclista}/permiteAluguel`
    );

    if (permiteAluguel.data != true) {
      //Envia um email com os dados do aluguel ativo
      const bicicletaAlugada = await axios.get(
        `/ciclista/${data.ciclista}/bicicletaAlugada`
      );

      const aluguelAtivo = await Aluguel.findOne({
        where: {
          bicicleta: bicicletaAlugada.data.numero,
        },
      });

      const aluguelEmailMessage = JSON.stringify(aluguelAtivo.toJSON());

      //MOCK
      // await axios.post("/email", {
      //   email: ciclista.email,
      //   assunto: "Aluguel de bicicleta ativo",
      //   mensagem: aluguelEmailMessage,
      // });

      res.status(422);
      return res.send({
        codigo: OperationCode.ALREADY_HAS_A_RENT,
        mensagem: view.messages.get(OperationCode.ALREADY_HAS_A_RENT),
      });
    }

    // MOCK
    // const bicicletaRes = await axios.get(
    //   `/tranca/${data.trancaInicio}/bicicleta`
    // );

    const bicicleta = bicicletaRes.data;

    if (!bicicleta.status != "DISPONÍVEL") {
      res.status(422);
      return res.send({
        codigo: OperationCode.BIKE_UNAVAILABLE,
        mensagem: view.messages.get(OperationCode.BIKE_UNAVAILABLE),
      });
    }

    const cobranca = await axios.post("/cobranca", {
      valor: 10, //R$10
      ciclista: data.ciclista,
    });

    if (cobranca.status == "PAGA") {
      const aluguelCriado = await Aluguel.create({
        bicicleta: bicicleta.numero,
        horaInicio: cobranca.data.horaSolicitacao,
        trancaFim: data.trancaInicio, // Inconsistência com a doc. Não deve existe trancaFim aqui
        horaFim: cobranca.data.horaFinalizacao, // Inconsistência com a doc. Não deve existe horaFim aqui
        cobranca: cobranca.data.id,
        ciclista: ciclista.id,
        trancaInicio: data.trancaInicio,
      });

      // MOCK
      // await axios.post(`/tranca/${data.trancaInicio}/destrancar`, {
      //   bicicleta: bicicleta.id,
      // });

      // MOCK
      // await axios.post("/email", {
      //   email: ciclista.email,
      //   assunto: "Aluguel de bicicleta realizado",
      //   mensagem: JSON.stringify(aluguelCriado.toJSON()),
      // });
    }

    //Pagamento não realizado
    res.status(422);
    return res.send({
      codigo: OperationCode.PAYMENT_NOT_MADE,
      mensagem: view.messages.get(OperationCode.PAYMENT_NOT_MADE),
    });
  } catch (error) {
    console.log(error);
    res.status(422);
    res.send({
      codigo: OperationCode.INVALID_DATA,
      mensagem: view.messages.get(OperationCode.INVALID_DATA),
    });
  }
}

export default {};
