// Task: Rewrite the RatingService to create a relationship between a User and a Movie
// Outcome: The user below will rate Goodfellas as 5*

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import RatingService from '../../src/services/rating.service'

describe('06. Rating Movies', () => {
    const movieId = '769'
    const userId = '1185150b-9e81-46a2-a1d3-eb649544b9c4'
    const email = 'graphacademy.reviewer@neo4j.com'
    const rating = 5

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

    it('should store the rating as an integer', async () => {
        const driver = getDriver()
        const service = new RatingService(driver)

        const output = await service.add(userId, movieId, rating)

        expect(output.tmdbId).toEqual(movieId)
        expect(output.rating).toEqual(rating)
    })

})