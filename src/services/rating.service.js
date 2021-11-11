import { goodfellas } from '../../test/fixtures/movies.js'
import { ratings } from '../../test/fixtures/ratings.js'
import NotFoundError from '../errors/not-found.error.js'
import { toNativeTypes } from '../utils.js'

import { int } from 'neo4j-driver'

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
  // tag::RatingService.forMovie[]
  async forMovie(id, sort = 'timestamp', order = 'ASC', limit = 6, skip = 0) {
    // TODO: Get ratings for a Movie

    return ratings
  }
  // end::RatingService.forMovie[]

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
    // tag::convert[]
    // Convert the native integer into a Neo4j Integer
    rating = int(rating)
    // end::convert[]

    // tag::write[]
    // Save the rating in the database
    const session = this.driver.session()
    const res = await session.writeTransaction(tx => tx.run(`
      MATCH (u:User {userId: $userId})
      MATCH (m:Movie {tmdbId: $movieId})

      MERGE (u)-[r:RATED]->(m)
      SET r.rating = $rating

      RETURN m {
        .*,
        rating: r.rating
      } AS movie
    `, { userId, movieId, rating }))
    // end::write[]

    // tag::throw[]
    if ( res.records.length === 0 ) {
      throw new NotFoundError(`Could not create rating for Movie ${movieId} by User ${userId}`)
    }
    // end::throw[]

    // Close the session
    await session.close()

    // tag::addreturn[]
    const [ first ] = res.records
    const movie = first.get('movie')

    return toNativeTypes(movie)
    // end::addreturn[]
  }
  // end::add[]

}
