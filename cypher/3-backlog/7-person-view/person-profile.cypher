MATCH (p:Person {tmdbId: $id})
RETURN p {
  .*,
  actedCount: size((p)-[:ACTED_IN]->()),
  directedCount: size((p)-[:DIRECTED]->())
} AS person