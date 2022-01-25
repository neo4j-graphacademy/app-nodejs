import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import GenreService from '../../src/services/genre.service'

describe('10. Finding Genre Details', () => {
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

    it('should retrieve genre details by name', async () => {
        const driver = getDriver()
        const service = new GenreService(driver)

        const name = 'Action'

        const output = await service.find(name)

        expect(output).toBeDefined()
        expect(output.name).toEqual(name)

        console.log('\n\n')
        console.log('Here is the answer to the quiz question on the lesson:')
        console.log('How many movies are in the Action genre?')
        console.log('Copy and paste the following answer into the text box: \n\n');

        console.log(output.movies)
    })
})
