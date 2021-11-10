import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import PeopleService from '../../src/services/people.service'

describe('14. Person List', () => {
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

    it('should retrieve a paginated list people from the database', async () => {
        const limit = 10

        const driver = getDriver()
        const service = new PeopleService(driver)

        const output = await service.all(undefined, 'name', 'asc', limit)

        expect(output).toBeDefined()
        expect(output.length).toEqual(limit)


        const paginated = await service.all(undefined, 'name', 'asc', limit, limit)

        expect(paginated).toBeDefined()
        expect(paginated.length).toEqual(limit)

        expect(paginated).not.toEqual(output)
    })

    it('should apply a filter, ordering and pagination to the query', async () => {
        const q = 'A'

        const driver = getDriver()
        const service = new PeopleService(driver)

        const first = await service.all(q, 'name', 'asc', 1)
        const last = await service.all(q, 'name', 'desc', 1)

        expect(first).toBeDefined()
        expect(first.length).toEqual(1)
        expect(first).not.toEqual(last)
    })

    it('should apply a filter, ordering and pagination to the query', async () => {
        const driver = getDriver()
        const service = new PeopleService(driver)

        const first = await service.all(undefined, 'name', 'asc', 1)

        console.log('\n\n')
        console.log('Here is the answer to the quiz question on the lesson:')
        console.log('What is the name of the first person in the database in alphabetical order?')
        console.log('Copy and paste the following answer into the text box: \n\n');

        console.log(first[0].name)
    })
})
