// Task: Rewrite the FavoriteService to sae
// Outcome: Toy Story and Goodfellas will be added to the user's favorite movies.  Goodfellas will also be removed.

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import FavoriteService from '../../src/services/favorite.service'

describe('07. My Favorites List', () => {
    const toyStory = '862'
    const goodfellas = '769'
    const userId = '9f965bf6-7e32-4afb-893f-756f502b2c2a'
    const email = 'graphacademy.favorite@neo4j.com'

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

    it('should throw a NotFoundError if the user or movie do not exist', async () => {
        const driver = getDriver()
        const service = new FavoriteService(driver)

        try {
            await service.add('unknown', 'x999')

            expect(false).toEqual(true)
        }
        catch (e) {
            expect(true).toEqual(true)
        }
    })

    it('should save a movie to the users favorites', async () => {
        const driver = getDriver()
        const service = new FavoriteService(driver)

        const output = await service.add(userId, toyStory)

        expect(output.tmdbId).toEqual(toyStory)
        expect(output.favorite).toEqual(true)

        const all = await service.all(userId)

        const found = all.find(movie => movie.tmdbId === toyStory)

        expect(found).toBeDefined()
    })

    it('should add and remove a movie from the list', async () => {
        const driver = getDriver()
        const service = new FavoriteService(driver)

        // Add Movie
        const add = await service.add(userId, goodfellas)

        expect(add.tmdbId).toEqual(goodfellas)
        expect(add.favorite).toEqual(true)

        // Add Check
        const addCheck = await service.all(userId)

        const found = addCheck.find(movie => movie.tmdbId === goodfellas)
        expect(found).toBeDefined()

        // Remove
        const remove = await service.remove(userId, goodfellas)

        expect(remove.tmdbId).toEqual(goodfellas)
        expect(remove.favorite).toEqual(false)

        // RemoveCheck
        const removeCheck = await service.all(userId)

        const missing = removeCheck.find(movie => movie.tmdbId === goodfellas)
        expect(missing).toBeUndefined()
    })

})
