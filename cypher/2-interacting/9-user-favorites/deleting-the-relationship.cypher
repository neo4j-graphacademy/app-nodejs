MATCH (u:User {userId: $userId})-[r:HAS_FAVORITE]->(m:Movie {tmdbId: $movieId})
DELETE r

RETURN m {
    .*,
    favorite: false
} AS movie