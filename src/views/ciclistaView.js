import OperationErrors from "../controllers/ciclistaOperationCode.js";
export default class CiclistaView {
  #messages

  constructor() {
    this.#messages = new Map()

    this.#setupMessages()
  }

  get messages() {
    return this.#messages
  }

  #setupMessages() {
    this.#messages.set(
      OperationErrors.EMAIL_REQUIRED,
      'E-mail é obrigatório'
    )
    this.#messages.set(
      OperationErrors.INVALID_DATA,
      'Dados inválidos'
    )
  }
}