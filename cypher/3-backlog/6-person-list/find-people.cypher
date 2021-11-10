MATCH (p:Person)
WHERE p.name CONTAINS $q
RETURN p { .* } AS person
ORDER BY p.name ASC
SKIP $skip
LIMIT $limit