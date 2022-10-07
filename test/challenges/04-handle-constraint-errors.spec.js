// Task: Implement the code to catch a constraint error from Neo4j.
// Outcome: A custom error is thrown when someone tries to register with an email that already exists

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import AuthService from '../../src/services/auth.service'

describe('04. Handling Driver Errors', () => {
    let email, password, name

    beforeAll(async () => {
        config()

        const {
            NEO4J_URI,
            NEO4J_USERNAME,
            NEO4J_PASSWORD,
        } = process.env

        await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)

        email = `${Math.random()}@neo4j.com`
        password = Math.random().toString()
        name = 'Graph Academy'
    })
    afterAll(async () => {
        const driver = getDriver()
        const session = driver.session()

        await session.executeWrite(tx =>
            tx.run(`MATCH (u:User {email: $email}) DETACH DELETE u`, {email})
        )

        await closeDriver()
    })

    /*
     * If this error fails, try running the following query in your Sandbox to create the unique constraint
     *   CREATE CONSTRAINT UserEmailUnique ON ( user:User ) ASSERT (user.email) IS UNIQUE
     */
    it('should find a unique constraint', async () => {
        const driver = getDriver()
        const session = driver.session()
        const res = await session.executeRead(tx => tx.run(
            `CALL db.constraints()
            YIELD name, description
            WHERE description = 'CONSTRAINT ON ( user:User ) ASSERT (user.email) IS UNIQUE'
            RETURN *`
        ))

        expect(res.records).toBeDefined()
        expect(res.records.length).toEqual(1)
    })

    it('should throw a ValidationError when email already exists in database', async () => {
        const driver = getDriver()
        const service = new AuthService(driver)

        const output = await service.register(email, password, name)

        expect(output.email).toEqual(email)
        expect(output.name).toEqual(name)
        expect(output.password).toBeUndefined()
        expect(output.token).toBeDefined()

        try {
            // Retry with same credentials
            await service.register(email, password, name)

            expect(false).toEqual(true, 'Retry should fail')
        }
        catch(e) {
            expect(e.message).toMatch(/account already exists/)
        }
    })
})