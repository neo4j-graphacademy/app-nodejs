// Task: Add a favorite property to the movie output
// Outcome: Goodfellas should have a favorite property set to true

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import FavoriteService from '../../src/services/favorite.service'
import MovieService from '../../src/services/movie.service'

describe('08. Favorites Flag', () => {
    const userId = 'fe770c6b-4034-4e07-8e40-2f39e7a6722c'
    const email = 'graphacademy.flag@neo4j.com'

    beforeAll(async () => {
        config()

        const {
            NEO4J_URI,
            NEO4J_USERNAME,
            NEO4J_PASSWORD,
        } = process.env

        const driver = await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)

        const session = await driver.session()
        await session.executeWrite(tx => tx.run(`
            MERGE (u:User {userId: $userId})
            SET u.email = $email
        `, { userId, email }))
    })

    afterAll(async () => {
        await closeDriver()
    })

    it('should return a positive favorite on `all` call', async () => {
        const driver = getDriver()
        const movieService = new MovieService(driver)
        const favoriteService = new FavoriteService(driver)

        // Get the most popular movie
        const [ first ] = await movieService.all('imdbRating', 'DESC', 1, 0, userId)

        // Add Movie to Favorites
        const add = await favoriteService.add(userId, first.tmdbId)

        expect(add.tmdbId).toEqual(first.tmdbId)
        expect(add.favorite).toEqual(true)

        // Check this has been added to the favorites
        const addCheck = await favoriteService.all(userId, 'imdbRating', 'ASC', 999, 0)

        const found = addCheck.find(movie => movie.tmdbId === first.tmdbId)
        expect(found).toBeDefined()


        // Check the flag MovieService has been correctly assigned
        const [ checkFirst, checkSecond ] = await movieService.all('imdbRating', 'DESC', 2, 0, userId)

        // First should be true
        expect(checkFirst.tmdbId).toEqual(add.tmdbId)
        expect(checkFirst.favorite).toEqual(true)

        // Second should be false
        expect(checkSecond.favorite).toEqual(false)
    })
})
