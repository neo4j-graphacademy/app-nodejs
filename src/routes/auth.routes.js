import { Router } from 'express'
import passport from 'passport'
import { getDriver } from '../neo4j.js'
import AuthService from '../services/auth.service.js'

const router = new Router()

/**
 * @POST /auth/login
 *
 * This route invokes the `Neo4jStrategy` in `src/passport/neo4j.strategy.js`,
 * which, when implemented, attempts to authenticate the user against the
 * Neo4j database.
 *
 * The req.user object assigned by the strategy should include a `token` property,
 * which holds the JWT token.  This token is then used in the `JwtStrategy` from
 * `src/passport/jwt.strategy.js` to authenticate the request.
 */
// tag::login[]
router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json(req.user)
  }
)
// end::login[]


/**
 * @POST /auth/login
 *
 * This route should use the AuthService to create a new User node
 * in the database with an encrypted password before returning a User record which
 * includes a `token` property.  This token is then used in the `JwtStrategy` from
 * `src/passport/jwt.strategy.js` to authenticate the request.
 */
// tag::register[]
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body
    const driver = getDriver()

    const authService = new AuthService(driver)
    const output = await authService.register(email, password, name)

    res.json(output)
  }
  catch(e) {
    next(e)
  }
})
// end::register[]

export default router
