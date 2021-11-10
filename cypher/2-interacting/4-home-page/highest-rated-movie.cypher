MATCH (m:Movie)
WHERE exists(m.imdbRating)
RETURN m.title
ORDER BY m.imdbRating DESC LIMIT 1