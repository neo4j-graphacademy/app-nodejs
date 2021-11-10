MATCH (u:User {email: 'authenticated@neo4j.com'})
RETURN u.email, u.authenticatedAt,
    u.authenticatedAt >= datetime() - duration('PT24H') AS shouldVerify