import { genres } from '../../test/fixtures/genres.js'
import NotFoundError from '../errors/not-found.error.js'
import { toNativeTypes } from '../utils.js'

export default class GenreService {
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
   * This method should return a list of genres from the database with a
   * `name` property, `movies` which is the count of the incoming `IN_GENRE`
   * relationships and a `poster` property to be used as a background.
   *
   * [
   *   {
   *    name: 'Action',
   *    movies: 1545,
   *    poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
   *   }, ...
   *
   * ]
   *
   * @returns {Promise<Record<string, any>[]>}
   */
  // tag::all[]
  async all() {
    // TODO: Open a new session
    // TODO: Get a list of Genres from the database
    // TODO: Close the session

    return genres
  }
  // end::all[]

  /**
   * @public
   * This method should find a Genre node by its name and return a set of properties
   * along with a `poster` image and `movies` count.
   *
   * If the genre is not found, a NotFoundError should be thrown.
   *
   * @param {string} name                     The name of the genre
   * @returns {Promise<Record<string, any>>}  The genre information
   */
  // tag::find[]
  async find(name) {
    // TODO: Open a new session
    // TODO: Get Genre information from the database
    // TODO: Throw a 404 Error if the genre is not found
    // TODO: Close the session

    return genres.find(genre => genre.name === name)
  }
  // end::find[]

}
