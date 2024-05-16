import ErrorOperationCodes from "../controllers/ErrorOperationCodes.js";
import CPFValidator from "../utils/CPFValidator.js";
import isEmail from 'validator/lib/isEmail.js';

export default class Ciclista {
  ciclistaRepository;
  sendEmail;

  constructor(ciclistaRepository, sendEmail) {
    this.ciclistaRepository = ciclistaRepository
    this.sendEmail = sendEmail
  }

  #camposFaltando(ciclista) {
    const requiredFields = ['nome', 'email', 'senha', 'nascimento', 'nacionalidade', 'urlFotoDocumento']
    const missingFields = []

    requiredFields.forEach((field) => {
      if (!(field in ciclista) || ciclista[field] === undefined) {
        missingFields.push(field);
      }
    });
    if (ciclista.nacionalidade === 'BRASILEIRO' && !ciclista.cpf) {
      // brasileiro precisa do cpf
      missingFields.push('cpf')
    }
    if (ciclista.nacionalidade === 'ESTRANGEIRO' && !ciclista.passaporte) {
      // estrangeiro precisa de passaporte
      missingFields.push('passaporte')
    }

    if (ciclista.passaporte) {
      if (!ciclista.passaporte.numero) {
        missingFields.push('passaporte.numero')
      }
      if (!ciclista.passaporte.validade) {
        missingFields.push('passaporte.validade')
      }
      if (!ciclista.passaporte.pais) {
        missingFields.push('passaporte.pais')
      }
    }
    return missingFields
  }

  #erros(ciclista) {
    const errors = [];
    this.#camposFaltando(ciclista).forEach((field) => {
      errors.push({
        code: ErrorOperationCodes.MISSING_REQUIRED_FIELD,
        field,
      });
    })

    if (!isEmail(ciclista.email)) {
      errors.push({
        code: ErrorOperationCodes.INVALID_FIELD,
        field: 'email'
      })
    }

    if (ciclista.nacionalidade !== 'BRASILEIRO' && ciclista.nacionalidade !== 'ESTRANGEIRO') {
      errors.push({
        code: ErrorOperationCodes.INVALID_FIELD,
        field: 'nacionalidade'
      })
    }

    if (ciclista.cpf) {
      const cpfvalidator = new CPFValidator()
      if (!cpfvalidator.isValid(ciclista.cpf)) {
        errors.push({
          code: ErrorOperationCodes.INVALID_FIELD,
          field: 'cpf'
        })
      }
    }

    return errors;
  }

  /**
 * Cria um ciclista
 * @constructor
 * @param {object} ciclista
 * @param {string} ciclista.nome
 * @param {string} ciclista.email
 * @param {string} ciclista.senha
 * @param {string} ciclista.status
 * @param {Date} ciclista.nascimento
 * @param {string} ciclista.nacionalidade
 * @param {string} ciclista.cpf - obrigatório para brasileiros
 * @param {string} ciclista.urlFotoDocumento
 * @param {Object} ciclista.passaporte - obrigatório para estrangeiros
 * @param {string} ciclista.passaporte.numero - código alfanumérico
 * @param {Date} ciclista.passaporte.validade
 * @param {string} ciclista.passaporte.pais
 */
  async create(ciclista) {
    const errors = this.#erros(ciclista);

    if (await this.ciclistaRepository.getByEmail(ciclista.email) !== null) {
      errors.push({
        code: ErrorOperationCodes.EMAIL_ALREADY_IN_USE,
        field: 'email'
      })
    }

    const ciclistaCriado = await this.ciclistaRepository.add(ciclista);
    if (!ciclistaCriado) {
      errors.push({
        code: ErrorOperationCodes.INVALID_CYCLIST
      })
    }

    const resEnvioEmail = await this.sendEmail({
      email: ciclista.email,
      assunto: 'Ativação da conta',
      mensagem: 'Olá, voce se cadastrou no sistema Bicicletário. Para ativar a sua conta, acesse o link a seguir: https://ativar'
    })

    if (resEnvioEmail.failure) {
      errors.push({
        code: ErrorOperationCodes.COULD_NOT_SEND_EMAIL
      })
      await this.ciclistaRepository.deleteById(ciclistaCriado.id);
    }

    // Retorna o objeto Ciclista ou a lista de erros
    return errors.length === 0
      ? {
        success: ciclistaCriado
      }
      : { failure: errors };
  }
}