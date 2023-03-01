import { isInt, isDate, isDateTime, isTime, isLocalDateTime, isLocalTime, isDuration } from 'neo4j-driver'

// Valid Order directions
const ORDER_ASC = 'ASC'
const ORDER_DESC = 'DESC'
const ORDERS = [ORDER_ASC, ORDER_DESC]

export const MOVIE_SORT = ['title', 'released', 'imdbRating']
export const PEOPLE_SORT = ['name', 'born', 'movieCount']
export const RATING_SORT = ['rating', 'timestamp']

/**
 * Extract commonly used pagination variables from the request query string
 *
 * @param {express.Request} req
 * @param {string[]} validSort
 * @returns {Record<string, any>}
 */
export function getPagination(req, validSort = []) {
  let { q, limit, skip, sort, order } = req.query

  // Only accept valid orderby fields
  if ( sort !== undefined && !validSort.includes(sort) ) {
    sort = undefined
  }

  // Only accept ASC/DESC values
  if ( order === undefined || !ORDERS.includes(order.toUpperCase()) ) {
    order = ORDER_ASC
  }

  return {
    q,
    sort,
    order,
    limit: parseInt(limit || 6),
    skip: parseInt(skip || 0),
  }
}

/**
 * Attempt to extract the current User's ID from the request
 * (as defined by the JwtStrategy in src/passport/jwt.strategy.js)
 *
 * @param {express.Request} req
 * @returns {string | undefined}
 */
export function getUserId(req) {
  return req.user ? req.user.userId : undefined
}

// tag::toNativeTypes[]
/**
 * Convert Neo4j Properties back into JavaScript types
 *
 * @param {Record<string, any>} properties
 * @return {Record<string, any>}
 */
export function toNativeTypes(properties) {
  return Object.fromEntries(Object.keys(properties).map((key) => {
    let value = valueToNativeType(properties[key])

    return [ key, value ]
  }))
}

/**
 * Convert an individual value to its JavaScript equivalent
 *
 * @param {any} value
 * @returns {any}
 */
function valueToNativeType(value) {
  if ( Array.isArray(value) ) {
    value = value.map(innerValue => valueToNativeType(innerValue))
  }
  else if ( isInt(value) ) {
    value = value.toNumber()
  }
  else if (
    isDate(value) ||
    isDateTime(value) ||
    isTime(value) ||
    isLocalDateTime(value) ||
    isLocalTime(value) ||
    isDuration(value)
  ) {
    value = value.toString()
  }
  else if (typeof value === 'object' && value !== undefined  && value !== null) {
    value = toNativeTypes(value)
  }

  return value
}
// end::toNativeTypes[]
