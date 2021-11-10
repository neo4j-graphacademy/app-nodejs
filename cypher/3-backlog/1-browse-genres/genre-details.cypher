MATCH (g:Genre)<-[:IN_GENRE]-(m:Movie)
WHERE exists(m.imdbRating) AND exists(m.poster) AND g.name <> '(no genres listed)'
WITH g, m
ORDER BY m.imdbRating DESC

WITH g, head(collect(m)) AS movie

RETURN g {
    .name,
    movies: size((g)<-[:IN_GENRE]-()),
    poster: movie.poster
} AS genre
ORDER BY g.name ASC