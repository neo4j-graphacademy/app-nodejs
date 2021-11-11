import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import GenreService from '../../src/services/genre.service'

describe('09. Browsing Genres', () => {
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

    it('should retrieve a list of genres', async () => {
        const driver = getDriver()
        const service = new GenreService(driver)

        const output = await service.all()

        expect(output).toBeDefined()
        expect(output.length).toEqual(19)
        expect(output[0].name).toEqual('Action')
        expect(output[18].name).toEqual('Western')

        output.sort((a, b) => a.movies > b.movies ? -1 : 1)

        console.log('\n\n')
        console.log('Here is the answer to the quiz question on the lesson:')
        console.log('Which genre has the highest movie count?')
        console.log('Copy and paste the following answer into the text box: \n\n');

        console.log(output[0].name)
    })
})
