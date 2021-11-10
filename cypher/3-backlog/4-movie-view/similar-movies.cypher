MATCH (:Movie {tmdbId: $id})-[:IN_GENRE|ACTED_IN|DIRECTED]->()<-[:IN_GENRE|ACTED_IN|DIRECTED]-(m)
WHERE exists(m.imdbRating)

WITH m, count(*) AS inCommon
ORDER BY inCommon DESC, m.imdbRating DESC

SKIP $skip
LIMIT $limit

RETURN m {
    .*,
    score: m.imdbRating * inCommon,
    favorite: m.tmdbId IN $favorites
} AS movie