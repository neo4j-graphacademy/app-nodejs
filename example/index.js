/**
 * Here we are importing the `neo4j` object from the `neo4j-driver` dependency
 */
// tag::import[]
// Import the neo4j dependency from neo4j-driver
import neo4j from 'neo4j-driver'
// end::import[]

/**
 * We may also need access to the session variable to set the default session mode
 * on the session object (session.READ or session.WRITE).
 * See #sessionWithArgs

// tag::importWithSession[]
import neo4j, { session } from 'neo4j-driver'
// end::importWithSession[]
*/

/**
 * Example Authentication token.
 *
 * You can use `neo4j.auth` to create a token.  A basic token accepts a
 * Username and Password
 */
const username = 'neo4j'
const password = 'letmein!'

// tag::auth[]
neo4j.auth.basic(username, password)
// end::auth[]

/*
 * Here is the pseudocode for creating the Driver:

// tag::pseudo[]
const driver = neo4j.driver(
  connectionString, // <1>
  authenticationToken, // <2>
  configuration // <3>
)
// end::pseudo[]

The first argument is the connection string, it is constructed like so:

// tag::connection[]
  address of server
          ↓
neo4j://localhost:7687
  ↑                ↑
scheme        port number
// end::connection[]
*/

/**
 * The following code creates an instance of the Neo4j Driver
 */
// tag::driver[]
// Create a new Driver instance
const driver = neo4j.driver('neo4j://localhost:7687',
  neo4j.auth.basic('neo4j', 'neo'))
// end::driver[]


/**
 * It is considered best practise to inject an instance of the driver.
 * This way the object can be mocked within unit tests
 */
class MyService {
  driver

  constructor(driver) {
    this.driver = driver
  }

  async method() {
    // tag::session[]
    // Open a new session
    const session = this.driver.session()
    // end::session[]

    // Do something with the session...

    // Close the session
    await session.close()
  }
}

/**
 * These functions are wrapped in an `async` function so that we can use the await
 * keyword rather than the Promise API.
 */
const main = async () => {
  // tag::verifyConnectivity[]
  // Verify the connection details
  await driver.verifyConnectivity()
  // end::verifyConnectivity[]

  console.log('Connection verified!')

  // tag::driver.session[]
  // Open a new session
  const session = driver.session()
  // end::driver.session[]

  // Run a query
  const query = 'MATCH (n) RETURN count(n) AS count'
  const params = {}

  // tag::session.run[]
  // Run a query in an auto-commit transaction
  const res = await session.run(query, params)
  // end::session.run[]

  console.log(res)

  // tag::session.close[]
  // Close the session
  await session.close()
  // end::session.close[]

}

const executeRead = async () => {
  const session = this.driver.session()

  // tag::session.executeRead[]
  // Run a query within a Read Transaction
  const res = await session.executeRead(tx => {
    return tx.run(
      `MATCH (p:Person)-[:ACTED_IN]->(m:Movie)
      WHERE m.title = $title // <1>
      RETURN p.name AS name
      LIMIT 10`,
      { title: 'Arthur' } // <2>
    )
  })
  // end::session.executeRead[]

  await session.close()
}

const executeWrite = async () => {
  const session = this.driver.session()

  // tag::session.executeWrite[]
  const res = await session.executeWrite(tx => {
    return tx.run(
      'CREATE (p:Person {name: $name})',
      { name: 'Michael' }
    )
  })
  // end::session.executeWrite[]

  await session.close()
}

const manualTransaction = async () => {
  // tag::session.beginTransaction[]
  // Open a new session
  const session = driver.session({
    defaultAccessMode: session.WRITE
  })

  // Manually create a transaction
  const tx = session.beginTransaction()
  // end::session.beginTransaction[]

  const query = 'MATCH (n) RETURN count(n) AS count'
  const params = {}

  // tag::session.beginTransaction.Try[]
  try {
    // Perform an action
    await tx.run(query, params)

    // Commit the transaction
    await tx.commit()
  }
  catch (e) {
    // If something went wrong, rollback the transaction
    await tx.rollback()
  }
  finally {
    // Finally, close the session
    await session.close()
  }
  // end::session.beginTransaction.Try[]

}

/**
 * This is an example function that will create a new Person node within
 * a read transaction and return the properties for the node.
 *
 * @param {string} name
 * @return {Record<string, any>}  The properties for the node
 */
// tag::createPerson[]
async function createPerson(name) {
  // tag::sessionWithArgs[]
  // Create a Session for the `people` database
  const session = driver.session({
    // Run sessions in WRITE mode by default
    defaultAccessMode: session.WRITE,
    // Run all queries against the `people` database
    database: 'people',
  })
  // end::sessionWithArgs[]

  // Create a node within a write transaction
  const res = await session.executeWrite(tx => {
    return tx.run('CREATE (p:Person {name: $name}) RETURN p', { name })
  })

  // Get the `p` value from the first record
  const p = res.records[0].get('p')

  // Close the sesssion
  await session.close()

  // Return the properties of the node
  return p.properties
}
// end::createPerson[]

// Run the main method above
main()
