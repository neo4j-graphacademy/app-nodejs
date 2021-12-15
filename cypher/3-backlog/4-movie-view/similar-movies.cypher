MATCH (:Movie {tmdbId: $id})-[:IN_GENRE|ACTED_IN|DIRECTED]->()<-[:IN_GENRE|ACTED_IN|DIRECTED]-(m)
WHERE m.imdbRating IS NOT NULL

WITH m, count(*) AS inCommon
WITH m, inCommon, m.imdbRating * inCommon AS score
ORDER BY score DESC

SKIP $skip
LIMIT $limit

RETURN m {
    .*,
    score: score,
    favorite: m.tmdbId IN $favorites
} AS movie