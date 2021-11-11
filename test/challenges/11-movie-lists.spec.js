import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import MovieService from '../../src/services/movie.service'

describe('11. Movie Lists', () => {
    const tomHanks = '31'
    const coppola = '1776'

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

    it('should return a paginated list of movies by Genre', async () => {
        const driver = getDriver()
        const service = new MovieService(driver)

        const genre = 'Comedy'
        const limit = 10

        const output = await service.getByGenre(genre, 'title', 'ASC', limit, 0)

        expect(output).toBeDefined()
        expect(output).toBeInstanceOf(Array)
        expect(output.length).toEqual(limit)

        const secondOutput = await service.getByGenre(genre, 'title', 'ASC', limit, limit)

        expect(secondOutput).toBeDefined()
        expect(secondOutput).toBeInstanceOf(Array)
        expect(secondOutput.length).toEqual(limit)

        expect(output[0].title).not.toEqual(secondOutput[0].title)

        const reordered = await service.getByGenre(genre, 'released', 'ASC', limit, limit)

        expect(output[0].title).not.toEqual(reordered[0].title)
    })

    it('should return a paginated list of movies by Actor', async () => {
        const driver = getDriver()
        const service = new MovieService(driver)

        const limit = 2

        const output = await service.getForActor(tomHanks, 'title', 'ASC', limit, 0)

        expect(output).toBeDefined()
        expect(output).toBeInstanceOf(Array)
        expect(output.length).toEqual(limit)

        const secondOutput = await service.getForActor(tomHanks, 'title', 'ASC', limit, limit)

        expect(secondOutput).toBeDefined()
        expect(secondOutput).toBeInstanceOf(Array)
        expect(secondOutput.length).toEqual(limit)

        expect(output[0].title).not.toEqual(secondOutput[0].title)

        const reordered = await service.getForActor(tomHanks, 'released', 'ASC', limit, 0)

        expect(output[0].title).not.toEqual(reordered[0].title)
    })

    it('should return a paginated list of movies by Director', async () => {
        const driver = getDriver()
        const service = new MovieService(driver)

        const limit = 1

        const output = await service.getForDirector(tomHanks, 'title', 'ASC', limit, 0)

        expect(output).toBeDefined()
        expect(output).toBeInstanceOf(Array)
        expect(output.length).toEqual(limit)

        const secondOutput = await service.getForDirector(tomHanks, 'title', 'ASC', limit, limit)

        expect(secondOutput).toBeDefined()
        expect(secondOutput).toBeInstanceOf(Array)
        expect(secondOutput.length).toEqual(limit)

        expect(output[0].title).not.toEqual(secondOutput[0].title)

        const reordered = await service.getForDirector(tomHanks, 'title', 'DESC', limit, 0)

        expect(output[0].title).not.toEqual(reordered[0].title)
    })

    it('should find films directed by Francis Ford Coppola', async () => {
        const driver = getDriver()
        const service = new MovieService(driver)

        const output = await service.getForDirector(coppola, 'imdbRating', 'DESC', 30)

        expect(output.length).toEqual(16)

        console.clear()

        console.log('\n\n')
        console.log('Here is the answer to the quiz question on the lesson:')
        console.log('How many films has Francis Ford Coppola directed?')
        console.log('Copy and paste the following answer into the text box: \n\n');

        console.log(output.length);
    })
})
