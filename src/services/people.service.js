import NotFoundError from '../errors/not-found.error.js'
import { pacino, people } from '../../test/fixtures/people.js'
import { toNativeTypes } from '../utils.js'

// TODO: Import the `int` function from neo4j-driver

export default class PeopleService {
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
   * This method should return a paginated list of People (actors or directors),
   * with an optional filter on the person's name based on the `q` parameter.
   *
   * Results should be ordered by the `sort` parameter and limited to the
   * number passed as `limit`.  The `skip` variable should be used to skip a
   * certain number of rows.
   *
   * @param {string|undefined} q    Used to filter on the person's name
   * @param {string} sort        Field in which to order the records
   * @param {string} order          Direction for the order (ASC/DESC)
   * @param {number} limit          The total number of records to return
   * @param {number} skip           The number of records to skip
   * @returns {Promise<Record<string, any>[]>}
   */
  // tag::all[]
  async all(q, sort = 'name', order = 'ASC', limit = 6, skip = 0) {
    // TODO: Get a list of people from the database

    return people.slice(skip, skip + limit)
  }
  // end::all[]

  /**
   * @public
   * Find a user by their ID.
   *
   * If no user is found, a NotFoundError should be thrown.
   *
   * @param {string} id   The tmdbId for the user
   * @returns {Promise<Record<string, any>>}
   */
  // tag::findById[]
  async findById(id) {
    // TODO: Find a user by their ID

    return pacino
  }
  // end::findById[]

  /**
   * @public
   * Get a list of similar people to a Person, ordered by their similarity score
   * in descending order.
   *
   * @param {string} id     The ID of the user
   * @param {number} limit  The total number of records to return
   * @param {number} skip   The number of records to skip
   * @returns {Promise<Record<string, any>[]>}
   */
  // tag::getSimilarPeople[]
  async getSimilarPeople(id, limit = 6, skip = 0) {
    // TODO: Get a list of similar people to the person by their id

    return people.slice(skip, skip + limit)
  }
  // end::getSimilarPeople[]

}
