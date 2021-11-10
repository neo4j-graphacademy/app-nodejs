MATCH (u:User {email: "graphacademy.flag@neo4j.com"})-[:HAS_FAVORITE]->(:Movie {title: 'Free Willy'})
RETURN true AS shouldVerify