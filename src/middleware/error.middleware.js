/**
 * Generic error handler.  Output error details as JSON.
 *
 * WARNING: You shouldn't do this in a production environment in any circumstances
 *
 * @param {Error} error
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export default function errorMiddleware(error, req, res, next) {
  console.log(error)

  res.status(error.code || 500)
    .json({
      status: 'error',
      code: error.code || 500,
      message: error.message,
      trace: error.trace,
      details: error.details,
    })
}
