export default class ValidationError extends Error {
  constructor(message, details) {
    super(message)

    this.code = 422
    this.details = details
  }
}
