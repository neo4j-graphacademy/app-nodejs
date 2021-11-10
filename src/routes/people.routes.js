import { Router } from 'express'
import passport from 'passport'
import { getDriver } from '../neo4j.js'
import MovieService from '../services/movie.service.js'
import PeopleService from '../services/people.service.js'
import { getPagination, getUserId, MOVIE_SORT, PEOPLE_SORT } from '../utils.js'

const router = new Router()

router.use(passport.authenticate(['jwt', 'anonymous'], { session: false }))

/**
 * @GET /people/
 *
 * This route should return a paginated list of People from the database
 */
router.get('/', async (req, res, next) => {
  try {
    const { q, sort, order, limit, skip } = getPagination(req, PEOPLE_SORT)
    const driver = getDriver()

    const peopleService = new PeopleService(driver)
    const people = await peopleService.all(q, sort, order, limit, skip)

    res.json(people)
  }
  catch(e) {
    next(e)
  }
})

/**
 * @GET /people/:id
 *
 * This route should the properties of a Person based on their tmdbId
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const driver = getDriver()

    const peopleService = new PeopleService(driver)
    const person = await peopleService.findById(id)

    res.json(person)
  }
  catch(e) {
    next(e)
  }
})

/**
 * @GET /people/:id/similar
 *
 * This route should return a paginated list of similar people to the person
 * with the :id supplied in the route params.
 */
router.get('/:id/similar', async (req, res, next) => {
  try {
    const { id } = req.params
    const driver = getDriver()

    const peopleService = new PeopleService(driver)
    const people = await peopleService.getSimilarPeople(id)

    res.json(people)
  }
  catch(e) {
    next(e)
  }
})

/**
 * @GET /people/:id/acted
 *
 * This route should return a paginated list of movies that the person
 * with the :id has acted in.
 */
router.get('/:id/acted', async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = getUserId(req)
    const { sort, order, limit, skip } = getPagination(req, MOVIE_SORT)
    const driver = getDriver()

    const movieService = new MovieService(driver)
    const movies = await movieService.getForActor(id, sort, order, limit, skip, userId)

    res.json(movies)
  }
  catch(e) {
    next(e)
  }
})

/**
 * @GET /people/:id/directed
 *
 * This route should return a paginated list of movies that the person
 * with the :id has directed.
 */
router.get('/:id/directed', async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = getUserId(req)
    const { sort, order, limit, skip } = getPagination(req, PEOPLE_SORT)
    const driver = getDriver()

    const movieService = new MovieService(driver)
    const movies = await movieService.getForDirector(id, sort, order, limit, skip, userId)

    res.json(movies)
  }
  catch(e) {
    next(e)
  }
})

export default router
