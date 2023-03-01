import { Router } from 'express'
import { getDriver } from '../neo4j.js'

const router = new Router()

/**
 * @GET /status
 *
 * This route returns some basic information about the status of the API,
 * including whether the API has been defined and whether a transaction
 * has been bound to the request.
 *
 * This is for debugging purposes only and isn't used within the course
 */
router.get('/', (req, res) => {
  let driver = getDriver() !== undefined
  let transactions = req.transaction !== undefined
  let register = false
  let handleConstraintErrors = false
  let authentication = false
  let apiPrefix = process.env.API_PREFIX

  res.json({
    status: 'OK',
    driver,
    transactions,
    register,
    handleConstraintErrors,
    authentication,
    apiPrefix,
  })
})

export default router
