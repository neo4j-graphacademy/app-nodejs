// TODO: Import the neo4j-driver dependency
// Import the neo4j dependency from neo4j-driver
import neo4j from 'neo4j-driver'

/**
 * A singleton instance of the Neo4j Driver to be used across the app
 *
 * @type {neo4j.Driver}
 */
// tag::driver[]
let driver
// end::driver[]


/**
 * Initiate the Neo4j Driver
 *
 * @param {string} uri   The neo4j URI, eg. `neo4j://localhost:7687`
 * @param {string} username   The username to connect to Neo4j with, eg `neo4j`
 * @param {string} password   The password for the user
 * @returns {Promise<neo4j.Driver>}
 */
// tag::initDriver[]
export async function initDriver(uri, username, password) {
  // TODO: Create an instance of the driver here
  driver = neo4j.driver(
    uri,
    neo4j.auth.basic(
      username,
      password
    )
  )

  await driver.verifyConnectivity()

  return driver
}
// end::initDriver[]

/**
 * Get the instance of the Neo4j Driver created in the
 * `initDriver` function
 *
 * @param {string} uri   The neo4j URI, eg. `neo4j://localhost:7687`
 * @param {string} username   The username to connect to Neo4j with, eg `neo4j`
 * @param {string} password   The password for the user
 * @returns {neo4j.Driver}
 */
// tag::getDriver[]
export function getDriver() {
  return driver
}
// end::getDriver[]

/**
 * If the driver has been instantiated, close it and all
 * remaining open sessions
 *
 * @returns {void}
 */
// tag::closeDriver[]
export async function closeDriver() {
  if (driver) {
    await driver.close()
  }
}
// end::closeDriver[]
