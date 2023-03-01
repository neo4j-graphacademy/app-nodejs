import { config } from 'dotenv'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JWT_SECRET } from '../constants.js'
import { getDriver } from '../neo4j.js'
import AuthService from '../services/auth.service.js'

config()

/**
 * This JWT strategy attempts to extract the JWT token from the request headers,
 * verify the signature and then pass the `claims` through to the callback function.
 *
 * Calling the `done` callback with the users details will append the user details
 * to the request as `req.user`.
 *
 * You can invoke this strategy by adding the following middleware to your router or
 * route handler function:
 *
 *     router.use(passport.authenticate('jwt'))
 *
 * For an example where authentication is required see `src/routes/account.routes.js`.
 *
 * For optional authentication, see `src/routes/movies.routes.js`.
 *
 */
// tag::strategy[]
export const JwtStrategy = new Strategy({
  secretOrKey: JWT_SECRET,    // Secret for encoding/decoding the JWT token
  ignoreExpiration: true,     // Ignoring the expiration date of a token may not be the best idea in a production environment
  passReqToCallback: true,    // Passing the request to the callback allows us to use the open transaction
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (req, claims, done) => {
  const driver = getDriver()
  const authService = new AuthService(driver)

  return done(null, await authService.claimsToUser(claims))
})
// end::strategy[]
