MATCH (u:User {email: "graphacademy.reviewer@neo4j.com"})-[r:RATED]->(m:Movie {title: "Goodfellas"})
RETURN u.email, m.title, r.rating,
    r.rating = 5 as shouldVerify