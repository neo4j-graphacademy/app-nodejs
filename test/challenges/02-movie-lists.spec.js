// Task: Implement the code to retrieve movies from the database
// Outcome: A list of movies will be pulled from the database

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import MovieService from '../../src/services/movie.service'

describe('02. Movie Lists', () => {
    beforeAll(async () => {
        config()

        const {
            NEO4J_URI,
            NEO4J_USERNAME,
            NEO4J_PASSWORD,
        } = process.env

        await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)
    })

    afterAll(async () => {
        await closeDriver()
    })

    it('should apply order, skip and limit', async () => {
        const driver = getDriver()
        const service = new MovieService(driver)

        const limit = 1

        const output = await service.all('title', 'ASC', limit)

        expect(output).toBeDefined()
        expect(output.length).toEqual(limit)

        const next = await service.all('title', 'ASC', limit, 1)

        expect(next).toBeDefined()
        expect(next.length).toEqual(limit)
        expect(next[0].title).not.toEqual(output[0].title)

    })

    it('should order movies by rating', async () => {
        const driver = getDriver()
        const service = new MovieService(driver)

        const output = await service.all('imdbRating', 'DESC', 1)

        expect(output).toBeDefined()
        expect(output.length).toEqual(1)

        console.log('\n\n')
        console.log('Here is the answer to the quiz question on the lesson:')
        console.log('What is the title of the highest rated movie in the recommendations dataset?')
        console.log('Copy and paste the following answer into the text box: \n\n');

        console.log(output[0].title)
    })
})