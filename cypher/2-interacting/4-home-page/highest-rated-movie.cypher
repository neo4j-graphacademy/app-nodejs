MATCH (m:Movie)
WHERE m.imdbRating IS NOT NULL
RETURN m.title
ORDER BY m.imdbRating DESC LIMIT 1