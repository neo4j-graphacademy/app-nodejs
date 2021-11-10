MATCH (p:Person {tmdbId: "1776"})
RETURN size((p)-[:DIRECTED]->())