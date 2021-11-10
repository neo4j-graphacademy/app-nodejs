MATCH (u:User {email: 'graphacademy@neo4j.com'})
RETURN u.email, u.name, u.password,
    (u.email = 'graphacademy@neo4j.com' AND u.name = 'Graph Academy' AND u.password <> 'letmein') AS shouldVerify