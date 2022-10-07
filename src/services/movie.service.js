import { goodfellas, popular } from '../../test/fixtures/movies.js'
import { roles } from '../../test/fixtures/people.js'
import { toNativeTypes } from '../utils.js'
import NotFoundError from '../errors/not-found.error.js'
import { int } from 'neo4j-driver'

// TODO: Import the `int` function from neo4j-driver

export default class MovieService {
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
   * This method should return a paginated list of movies ordered by the `sort`
   * parameter and limited to the number passed as `limit`.  The `skip` variable should be
   * used to skip a certain number of rows.
   *
   * If a userId value is suppled, a `favorite` boolean property should be returned to
   * signify whether the user has aded the movie to their "My Favorites" list.
   *
   * @param {string} sort
   * @param {string} order
   * @param {number} limit
   * @param {number} skip
   * @param {string | undefined} userId
   * @returns {Promise<Record<string, any>[]>}
   */
  // tag::all[]
  async all(sort = 'title', order = 'ASC', limit = 6, skip = 0, userId = undefined) {
    // TODO: Open an Session
    // TODO: Execute a query in a new Read Transaction
    // TODO: Get a list of Movies from the Result
    // TODO: Close the session

    return popular
  }
  // end::all[]

  /**
   * @public
   * This method should return a paginated list of movies that have a relationship to the
   * supplied Genre.
   *
   * Results should be ordered by the `sort` parameter, and in the direction specified
   * in the `order` parameter.
   * Results should be limited to the number passed as `limit`.
   * The `skip` variable should be used to skip a certain number of rows.
   *
   * If a userId value is suppled, a `favorite` boolean property should be returned to
   * signify whether the user has aded the movie to their "My Favorites" list.
   *
   * @param {string} name
   * @param {string} sort
   * @param {string} order
   * @param {number} limit
   * @param {number} skip
   * @param {string | undefined} userId
   * @returns {Promise<Record<string, any>[]>}
   */
  // tag::getByGenre[]
  async getByGenre(name, sort = 'title', order = 'ASC', limit = 6, skip = 0, userId = undefined) {
    // TODO: Get Movies in a Genre
    // MATCH (m:Movie)-[:IN_GENRE]->(:Genre {name: $name})

    return popular.slice(skip, skip + limit)
  }
  // end::getByGenre[]

  /**
   * @public
   * This method should return a paginated list of movies that have an ACTED_IN relationship
   * to a Person with the id supplied
   *
   * Results should be ordered by the `sort` parameter, and in the direction specified
   * in the `order` parameter.
   * Results should be limited to the number passed as `limit`.
   * The `skip` variable should be used to skip a certain number of rows.
   *
   * If a userId value is suppled, a `favorite` boolean property should be returned to
   * signify whether the user has aded the movie to their "My Favorites" list.
   *
   * @param {string} id
   * @param {string} sort
   * @param {string} order
   * @param {number} limit
   * @param {number} skip
   * @param {string | undefined} userId
   * @returns {Promise<Record<string, any>[]>}
   */
  // tag::getForActor[]
  async getForActor(id, sort = 'title', order = 'ASC', limit = 6, skip = 0, userId = undefined) {
    // TODO: Get Movies acted in by a Person
    // MATCH (:Person {tmdbId: $id})-[:ACTED_IN]->(m:Movie)

    return roles.slice(skip, skip + limit)
  }
  // end::getForActor[]

  /**
   * @public
   * This method should return a paginated list of movies that have an DIRECTED relationship
   * to a Person with the id supplied
   *
   * Results should be ordered by the `sort` parameter, and in the direction specified
   * in the `order` parameter.
   * Results should be limited to the number passed as `limit`.
   * The `skip` variable should be used to skip a certain number of rows.
   *
   * If a userId value is suppled, a `favorite` boolean property should be returned to
   * signify whether the user has aded the movie to their "My Favorites" list.
   *
   * @param {string} id
   * @param {string} sort
   * @param {string} order
   * @param {number} limit
   * @param {number} skip
   * @param {string | undefined} userId
   * @returns {Promise<Record<string, any>[]>}
   */
  // tag::getForDirector[]
  async getForDirector(id, sort = 'title', order = 'ASC', limit = 6, skip = 0, userId = undefined) {
    // TODO: Get Movies directed by a Person
    // MATCH (:Person {tmdbId: $id})-[:DIRECTED]->(m:Movie)

    return popular.slice(skip, skip + limit)
  }
  // end::getForDirector[]

  /**
   * @public
   * This method find a Movie node with the ID passed as the `id` parameter.
   * Along with the returned payload, a list of actors, directors, and genres should
   * be included.
   * The number of incoming RATED relationships should also be returned as `ratingCount`
   *
   * If a userId value is suppled, a `favorite` boolean property should be returned to
   * signify whether the user has aded the movie to their "My Favorites" list.
   *
   * @param {string} id
   * @returns {Promise<Record<string, any>>}
   */
  // tag::findById[]
  async findById(id, userId = undefined) {
    // TODO: Find a movie by its ID
    // MATCH (m:Movie {tmdbId: $id})

    return goodfellas
  }
  // end::findById[]

  /**
   * @public
   * This method should return a paginated list of similar movies to the Movie with the
   * id supplied.  This similarity is calculated by finding movies that have many first
   * degree connections in common: Actors, Directors and Genres.
   *
   * Results should be ordered by the `sort` parameter, and in the direction specified
   * in the `order` parameter.
   * Results should be limited to the number passed as `limit`.
   * The `skip` variable should be used to skip a certain number of rows.
   *
   * If a userId value is suppled, a `favorite` boolean property should be returned to
   * signify whether the user has aded the movie to their "My Favorites" list.
   *
   * @param {string} id
   * @param {number} limit
   * @param {number} skip
   * @param {string | undefined} userId
   * @returns {Promise<Record<string, any>[]>}
   */
  // tag::getSimilarMovies[]
  async getSimilarMovies(id, limit = 6, skip = 0, userId = undefined) {
    // TODO: Get similar movies based on genres or ratings

    return popular.slice(skip, skip + limit)
      .map(item => ({
        ...item,
        score: (Math.random() * 100).toFixed(2)
      }))
  }
  // end::getSimilarMovies[]

  /**
   * @private
   * This function should return a list of tmdbId properties for the movies that
   * the user has added to their 'My Favorites' list.
   *
   * @param {neo4j.Transaction} tx   The open transaction
   * @param {string} userId          The ID of the current user
   * @returns {Promise<string[]>}
   */
  // tag::getUserFavorites[]
  async getUserFavorites(tx, userId) {
    return []
  }
  // end::getUserFavorites[]

}
