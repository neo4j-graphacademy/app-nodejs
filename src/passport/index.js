import passport from 'passport'
import { user } from '../../test/fixtures/users.js'
import { Neo4jStrategy } from './neo4j.strategy.js'
import { JwtStrategy } from './jwt.strategy.js'
import { Strategy as AnonymousStrategy } from 'passport-anonymous'

// Register the Neo4j Strategy for authenticating users against the database
passport.use(Neo4jStrategy)

// Register the Jwt Strategy for authenticating JWT tokens
passport.use(JwtStrategy)

// Allow anonoymous login
passport.use(new AnonymousStrategy())

// Serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((id, done) => {
  done(null, user)
})
