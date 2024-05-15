import ErrorOperationCodes from "../controllers/ErrorOperationCodes.js";


export default class CartaoDeCredito {
  #cartaoDeCreditoRepository;
  #isValid;
  // isValid -> funcao que valida cartao, chamando uma API Externa
  constructor(cartaoDeCreditoRepository, isValid) {
    this.#cartaoDeCreditoRepository = cartaoDeCreditoRepository;
    this.#isValid = isValid
  }

  #camposFaltando(cartaoDeCredito) {
    const requiredFields = ['ciclista', 'nomeTitular', 'numero', 'validade', 'cvv']
    const missingFields = []
    requiredFields.forEach((field) => {
      if (!(field in cartaoDeCredito) || cartaoDeCredito[field] === undefined) {
        missingFields.push(field);
      }
    });
    return missingFields
  }

  /**
 * Registra o cartao de crédito de um ciclista
 * @constructor
 * @param {object} cartaoDeCredito
 * @param {number} cartaoDeCredito.ciclista - id do ciclista
 * @param {string} cartaoDeCredito.nomeTitular
 * @param {string} cartaoDeCredito.numero 
 * @param {string} cartaoDeCredito.cvv 
 * @param {Date} cartaoDeCredito.validade 
 */
  async create(cartaoDeCredito) {
    const errors = [];
    this.#camposFaltando(cartaoDeCredito).forEach((field) => {
      errors.push({
        code: ErrorOperationCodes.MISSING_REQUIRED_FIELD,
        field,
      });
    })

    if (!(await this.#isValid(cartaoDeCredito))) {
      errors.push({
        code: ErrorOperationCodes.INVALID_CARTAO_DE_CREDITO,
      });
    }

    const cartaoCriado = await this.#cartaoDeCreditoRepository.add(cartaoDeCredito)
    if (cartaoCriado.failure) {
      errors.push({
        code: cartaoCriado.failure[0].code
      })
    }
    if (!cartaoCriado) {
      errors.push({
        // TODO: criar outro erro para quando o BD não conseguiu salvar o dado.
        code: ErrorOperationCodes.INVALID_CARTAO_DE_CREDITO,
      })
    }

    // Retorna o objeto CartaoDeCredito criado ou a lista de erros
    return errors.length === 0
      ? {
        success: cartaoCriado
      }
      : { failure: errors };
  }
}