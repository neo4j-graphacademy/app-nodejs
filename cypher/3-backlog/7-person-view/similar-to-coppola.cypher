MATCH (:Person {tmdbId: '1776'})-[:ACTED_IN|DIRECTED]->(m)<-[r:ACTED_IN|DIRECTED]-(p)
WITH p, collect(m) AS inCommon
RETURN p.name
ORDER BY size(inCommon) DESC
LIMIT 1