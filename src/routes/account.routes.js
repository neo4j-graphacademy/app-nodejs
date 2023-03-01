import { Router } from 'express'
import passport from 'passport'
import { getDriver } from '../neo4j.js'
import FavoriteService from '../services/favorite.service.js'
import RatingService from '../services/rating.service.js'
import { getPagination, getUserId, MOVIE_SORT } from '../utils.js'

const router = new Router()

/**
 * Require jwt authentication for these routes
 */
router.use(passport.authenticate('jwt', { session: false }))

/**
 * @GET /account/
 *
 * This route simply returns the claims made in the JWT token
 */
router.get('/', (req, res, next) => {
  try {
    res.json(req.user)
  }
  catch (e) {
    next(e)
  }
})

/**
 * @GET /account/favorites/
 *
 * This route should return a list of movies that a user has added to their
 * Favorites link by clicking the Bookmark icon on a Movie card.
 */
// tag::list[]
router.get('/favorites', async (req, res, next) => {
  try {
    const driver = getDriver()
    const userId = getUserId(req)

    const { sort, order, limit, skip } = getPagination(req, MOVIE_SORT)

    const service = new FavoriteService(driver)
    const favorites = await service.all(userId, sort, order, limit, skip)

    res.json(favorites)
  }
  catch (e) {
    next(e)
  }
})
// end::list[]

/**
 * @POST /account/favorites/:id
 *
 * This route should create a `:HAS_FAVORITE` relationship between the current user
 * and the movie with the :id parameter.
 */
// tag::add[]
router.post('/favorites/:id', async (req, res, next) => {
  try {
    const driver = getDriver()
    const userId = getUserId(req)

    const service = new FavoriteService(driver)
    const favorite = await service.add(userId, req.params.id)

    res.json(favorite)
  }
  catch (e) {
    next(e)
  }
})
// end::add[]


/**
 * @DELETE /account/favorites/:id
 *
 * This route should remove the `:HAS_FAVORITE` relationship between the current user
 * and the movie with the :id parameter.
 */
// tag::delete[]
router.delete('/favorites/:id', async (req, res, next) => {
  try {
    const driver = getDriver()
    const userId = getUserId(req)

    const service = new FavoriteService(driver)
    const favorite = await service.remove(userId, req.params.id)

    res.json(favorite)
  }
  catch (e) {
    next(e)
  }
})
// end::delete[]


/**
 * @POST /account/ratings/:id
 *
 * This route should create a `:RATING` relationship between the current user
 * and the movie with the :id parameter.  The rating value will be posted as part
 * of the post body.
 */
// tag::rating[]
router.post('/ratings/:id', async (req, res, next) => {
  try {
    const driver = getDriver()
    const userId = getUserId(req)

    const service = new RatingService(driver)
    const rated = await service.add(userId, req.params.id, parseInt(req.body.rating))

    res.json(rated)
  }
  catch (e) {
    next(e)
  }
})
// tag::rating[]

export default router
