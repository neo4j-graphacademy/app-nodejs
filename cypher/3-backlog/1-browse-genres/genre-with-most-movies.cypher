MATCH (g:Genre)
RETURN g.name ORDER BY size((g)<-[:IN_GENRE]-()) DESC LIMIT 1