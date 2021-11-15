import { Router } from 'express'
import passport from 'passport'
import NotFoundError from '../errors/not-found.error.js'
import { getDriver } from '../neo4j.js'
import MovieService from '../services/movie.service.js'
import RatingService from '../services/rating.service.js'
import { getPagination, MOVIE_SORT, RATING_SORT } from '../utils.js'

const router = new Router()

// Optional Authentication
router.use(passport.authenticate(['jwt', 'anonymous'], { session: false }))

/**
 * @GET /movies
 *
 * This route should return a paginated list of movies, sorted by the
 * `sort` query parameter,
 */
// tag::list[]
router.get('/', async (req, res, next) => {
  try {
    const { sort, order, limit, skip }
      = getPagination(req, MOVIE_SORT) // <1>

    const movieService = new MovieService(
      getDriver()
    ) // <2>

    const movies = await movieService.all(
      sort, order, limit, skip
    ) // <3>

    res.json(movies)
  }
  catch (e) {
    next(e)
  }
})
// end::list[]


/**
 * @GET /movies/:id
 *
 * This route should find a movie by its tmdbId and return its properties.
 */
// tag::get[]
router.get('/:id', async (req, res, next) => {
  try {
    const driver = getDriver()

    const movieService = new MovieService(driver)
    const movie = await movieService.findById(req.params.id)

    if (!movie) {
      return next(new NotFoundError(`Movie with id ${req.params.id} not found`))
    }

    res.json(movie)
  }
  catch (e) {
    next(e)
  }
})
// end::get[]

/**
 * @GET /movies/:id/ratings
 *
 *
 * This route should return a paginated list of ratings for a movie, ordered by either
 * the rating itself or when the review was created.
 */
// tag::ratings[]
router.get('/:id/ratings', async (req, res, next) => {
  try {
    const driver = getDriver()
    const { sort, order, limit, skip } = getPagination(req, RATING_SORT)

    const ratingService = new RatingService(driver)
    const reviews = await ratingService.forMovie(req.params.id, sort, order, limit, skip)

    res.json(reviews)
  }
  catch (e) {
    next(e)
  }
})
// ennd::ratings[]

/**
 * @GET /movies/:id/similar
 *
 * This route should return a paginated list of similar movies, ordered by the
 * similarity score in descending order.
 */
// tag::similar[]
router.get('/:id/similar', async (req, res, next) => {
  try {
    const driver = getDriver()
    const { limit, skip } = getPagination(req)

    const movieService = new MovieService(driver)
    const movie = await movieService.getSimilarMovies(req.params.id, limit, skip)

    if (!movie) {
      return next(new NotFoundError(`Movie with id ${req.params.id} not found`))
    }

    res.json(movie)
  }
  catch (e) {
    next(e)
  }
})
// end::similar[]

export default router
