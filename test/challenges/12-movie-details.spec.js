import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import MovieService from '../../src/services/movie.service'

describe('12. Movie Details', () => {
    const lockStock = '100'

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

    it('should get a movie by tmdbId', async () => {
        const driver = getDriver()
        const service = new MovieService(driver)

        const output = await service.findById(lockStock)

        expect(output.tmdbId).toEqual(lockStock)
        expect(output.title).toEqual('Lock, Stock & Two Smoking Barrels')
    })

    it('should get similar movies ordered by similarity score', async () => {
        const limit = 1

        const driver = getDriver()
        const service = new MovieService(driver)

        const output = await service.getSimilarMovies(lockStock, limit, 0)

        const paginated = await service.getSimilarMovies(lockStock, limit, 1)

        expect(output).toBeDefined()
        expect(output.length).toEqual(limit)

        expect(output).not.toEqual(paginated)


        console.log('\n\n')
        console.log('Here is the answer to the quiz question on the lesson:')
        console.log('What is the title of the most similar movie to Lock, Stock & Two Smoking Barrels?')
        console.log('Copy and paste the following answer into the text box: \n\n');

        console.log(output[0].title)
    })
})
