import { Router } from 'express'
import NotFoundError from '../errors/not-found.error.js'
import { getDriver } from '../neo4j.js'
import GenreService from '../services/genre.service.js'
import MovieService from '../services/movie.service.js'
import { getPagination, getUserId, MOVIE_SORT } from '../utils.js'

const router = new Router()

/**
 * @GET /genres/
 *
 * This route should retrieve a full list of Genres from the
 * database along with a poster and movie count.
 */
router.get('/', async (req, res, next) => {
  try {
    const driver = getDriver()

    const genreService = new GenreService(driver)
    const genres = await genreService.all()

    res.json(genres)
  }
  catch(e) {
    next(e)
  }
})

/**
 * @GET /genres/:name
 *
 * This route should return information on a genre with a name
 * that matches the :name URL parameter.  If the genre is not found,
 * a 404 should be thrown.
 */
router.get('/:name', async (req, res, next) => {
  try {
    const driver = getDriver()

    const genreService = new GenreService(driver)
    const genre = await genreService.find(req.params.name)

    if (!genre) {
      return next(new NotFoundError(`Genre not found with name ${req.params.name}`))
    }

    res.json(genre)
  }
  catch(e) {
    next(e)
  }
})

/**
 * @GET /genres/:name/movies
 *
 * This route should return a paginated list of movies that are listed in
 * the genre whose name matches the :name URL parameter.
 */
router.get('/:name/movies', async (req, res, next) => {
  try {
    const { sort, order, limit, skip } = getPagination(req, MOVIE_SORT)
    const userId = getUserId(req)
    const driver = getDriver()

    const movieService = new MovieService(driver)
    const movies = await movieService.getByGenre(req.params.name, sort, order, limit, skip, userId)

    res.json(movies)
  }
  catch(e) {
    next(e)
  }
})

export default router
