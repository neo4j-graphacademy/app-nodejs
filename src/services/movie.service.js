import { goodfellas, popular } from '../../test/fixtures/movies.js'
import { roles } from '../../test/fixtures/people.js'
import { toNativeTypes } from '../utils.js'
import NotFoundError from '../errors/not-found.error.js'

// TODO: Import the `int` function from neo4j-driver
import { int } from 'neo4j-driver'

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
    // Open an Session
    const session = this.driver.session()

    // tag::allcypher[]
    // Execute a query in a new Read Transaction
    const res = await session.executeRead(
      async tx => {
        const favorites = await this.getUserFavorites(tx, userId)

        return tx.run(
          `
            MATCH (m:Movie)
            WHERE m.\`${sort}\` IS NOT NULL
            RETURN m {
              .*,
              favorite: m.tmdbId IN $favorites
            } AS movie
            ORDER BY m.\`${sort}\` ${order}
            SKIP $skip
            LIMIT $limit
          `, { skip: int(skip), limit: int(limit), favorites })
      }
    )
    // end::allcypher[]

    // tag::allmovies[]
    // Get a list of Movies from the Result
    const movies = res.records.map(
      row => toNativeTypes(row.get('movie'))
    )
    // end::allmovies[]

    // Close the session
    await session.close()

    // tag::return[]
    return movies
    // end::return[]
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
    // Get Movies in a Genre
    // MATCH (m:Movie)-[:IN_GENRE]->(:Genre {name: $name})

    // Open a new session
    const session = this.driver.session()

    // Execute a query in a new Read Transaction
    const res = await session.executeRead(async tx => {
      // Get an array of IDs for the User's favorite movies
      const favorites = await this.getUserFavorites(tx, userId)

      // Retrieve a list of movies with the
      // favorite flag appened to the movie's properties
      return tx.run(`
        MATCH (m:Movie)-[:IN_GENRE]->(:Genre {name: $name})
        WHERE m.\`${sort}\` IS NOT NULL
        RETURN m {
          .*,
          favorite: m.tmdbId IN $favorites
        } AS movie
        ORDER BY m.\`${sort}\` ${order}
        SKIP $skip
        LIMIT $limit
      `, { skip: int(skip), limit: int(limit), favorites, name })
    })

    // Get a list of Movies from the Result
    const movies = res.records.map(row => toNativeTypes(row.get('movie')))

    // Close the session
    await session.close()

    return movies
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
    // Get Movies acted in by a Person
    // MATCH (:Person {tmdbId: $id})-[:ACTED_IN]->(m:Movie)

    // Open a new session
    const session = this.driver.session()

    // Execute a query in a new Read Transaction
    const res = await session.executeRead(async tx => {
      // Get an array of IDs for the User's favorite movies
      const favorites = await this.getUserFavorites(tx, userId)

      // Retrieve a list of movies with the
      // favorite flag appened to the movie's properties
      return tx.run(`
        MATCH (:Person {tmdbId: $id})-[:ACTED_IN]->(m:Movie)
        WHERE m.\`${sort}\` IS NOT NULL
        RETURN m {
          .*,
          favorite: m.tmdbId IN $favorites
        } AS movie
        ORDER BY m.\`${sort}\` ${order}
        SKIP $skip
        LIMIT $limit
      `, { skip: int(skip), limit: int(limit), favorites, id })
    })

    // Get a list of Movies from the Result
    const movies = res.records.map(row => toNativeTypes(row.get('movie')))

    // Close the session
    await session.close()

    return movies
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
    // Get Movies directed by a Person
    // MATCH (:Person {tmdbId: $id})-[:DIRECTED]->(m:Movie)

    // Open a new session
    const session = this.driver.session()

    // Execute a query in a new Read Transaction
    const res = await session.executeRead(async tx => {
      // Get an array of IDs for the User's favorite movies
      const favorites = await this.getUserFavorites(tx, userId)

      // Retrieve a list of movies with the
      // favorite flag appened to the movie's properties
      return tx.run(`
        MATCH (:Person {tmdbId: $id})-[:DIRECTED]->(m:Movie)
        WHERE m.\`${sort}\` IS NOT NULL
        RETURN m {
          .*,
          favorite: m.tmdbId IN $favorites
        } AS movie
        ORDER BY m.\`${sort}\` ${order}
        SKIP $skip
        LIMIT $limit
      `, { skip: int(skip), limit: int(limit), favorites, id })
    })

    // Get a list of Movies from the Result
    const movies = res.records.map(row => toNativeTypes(row.get('movie')))

    // Close the session
    await session.close()

    return movies
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
    // Find a movie by its ID
    // MATCH (m:Movie {tmdbId: $id})

    // Open a new database session
    const session = this.driver.session()

    // Find a movie by its ID
    const res = await session.executeRead(async tx => {
      const favorites = await this.getUserFavorites(tx, userId)

      return tx.run(`
        MATCH (m:Movie {tmdbId: $id})
        RETURN m {
          .*,
          actors: [ (a)-[r:ACTED_IN]->(m) | a { .*, role: r.role } ],
          directors: [ (d)-[:DIRECTED]->(m) | d { .* } ],
          genres: [ (m)-[:IN_GENRE]->(g) | g { .name }],
          ratingCount: count{ (m)<-[:RATED]-() },
          favorite: m.tmdbId IN $favorites
        } AS movie
        LIMIT 1
      `, { id, favorites })
    })

    // Close the session
    await session.close()

    // Throw a 404 if the Movie cannot be found
    if (res.records.length === 0) {
      throw new NotFoundError(`Could not find a Movie with tmdbId ${id}`)
    }

    const [first] = res.records

    return toNativeTypes(first.get('movie'))
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
    // Get similar movies based on genres or ratings
    // MATCH (:Movie {tmdbId: $id})-[:IN_GENRE|ACTED_IN|DIRECTED]->()<-[:IN_GENRE|ACTED_IN|DIRECTED]-(m)

    // Open an Session
    const session = this.driver.session()

    // Get similar movies based on genres or ratings
    const res = await session.executeRead(async tx => {
      const favorites = await this.getUserFavorites(tx, userId)

      return tx.run(`
        MATCH (:Movie {tmdbId: $id})-[:IN_GENRE|ACTED_IN|DIRECTED]->()<-[:IN_GENRE|ACTED_IN|DIRECTED]-(m)
        WHERE m.imdbRating IS NOT NULL
        WITH m, count(*) AS inCommon
        WITH m, inCommon, m.imdbRating * inCommon AS score
        ORDER BY score DESC
        SKIP $skip
        LIMIT $limit
        RETURN m {
          .*,
          score: score,
          favorite: m.tmdbId IN $favorites
        } AS movie
      `, { id, skip: int(skip), limit: int(limit), favorites })
    })

    // Get a list of Movies from the Result
    const movies = res.records.map(row => toNativeTypes(row.get('movie')))

    // Close the session
    await session.close()

    return movies
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
    // If userId is not defined, return an empty array
    if ( userId === undefined ) {
      return []
    }

    const favoriteResult = await tx.run(
      `
        MATCH (:User {userId: $userId})-[:HAS_FAVORITE]->(m)
        RETURN m.tmdbId AS id
      `,
      { userId, }
    )

    // Extract the `id` value returned by the cypher query
    return favoriteResult.records.map(
      row => row.get('id')
    )
  }
  // end::getUserFavorites[]

}
