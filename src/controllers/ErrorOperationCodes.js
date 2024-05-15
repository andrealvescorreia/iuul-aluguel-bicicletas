export default class ErrorOperationCodes {
  static get EMAIL_REQUIRED() { return 1 }
  static get CYCLIST_REQUIRED() { return 2 }
  static get INVALID_CYCLIST() { return 3 }
  static get MISSING_REQUIRED_FIELD() { return 23 }
  static get INVALID_FIELD() { return 24 }
  static get EMAIL_ALREADY_IN_USE() { return 25 }
  static get INVALID_CARTAO_DE_CREDITO() { return 26 }
  static get CYCLIST_NOT_FOUND() { return 27 }
  static get INVALID_DATA() { return 422 }
}