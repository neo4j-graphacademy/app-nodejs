import NotFoundError from '../errors/not-found.error.js'
import { toNativeTypes } from '../utils.js'

import { int } from 'neo4j-driver'

export default class FavoriteService {
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
   * This method should retrieve a list of movies that have an incoming :HAS_FAVORITE
   * relationship from a User node with the supplied `userId`.
   *
   * Results should be ordered by the `sort` parameter, and in the direction specified
   * in the `order` parameter.
   * Results should be limited to the number passed as `limit`.
   * The `skip` variable should be used to skip a certain number of rows.
   *
   * @param {string} userId  The unique ID of the user
   * @param {string} sort The property to order the results by
   * @param {string} order The direction in which to order
   * @param {number} limit The total number of rows to return
   * @param {number} skip The nuber of rows to skip
   * @returns {Promise<Record<string, any>[]>}  An array of Movie objects
   */
  // tag::all[]
  async all(userId, orderBy = 'title', order = 'ASC', limit = 6, skip = 0) {
    // Open a new session
    const session = this.driver.session()

    // Retrieve a list of movies favorited by the user
    const res = await session.readTransaction(tx => tx.run(`
      MATCH (u:User {userId: $userId})-[r:HAS_FAVORITE]->(m:Movie)
      RETURN m {
        .*,
        favorite: true
      } AS movie
      ORDER BY m.\`${orderBy}\` ${order}
      SKIP $skip
      LIMIT $limit
    `, { userId, skip: int(skip), limit: int(limit) }))

    // Close the session
    await session.close()

    return res.records.map(row => toNativeTypes(row.get('movie')))
  }
  // end::all[]

  /**
   * @public
   * This method should create a `:HAS_FAVORITE` relationship between
   * the User and Movie ID nodes provided.
   *
   * If either the user or movie cannot be found, a `NotFoundError` should be thrown.
   *
   * @param {string} userId The unique ID for the User node
   * @param {string} movieId The unique tmdbId for the Movie node
   * @returns {Promise<string, any>} The updated movie record with `favorite` set to true
   */
  // tag::add[]
  async add(userId, movieId) {
    // Open a new Session
    const session = this.driver.session()

    // tag::create[]
    // Create HAS_FAVORITE relationship within a Write Transaction
    const res = await session.writeTransaction(tx => tx.run(`
      MATCH (u:User {userId: $userId})
      MATCH (m:Movie {tmdbId: $movieId})

      MERGE (u)-[r:HAS_FAVORITE]->(m)
      ON CREATE SET u.createdAt = datetime()

      RETURN m {
        .*,
        favorite: true
      } AS movie
    `, { userId, movieId }))
    // end::create[]

    // tag::throw[]
    // Throw an error if the user or movie could not be found
    if ( res.records.length === 0 ) {
      throw new NotFoundError(`Couldn't create a favorite relationship for User ${userId} and Movie ${movieId}`)
    }
    // end::throw[]

    // Close the session
    await session.close()

    // tag::return[]
    // Return movie details and `favorite` property
    return toNativeTypes(res.records[0].get('movie'))
    // end::return[]
  }
  // end::add[]

  /**
   * @public
   * This method should remove the `:HAS_FAVORITE` relationship between
   * the User and Movie ID nodes provided.
   *
   * If either the user, movie or the relationship between them cannot be found,
   * a `NotFoundError` should be thrown.
   *
   * @param {string} userId The unique ID for the User node
   * @param {string} movieId The unique tmdbId for the Movie node
   * @returns {Promise<string, any>} The updated movie record with `favorite` set to true
   */
  // tag::remove[]
  async remove(userId, movieId) {
    // Open a new Session
    const session = this.driver.session()

    // Delete the HAS_FAVORITE relationship within a Write Transaction
    const res = await session.writeTransaction(tx => tx.run(`
      MATCH (u:User {userId: $userId})-[r:HAS_FAVORITE]->(m:Movie {tmdbId: $movieId})
      DELETE r

      RETURN m {
        .*,
        favorite: false
      } AS movie
    `, { userId, movieId }))

    // Throw an error if the user or movie could not be found
    if ( res.records.length === 0 ) {
      throw new NotFoundError(`Couldn't delete a favorite relationship for User ${userId} and Movie ${movieId}`)
    }

    // Close the session
    await session.close()

    // Return movie details and `favorite` property
    return toNativeTypes(res.records[0].get('movie'))
  }
  // end::remove[]
}
