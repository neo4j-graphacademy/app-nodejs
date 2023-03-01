import neo4j, { int, isInt, DateTime, isDateTime, isDate } from 'neo4j-driver'
import { config } from 'dotenv'

// Load config from .env
config()

// Load Driver
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))


const main = async () => {
  // Verify Connectivity
  await driver.verifyConnectivity()

  const session = driver.session()

  // tag::run[]
  // Execute a query within a read transaction
  const res = await session.executeRead(tx => tx.run(`
    MATCH path = (person:Person)-[actedIn:ACTED_IN]->(movie:Movie)
    RETURN path, person, actedIn, movie
    LIMIT 1
  `))
  // end::run[]

  // tag::row[]
  // Get the first row
  const row = res.records[0]
  // end::row[]

  // Get a node
  // tag::get[]
  const movie = row.get('movie')
  // end::get[]

  // Working with node objects
  // tag::node[]
  person.elementId // (1)
  person.labels // (2)
  person.properties // (3)
  // end::node[]


  // Working with relationship objects
  // tag::rel[]
  const actedIn = row.get('actedIn')

  actedIn.elementId // (1)
  actedIn.type // (2)
  actedIn.properties // (3)
  actedIn.startNodeElementId // (4)
  actedIn.endNodeElementId // (5)
  // end::rel[]

  // Working with Paths
  // tag::path[]
  const path = row.get('path')

  path.start // (1)
  path.end // (2)
  path.length // (3)
  path.segments // (4)
  // end::path[]

  // tag::segments[]
  path.segments.forEach(segment => {
    console.log(segment.start)
    console.log(segment.end)
    console.log(segment.relationship)
  })
  // end::segments[]

  // Integers
  // tag::integers[]
  // import { int, isInt } from 'neo4j-driver'

  // Convert a JavaScript 'number' into a Neo4j Integer
  const thisYear = int(2022)

  // Check if a value is a Neo4j integer
  console.log(isInt(thisYear)) // true

  // Convert the Neo4j integer into a JavaScript number
  console.log(thisYear.toNumber()) // 2022
  // end::integers[]

  // Temporal Types
  const driverDate = neo4j.type.Date.fromStandardDate(new Date())

  // tag::temporal[]
  // import { isDateTime, isDate } from 'neo4j-driver'

  // Convert a native Date into a Neo4j DateTime
  const now = new Date()
  const createdAt = DateTime.fromStandardDate(now)

  console.log(isDateTime(createdAt)) // true
  console.log(isDate(createdAt)) // false

  // Convert a Neo4j DateTime back into a native Date
  const dateNumber = Date.parse(driverDate.toString())
  const nativeDate = new Date(dateNumber)
  // end::temporal[]


  // Close the driver
  await driver.close()
}

main()
