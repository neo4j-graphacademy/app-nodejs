import { Strategy } from 'passport-local'
import { getDriver } from '../neo4j.js'
import { user } from '../../test/fixtures/users.js'
import AuthService from '../services/auth.service.js'

/**
 * The Neo4jStrategy is a 'local' strategy that is used to extract
 * the email and password fields from the request and attempt to authenticate
 * the user against the Neo4j database.
 *
 * If the credentials are correct, the `done` callback function should be called with
 * an object representing the user.  The user object will be appended to the request
 * object as: `req.user`
 *
 * If the credentials are incorrect, the `done` callback should be called with `false`
 *
 * You can invoke this strategy by adding the following middleware to your router or
 * route handler function:
 *
 *     passport.authenticate('local'),
 *
 * For an example info see `src/routes/auth.routes.js`.
 *
 */
// tag::strategy[]
export const Neo4jStrategy = new Strategy({
  usernameField: 'email',  // Use email address as username field
  session: false,          // Session support is not necessary
  passReqToCallback: true, // Passing the request to the callback allows us to use the open transaction
}, async (req, email, password, done) => {
  const driver = getDriver()
  const service = new AuthService(driver)

  const user = await service.authenticate(email, password)

  done(null, user)
})
// end::strategy[]
