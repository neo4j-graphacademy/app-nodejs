import neo4j from 'neo4j-driver'
import { map } from 'rxjs'
import { config } from 'dotenv'

// Load config from .env
config()

// Load Driver
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))

const promiseApiExample = () => {
  const session = driver.session()

  // tag::promises[]
  session.executeRead(tx => tx.run(
    'MATCH (p:Person) RETURN p.name AS name LIMIT 10')
  )
    .then(res => {
      return res.records.map(row => {
        return row.get('name')
      })
    })
    .then(names => {
      // `names` is an array of strings
      console.log(names)
    })
    .catch(e => {
      // There was a problem with the
      // database connection or the query
      console.log(e)
    })
    // Finally, close the session
    .finally(() => session.close())
    // end::promises[]
}



const asyncAwaitExample = async () => {
  const session = driver.session()

  // tag::async[]
  try {
    const res = await session.executeRead(tx =>
      tx.run(
        'MATCH (p:Person) RETURN p.name AS name LIMIT 10'
      )
    )

    // tag::records[]
    const names = res.records.map(row => {
      return row.get('name')
    })
    // end::records[]

    // `names` is an array of strings
    console.log(names)
  }
  catch (e) {
    // There was a problem with the
    // database connection or the query
    console.log(e)
  }
  finally {
    await session.close()
  }
  // end::async[]
}

const iterateExample = async () => {
  const session = driver.session()

  try {
    const res = await session.executeRead(tx =>
      tx.run(
        'MATCH (p:Person) RETURN p.name AS name LIMIT 10'
      )
    )

    // tag::iterate[]
    for (const record in res.records) {
      console.log(record.get('name'))
    }
    // end::iterate[]

    // `names` is an array of strings
    console.log(names)
  }
  catch (e) {
    // There was a problem with the
    // database connection or the query
    console.log(e)
  }
  finally {
    await session.close()
  }
}

const rxExample = async () => {
  const rxSession = driver.rxSession()

  // tag::rxjs[]
  const res = await rxSession
    .executeWrite(txc =>
      txc
        .run('MERGE (p:Person) RETURN p.name AS name LIMIT 10')
        .records()
        .pipe(
          map(record => record.get('name'))
        )
    )
    // end::rxjs[]

    console.log(res)

    await rxSession.close()
}

const subscribe = () => {
  const session = driver.session()

  // tag::subscribe[]
  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run('MERGE (alice:Person {name : $nameParam}) RETURN alice.name AS name', {
      nameParam: 'Alice'
    })
    .subscribe({
      onKeys: keys => {
        console.log(keys) // ['name]
      },
      onNext: record => {
        console.log(record.get('name')) // 'Alice'
      },
      onCompleted: (summary) => {
        // `summary` holds the same information as `res.summary`

        // Close the Session
        session.close()
      },
      onError: error => {
        console.log(error)
      }
    })
    // end::subscribe[]
}
