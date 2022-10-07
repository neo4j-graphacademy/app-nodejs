// Task: Rewrite the AuthService to save a user to the Neo4j database
// Outcome: A User with a random email addess should have been added to the database

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import AuthService from '../../src/services/auth.service'

describe('03. Registering a User', () => {
    const email = 'graphacademy@neo4j.com'
    const password = 'letmein'
    const name = 'Graph Academy'

    beforeAll(async () => {
        config()

        const {
            NEO4J_URI,
            NEO4J_USERNAME,
            NEO4J_PASSWORD,
        } = process.env

        const driver = await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)

        const session = driver.session()
        await session.executeWrite(tx =>
            tx.run(`MATCH (u:User {email: $email}) DETACH DELETE u`, {email})
        )
        await session.close()
    })

    afterAll(async () => {
        await closeDriver()
    })

    it('should register a user', async () => {
        const driver = getDriver()
        const service = new AuthService(driver)

        const output = await service.register(email, password, name)

        expect(output.email).toEqual(email)
        expect(output.name).toEqual(name)
        expect(output.password).toBeUndefined()

        expect(output.token).toBeDefined()

        // Expect user exists in database
        const session = await driver.session()

        const res = await session.executeRead(tx =>
            tx.run('MATCH (u:User {email: $email}) RETURN u', { email })
        )

        expect(res.records.length).toEqual(1)

        const user = res.records[0].get('u')

        expect(user.properties.email).toEqual(email)
        expect(user.properties.name).toEqual(name)
        expect(user.properties.password).toBeDefined()
        expect(user.properties.password).not.toEqual(password, 'Password should be hashed')
    })
})