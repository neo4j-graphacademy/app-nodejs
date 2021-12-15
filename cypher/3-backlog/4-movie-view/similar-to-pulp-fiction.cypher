MATCH (:Movie {tmdbId: '100'})-[:IN_GENRE|ACTED_IN|DIRECTED]->()<-[:IN_GENRE|ACTED_IN|DIRECTED]-(m)
WHERE m.imdbRating IS NOT NULL

WITH m, count(*) AS inCommon
WITH m, inCommon, m.imdbRating * inCommon AS score

RETURN m.title
ORDER BY score DESC
LIMIT 1