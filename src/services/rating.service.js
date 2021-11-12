import { goodfellas } from '../../test/fixtures/movies.js'
import { ratings } from '../../test/fixtures/ratings.js'
import NotFoundError from '../errors/not-found.error.js'
import { toNativeTypes } from '../utils.js'

// TODO: Import the `int` function from neo4j-driver

export default class ReviewService {
  /**
   * @type {neo4j.Driver}
   */
  driver

  /**
  * The constructor expects an instance of the Neo4j Driver, which will be
  * used to interact with Neo4j.
  *
  * @param {neo4j.Driver} driver
  */
  constructor(driver) {
    this.driver = driver
  }

  /**
   * @public
   * Return a paginated list of reviews for a Movie.
   *
   * Results should be ordered by the `sort` parameter, and in the direction specified
   * in the `order` parameter.
   * Results should be limited to the number passed as `limit`.
   * The `skip` variable should be used to skip a certain number of rows.
   *
   * @param {string} id       The tmdbId for the movie
   * @param {string} sort  The field to order the results by
   * @param {string} order    The direction of the order (ASC/DESC)
   * @param {number} limit    The total number of records to return
   * @param {number} skip     The number of records to skip
   * @returns {Promise<Record<string, any>>}
   */
  // tag::forMovie[]
  async forMovie(id, sort = 'timestamp', order = 'ASC', limit = 6, skip = 0) {
    // TODO: Get ratings for a Movie

    return ratings
  }
  // end::forMovie[]

  /**
   * @public
   * Add a relationship between a User and Movie with a `rating` property.
   * The `rating` parameter should be converted to a Neo4j Integer.
   *
   * If the User or Movie cannot be found, a NotFoundError should be thrown
   *
   * @param {string} userId   the userId for the user
   * @param {string} movieId  The tmdbId for the Movie
   * @param {number} rating   An integer representing the rating from 1-5
   * @returns {Promise<Record<string, any>>}  A movie object with a rating property appended
   */
  // tag::add[]
  async add(userId, movieId, rating) {
    // TODO: Convert the native integer into a Neo4j Integer
    // TODO: Save the rating in the database
    // TODO: Return movie details and a rating

    return goodfellas
  }
  // end::add[]

}
