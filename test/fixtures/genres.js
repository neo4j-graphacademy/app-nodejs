/*
MATCH (g:Genre)<-[:IN_GENRE]-(m:Movie)
WHERE m.imdbRating IS NOT NULL AND m.poster IS NOT NULL AND g.name <> '(no genres listed)'
WITH g, m
ORDER BY m.imdbRating DESC

WITH g, collect(m)[0] AS movie

RETURN g {
  link: '/genres/'+ g.name,
  .name,
  movies: size((g)<-[:IN_GENRE]-()),
  poster: movie.poster
} AS genre
  ORDER BY g.name ASC
*/

export const genres = [
    {
        link: '/genres/Action',
        name: 'Action',
        movies: 1545,
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
    },
    {
        link: '/genres/Adventure',
        name: 'Adventure',
        movies: 1117,
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg'
    },
    {
        link: '/genres/Animation',
        name: 'Animation',
        movies: 447,
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/eENI0WN2AAuQWfPmQupzMD6G4gV.jpg'
    },
    {
        link: '/genres/Children',
        name: 'Children',
        movies: 583,
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/bSqt9rhDZx1Q7UZ86dBPKdNomp2.jpg'
    },
    {
        link: '/genres/Comedy',
        name: 'Comedy',
        movies: 3315,
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/vnUzbdtqkudKSBgX0KGivfpdYNB.jpg'
    },
    {
        link: '/genres/Crime',
        name: 'Crime',
        movies: 1100,
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg'
    },
    {
        link: '/genres/Documentary',
        name: 'Documentary',
        movies: 495,
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/gVVd7hEfOgJ3OYkOUaoCqIZMmpC.jpg'
    },
    {
        link: '/genres/Drama',
        name: 'Drama',
        movies: 4365,
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg'
    },
    // {
    //     link: '/genres/Fantasy',
    //     name: 'Fantasy',
    //     movies: 654,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg'
    // },
    // {
    //     link: '/genres/Film-Noir',
    //     name: 'Film-Noir',
    //     movies: 133,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/zt8aQ6ksqK6p1AopC5zVTDS9pKT.jpg'
    // },
    // {
    //     link: '/genres/Horror',
    //     name: 'Horror',
    //     movies: 877,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/qjWV4Aq4t0SMhuRpkJ4q3D6byXq.jpg'
    // },
    // {
    //     link: '/genres/IMAX',
    //     name: 'IMAX',
    //     movies: 153,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
    // },
    // {
    //     link: '/genres/Musical',
    //     name: 'Musical',
    //     movies: 394,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/gVVd7hEfOgJ3OYkOUaoCqIZMmpC.jpg'
    // },
    // {
    //     link: '/genres/Mystery',
    //     name: 'Mystery',
    //     movies: 543,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
    // },
    // {
    //     link: '/genres/Romance',
    //     name: 'Romance',
    //     movies: 1545,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/clolk7rB5lAjs41SD0Vt6IXYLMm.jpg'
    // },
    // {
    //     link: '/genres/Sci-Fi',
    //     name: 'Sci-Fi',
    //     movies: 792,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/fR0VZ0VE598zl1lrYf7IfBqEwQ2.jpg'
    // },
    // {
    //     link: '/genres/Thriller',
    //     name: 'Thriller',
    //     movies: 1729,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/wR5HZWdVpcXx9sevV1bQi7rP4op.jpg'
    // },
    // {
    //     link: '/genres/War',
    //     name: 'War',
    //     movies: 367,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/c8Ass7acuOe4za6DhSattE359gr.jpg'
    // },
    // {
    //     link: '/genres/Western',
    //     name: 'Western',
    //     movies: 168,
    //     poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/eWivEg4ugIMAd7d4uWI37b17Cgj.jpg'
    // },
]
