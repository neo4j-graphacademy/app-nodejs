// Task: Rewrite the AuthService to allow users to authenticate against the database
// Outcome: A user will be able to authenticate against their database record

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j'
import AuthService from '../../src/services/auth.service'

describe('05. Authenticating a User', () => {
    const email = 'authenticated@neo4j.com'
    const password = 'AuthenticateM3!'
    const name = 'Authenticated User'

    beforeAll(async () => {
        config()

        const {
            NEO4J_URI,
            NEO4J_USERNAME,
            NEO4J_PASSWORD,
        } = process.env

        const driver = await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)

        const session = await driver.session()
        await session.executeWrite(tx => tx.run(`
            MATCH (u:User {email: $email}) DETACH DELETE u
        `, { email }))
    })

    afterAll(async () => {
        await closeDriver()
    })

    it('should authenticate a recently created user', async () => {
        const driver = getDriver()
        const service = new AuthService(driver)

        await service.register(email, password, name)

        const output = await service.authenticate(email, password)

        expect(output.email).toEqual(email)
        expect(output.name).toEqual(name)
        expect(output.password).toBeUndefined()
        expect(output.token).toBeDefined()
    })

    it('should return false on incorrect password', async () => {
        const driver = getDriver()
        const service = new AuthService(driver)

        const incorrectPassword = await service.authenticate(email, 'unknown')
        expect(incorrectPassword).toEqual(false)
    })

    it('should return false on incorrect username', async () => {
        const driver = getDriver()
        const service = new AuthService(driver)

        const incorrectUsername = await service.authenticate('unknown', 'unknown')
        expect(incorrectUsername).toEqual(false)
    })

    it('GA: set a timestamp to verify that the tests have passed', async () => {
        const driver = getDriver()

        const session = await driver.session()
        await session.executeWrite(tx => tx.run(`
            MATCH (u:User {email: $email})
            SET u.authenticatedAt = datetime()
        `, { email }))
        await session.close()
    })
})