export default class ErrorOperationCodes {
  static get EMAIL_REQUIRED() { return 1 }
  static get CYCLIST_REQUIRED() { return 2 }
  static get INVALID_CYCLIST() { return 3 }
  static get ALREADY_HAS_A_RENT() { return 4 }
  static get PAYMENT_NOT_MADE() { return 5 }
  static get BIKE_UNAVAILABLE() { return 6 }
  static get INVALID_DATA() { return 422 }
}