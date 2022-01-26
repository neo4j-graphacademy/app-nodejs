import { Router } from 'express'
import movies from './movies.routes.js'
import genres from './genres.routes.js'
import auth from './auth.routes.js'
import account from './account.routes.js'
import people from './people.routes.js'
import status from './status.routes.js'

const router = new Router()

router.use('/movies', movies)
router.use('/genres', genres)
router.use('/auth', auth)
router.use('/account', account)
router.use('/people', people)
router.use('/status', status)

export default router
