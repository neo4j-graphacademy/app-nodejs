MATCH (m:Movie {tmdbId: $id})
RETURN m {
    .*,
    actors: [ (a)-[r:ACTED_IN]->(m) | a { .*, role: r.role } ],
    directors: [ (d)-[:DIRECTED]->(m) | d { .* } ],
    genres: [ (m)-[:IN_GENRE]->(g) | g { .name }],
    favorite: m.tmdbId IN $favorites
} AS movie
LIMIT 1