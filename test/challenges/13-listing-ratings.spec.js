import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import RatingService from '../../src/services/rating.service'

describe('13. Listing Ratings', () => {
    const pulpFiction = '680'

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

    it('should retrieve a list of ratings from the database', async () => {
        const limit = 10

        const driver = getDriver()
        const service = new RatingService(driver)

        const output = await service.forMovie(pulpFiction, 'timestamp', 'desc', limit)

        expect(output).toBeDefined()
        expect(output.length).toEqual(limit)


        const paginated = await service.forMovie(pulpFiction, 'timestamp', 'desc', limit, limit)

        expect(paginated).toBeDefined()
        expect(paginated.length).toEqual(limit)

        expect(paginated).not.toEqual(output)
    })

    it('should apply an ordering and pagination to the query', async () => {
        const driver = getDriver()
        const service = new RatingService(driver)

        const first = await service.forMovie(pulpFiction, 'timestamp', 'asc', 1)
        const latest = await service.forMovie(pulpFiction, 'timestamp', 'desc', 1)

        expect(first).not.toEqual(latest)


        console.log('\n\n')
        console.log('Here is the answer to the quiz question on the lesson:')
        console.log('What is the name of the first person to rate the movie Pulp Fiction?')
        console.log('Copy and paste the following answer into the text box: \n\n');

        console.log(first[0].user.name)
    })
})
