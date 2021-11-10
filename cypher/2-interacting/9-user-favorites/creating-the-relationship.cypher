MATCH (u:User {userId: $userId})
MATCH (m:Movie {tmdbId: $movieId})

MERGE (u)-[r:HAS_FAVORITE]->(m)
ON CREATE SET u.createdAt = datetime()

RETURN m {
    .*,
    favorite: true
} AS movie