MATCH (g:Genre {name: "Action"})
RETURN size((g)<-[:IN_GENRE]-())