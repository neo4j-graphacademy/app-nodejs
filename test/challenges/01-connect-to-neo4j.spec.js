// Task: Learn how to initiate the driver and verify connectivity
// Outcome: verifyConnectivity on the driver exported from /src/neo4j.js should return true

import { config } from 'dotenv'
import { closeDriver, getDriver, initDriver } from '../../src/neo4j.js'

describe('01. Initiate Driver', () => {
    beforeAll(() => config())
    afterAll(() => closeDriver())

    it('Should create a driver instance and connect to server', async () => {
        const {
            NEO4J_URI,
            NEO4J_USERNAME,
            NEO4J_PASSWORD,
        } = process.env

        expect(NEO4J_URI).toBeDefined()
        expect(NEO4J_USERNAME).toBeDefined()
        expect(NEO4J_PASSWORD).toBeDefined()

        await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)
    })

    it('Driver has been instantiated', () => {
        const driver = getDriver()
        expect(driver).toBeDefined()

        expect(driver.constructor.name).toEqual('Driver')
    })

    it('Driver can verify connectivity', () => {
        const driver = getDriver()
        expect(driver).toBeDefined()
        expect(driver.constructor.name).toEqual('Driver')

        driver.verifyConnectivity()
            .then(() => {
                expect(true).toEqual(true)
            })
            .catch(e => {
                expect(e).toBeUndefined('Unable to verify connectivity')
            })
    })
})