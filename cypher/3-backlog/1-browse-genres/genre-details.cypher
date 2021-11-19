MATCH (g:Genre)
CALL {
  WITH g
  MATCH (g)<-[:IN_GENRE]-(m:Movie)
  WHERE exists(m.imdbRating) AND exists(m.poster) AND g.name <> '(no genres listed)'
  RETURN m.poster AS poster
  ORDER BY m.imdbRating DESC LIMIT 1
}

RETURN g {
  .*,
  poster: poster
}
ORDER BY g.name ASC