MATCH (u:User)-[r:RATED]->(m:Movie {title: "Pulp Fiction"})
RETURN u.name
ORDER BY r.timestamp ASC
LIMIT 1