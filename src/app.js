import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import routes from './routes/index.js'
import errorMiddleware from './middleware/error.middleware.js'
import passport from 'passport'
import './passport/index.js'
import { initDriver } from './neo4j.js'
import { API_PREFIX, JWT_SECRET, NEO4J_PASSWORD, NEO4J_URI, NEO4J_USERNAME } from './constants.js'

// Create Express instance
const app = express()

// Authentication
app.use(passport.initialize())

app.use(session({
  secret: JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(cors())
app.use(bodyParser.json())

// Connect to Neo4j and Verify Connectivity
initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)

// Serve the UI
app.use(express.static('public'))

// Register API Route Handlers
app.use(API_PREFIX, routes)

// Handle Errors
app.use(errorMiddleware)

// Server all other routes as index.html
app.use((req, res) => {
  if (req.header('Content-Type') === 'application/json' ) {
    return res.status(404).json({
      error: 404,
      message: 'Page not found'
    })
  }
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'))
})

export default app
