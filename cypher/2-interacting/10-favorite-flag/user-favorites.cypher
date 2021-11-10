MATCH (u:User {userId: $userId})-[:HAS_FAVORITE]->(m)
RETURN m.tmdbId AS id