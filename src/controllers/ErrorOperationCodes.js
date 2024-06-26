export default class ErrorOperationCodes {
  static get EMAIL_REQUIRED() { return 1 }
  static get CYCLIST_REQUIRED() { return 2 }
  static get INVALID_CYCLIST() { return 3 }
  static get ALREADY_HAS_A_RENT() { return 4 }
  static get PAYMENT_NOT_MADE() { return 5 }
  static get BIKE_UNAVAILABLE() { return 6 }
  static get MISSING_REQUIRED_FIELD() { return 23 }
  static get INVALID_FIELD() { return 24 }
  static get EMAIL_ALREADY_IN_USE() { return 25 }
  static get INVALID_CARTAO_DE_CREDITO() { return 26 }
  static get CYCLIST_NOT_FOUND() { return 27 }
  static get COULD_NOT_SEND_EMAIL() { return 28 }
  static get BAD_REQUEST() { return 29 }
  static get NOT_FOUND() { return 404 }
  static get INVALID_DATA() { return 422 }
}