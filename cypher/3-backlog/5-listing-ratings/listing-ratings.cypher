MATCH (u:User)-[r:RATED]->(m:Movie {tmdbId: $id})
RETURN r {
    .rating,
    .timestamp,
    user: u {
        .userId, .name
    }
} AS review
ORDER BY r.timestamp DESC
SKIP $skip
LIMIT $limit