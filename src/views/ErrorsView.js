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
    this.#messages.set(OperationErrors.INVALID_DATA, "Dados inválidos");

    this.#messages.set(OperationErrors.MISSING_REQUIRED_FIELD, "faltando");
    this.#messages.set(OperationErrors.INVALID_FIELD, "inválido");
    this.#messages.set(OperationErrors.EMAIL_ALREADY_IN_USE, "E-mail indisponível");
    this.#messages.set(OperationErrors.INVALID_CARTAO_DE_CREDITO, "Cartão de crédito inválido");
    this.#messages.set(OperationErrors.CYCLIST_NOT_FOUND, "Ciclista não encontrado");
  }
}
