// Task: Add a favorite property to the movie output to
// Outcome: Goodfellas should have a favorite property set to trye

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import FavoriteService from '../../src/services/favorite.service'
import MovieService from '../../src/services/movie.service'

describe('08. Favorites Flag', () => {
    const toyStory = '862'
    const freeWilly = '1634'
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
        await session.writeTransaction(tx => tx.run(`
            MERGE (u:User {userId: $userId})
            SET u.email = $email
        `, { userId, email }))
    })

    afterAll(async () => {
        await closeDriver()
    })

    it('should return a positive favorite flag in call to `findById`', async () => {
        const driver = getDriver()
        const service = new FavoriteService(driver)

        // Add Movie
        const add = await service.add(userId, freeWilly)

        expect(add.tmdbId).toEqual(freeWilly)
        expect(add.favorite).toEqual(true)

        // Add Check
        const addCheck = await service.all(userId)

        const found = addCheck.find(movie => movie.tmdbId === freeWilly)
        expect(found).toBeDefined()

        // Check individual movie
        const movieService = new MovieService(driver)

        const freeWillyOutput = await movieService.findById(freeWilly, userId)
        expect(freeWillyOutput.favorite).toEqual(true)

        const toyStoryOutput = await movieService.findById(toyStory, userId)
        expect(toyStoryOutput.favorite).toEqual(false)
    })
})
