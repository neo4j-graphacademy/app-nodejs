MATCH (:Person {tmdbId: $id})-[:ACTED_IN|DIRECTED]->(m)<-[r:ACTED_IN|DIRECTED]-(p)
RETURN p {
  .*,
  actedCount: size((p)-[:ACTED_IN]->()),
  directedCount: size((p)-[:DIRECTED]->()),
  inCommon: collect(m {.tmdbId, .title, type: type(r)})
} AS person
ORDER BY size(person.inCommon) DESC
SKIP 0
LIMIT 6