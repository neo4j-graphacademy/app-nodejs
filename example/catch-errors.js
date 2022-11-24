import neo4j from 'neo4j-driver'
import ValidationError from '../src/errors/validation.error'

const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'neo'))


const promiseApi = () => {
  const session = this.driver.session()

  // tag::promise[]
  // Run the query...
  session.executeWrite(tx => tx.run(`
    CREATE (:User {email: $email})
  `, { email: 'uniqueconstraint@example.com' }))
    .then(res => {
      // The query ran successfully
      console.log(res.records[0])
    })
    .catch(e => {
      // An error has occurred
      if (e.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
        console.log(e.message) // Node(33880) already exists with...

        throw new ValidationError(`An account already exists with the email address ${email}`, {
          email: e.message
        })
      }

      throw e
    })
    .finally(() => {
      // Finally, close the session
      return session.close()
    })
    // end::promise[]
}


const asyncFunction = async () => {
  await driver.verifyConnectivity()

  // tag::catch[]
  // Open the session
  const session = this.driver.session()

  try {
    // Run the query...
    const res = await session.executeWrite(tx => tx.run(`
      CREATE (:User {email: $email})
    `, { email: 'uniqueconstraint@example.com' }))

    // The query ran successfully
    console.log(res.records[0])
  }
  catch (e) {
    if (e.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
      console.log(e.message) // Node(33880) already exists with...

      throw new ValidationError(`An account already exists with the email address ${email}`, {
        email: e.message
      })
    }

    throw e
  }
  finally {
    // Finally, close the session
    await session.close()
  }
  // end::catch[]
}

asyncFunction()
