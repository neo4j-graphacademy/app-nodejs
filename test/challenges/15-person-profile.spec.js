import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import PeopleService from '../../src/services/people.service'

describe('15. Person Profile', () => {
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

    it('should find a person by their ID', async () => {
        const driver = getDriver()
        const service = new PeopleService(driver)

        const output = await service.findById(coppola)

        expect(output).toBeDefined()
        expect(output.tmdbId).toEqual(coppola)
        expect(output.name).toEqual('Francis Ford Coppola')
        expect(output.directedCount).toEqual(16)
        expect(output.actedCount).toEqual(2)
    })

    it('should return a paginated list of similar people to a person by their ID', async () => {
        const driver = getDriver()
        const service = new PeopleService(driver)

        const limit = 2

        const output = await service.getSimilarPeople(coppola, limit)

        expect(output).toBeDefined()
        expect(output.length).toEqual(limit)

        const second = await service.getSimilarPeople(coppola, limit, limit)

        expect(second).toBeDefined()
        expect(second.length).toEqual(limit)
        expect(second).not.toEqual(output)

        console.log('\n\n')
        console.log('Here is the answer to the quiz question on the lesson:')
        console.log('According to our algorithm, who is the most similar person to Francis Ford Coppola?')
        console.log('Copy and paste the following answer into the text box: \n\n');

        console.log(output[0].name)
    })
})
