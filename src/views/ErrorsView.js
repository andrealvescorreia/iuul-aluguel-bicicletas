import OperationErrors from "../controllers/ErrorOperationCodes.js";

export default class CartaoView {
  #messages;

  constructor() {
    this.#messages = new Map();

    this.#setupMessages();
  }

  get messages() {
    return this.#messages;
  }

  #setupMessages() {
    this.#messages.set(OperationErrors.EMAIL_REQUIRED, "O e-mail é obrigatório")
    this.#messages.set(OperationErrors.CYCLIST_REQUIRED, "O id do ciclista é obrigatório");
    this.#messages.set(OperationErrors.INVALID_CYCLIST, "Não encontrado");
    this.#messages.set(OperationErrors.ALREADY_HAS_A_RENT, "Ciclista já possui aluguel ativo");
    this.#messages.set(OperationErrors.PAYMENT_NOT_MADE, "Pagamento não realizado");
    this.#messages.set(OperationErrors.BIKE_UNAVAILABLE, "Bicicleta indisponível para aluguel");
    this.#messages.set(OperationErrors.INVALID_DATA, "Dados inválidos");

    this.#messages.set(OperationErrors.MISSING_REQUIRED_FIELD, "faltando");
    this.#messages.set(OperationErrors.INVALID_FIELD, "inválido");
    this.#messages.set(OperationErrors.EMAIL_ALREADY_IN_USE, "E-mail já em uso");
    this.#messages.set(OperationErrors.INVALID_CARTAO_DE_CREDITO, "Cartão de crédito inválido");
    this.#messages.set(OperationErrors.CYCLIST_NOT_FOUND, "Ciclista não encontrado");
    this.#messages.set(OperationErrors.BAD_REQUEST, "requisição má formatada");
    this.#messages.set(OperationErrors.COULD_NOT_SEND_EMAIL, "não foi possível enviar o email");
    this.#messages.set(OperationErrors.NOT_FOUND, "não encontrado");
  }
}
