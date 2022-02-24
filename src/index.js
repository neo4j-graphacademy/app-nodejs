import app from './app.js'

// Listen
const port = process.env.APP_PORT || 3000

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${process.env.APP_PORT || 3000}/`)
})
