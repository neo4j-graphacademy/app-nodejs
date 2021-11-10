export default class ValidationError extends Error {
  constructor(message, details) {
    super(message)

    this.code = 400
    this.details = details
  }
}
