/*
MATCH (n:Movie)

WHERE n.imdbRating IS NOT NULL and n.poster IS NOT NULL

WITH n {
  tmdbId,
  .poster,
  .title,
  .year,
  .languages,
  .plot,
  imdbRating: n.imdbRating,
  directors: [ (n)<-[:DIRECTED]-(d) | d { tmdbId:d.imdbId, .name } ],
  actors: [ (n)<-[:ACTED_IN]-(p) | p { tmdbId:p.imdbId, .name } ][0..5],
  genres: [ (n)-[:IN_GENRE]->(g) | g {link: '/genres/'+ g.name, .name}]
}
ORDER BY n.rating DESC
LIMIT 6
RETURN collect(n)
 */
export const popular = [
    {
        actors: [
            {
                name: 'Tim Robbins',
                tmdbId:'0000209'
            },
            {
                name: 'William Sadler',
                tmdbId:'0006669'
            },
            {
                name: 'Bob Gunton',
                tmdbId:'0348409'
            },
            {
                name: 'Morgan Freeman',
                tmdbId:'0000151'
            }
        ],
        languages: [
            'English'
        ],
        plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        year: 1994,
        genres: [
            {
                link: '/genres/Drama',
                name: 'Drama'
            },
            {
                link: '/genres/Crime',
                name: 'Crime'
            }
        ],
        directors: [
            {
                name: 'Frank Darabont',
                tmdbId:'0001104'
            }
        ],
        imdbRating: 9.3,
        tmdbId:'0111161',
        title: 'Shawshank Redemption, The',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg'
    },
    {
        actors: [
            {
                name: 'Richard S. Castellano',
                tmdbId:'0144710'
            },
            {
                name: 'James Caan',
                tmdbId:'0001001'
            },
            {
                name: 'Al Pacino',
                tmdbId:'0000199'
            },
            {
                name: 'Marlon Brando',
                tmdbId:'0000008'
            }
        ],
        languages: [
            'English',
            ' Italian',
            ' Latin'
        ],
        plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        year: 1972,
        genres: [
            {
                link: '/genres/Drama',
                name: 'Drama'
            },
            {
                link: '/genres/Crime',
                name: 'Crime'
            }
        ],
        directors: [
            {
                name: 'Francis Ford Coppola',
                tmdbId:'0000338'
            }
        ],
        imdbRating: 9.2,
        tmdbId:'0068646',
        title: 'Godfather, The',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/iVZ3JAcAjmguGPnRNfWFOtLHOuY.jpg',
        favorite: true,
    },
    {
        actors: [
            {
                name: 'Al Pacino',
                tmdbId:'0000199'
            },
            {
                name: 'Robert De Niro',
                tmdbId:'0000134'
            },
            {
                name: 'Robert Duvall',
                tmdbId:'0000380'
            },
            {
                name: 'Diane Keaton',
                tmdbId:'0000473'
            }
        ],
        languages: [
            'English',
            ' Italian',
            ' Spanish',
            ' Latin',
            ' Sicilian'
        ],
        plot: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.',
        year: 1974,
        genres: [
            {
                link: '/genres/Crime',
                name: 'Crime'
            },
            {
                link: '/genres/Drama',
                name: 'Drama'
            }
        ],
        directors: [
            {
                name: 'Francis Ford Coppola',
                tmdbId:'0000338'
            }
        ],
        imdbRating: 9.0,
        tmdbId:'0071562',
        title: 'Godfather: Part II, The',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/amvmeQWheahG3StKwIE1f7jRnkZ.jpg',
        favorite: true,
    },
    {
        actors: [
            {
                name: 'Michael Caine',
                tmdbId:'0000323'
            },
            {
                name: 'Heath Ledger',
                tmdbId:'0005132'
            },
            {
                name: 'Aaron Eckhart',
                tmdbId:'0001173'
            },
            {
                name: 'Christian Bale',
                tmdbId:'0000288'
            }
        ],
        languages: [
            'English',
            ' Mandarin'
        ],
        plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.',
        year: 2008,
        genres: [
            {
                link: '/genres/Action',
                name: 'Action'
            },
            {
                link: '/genres/Crime',
                name: 'Crime'
            },
            {
                link: '/genres/Drama',
                name: 'Drama'
            },
            {
                link: '/genres/IMAX',
                name: 'IMAX'
            }
        ],
        directors: [
            {
                name: 'Christopher Nolan',
                tmdbId:'0634240'
            }
        ],
        imdbRating: 9.0,
        tmdbId:'0468569',
        title: 'Dark Knight, The',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        favorite: false,
    },
    {
        actors: [
            {
                name: 'Lee J. Cobb',
                tmdbId:'0002011'
            },
            {
                name: 'E.G. Marshall',
                tmdbId:'0550855'
            },
            {
                name: 'Martin Balsam',
                tmdbId:'0000842'
            },
            {
                name: 'John Fiedler',
                tmdbId:'0275835'
            }
        ],
        languages: [
            'English'
        ],
        plot: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
        year: 1957,
        genres: [
            {
                link: '/genres/Drama',
                name: 'Drama'
            }
        ],
        directors: [
            {
                name: 'Sidney Lumet',
                tmdbId:'0001486'
            }
        ],
        imdbRating: 8.9,
        tmdbId:'0050083',
        title: '12 Angry Men',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/7sf9CgJz30aXDvrg7DYYUQ2U91T.jpg'
    },
    {
        actors: [
            {
                name: 'Helena Bonham Carter',
                tmdbId:'0000307'
            },
            {
                name: 'Meat Loaf',
                tmdbId:'0001533'
            },
            {
                name: 'Brad Pitt',
                tmdbId:'0000093'
            },
            {
                name: 'Edward Norton',
                tmdbId:'0001570'
            }
        ],
        languages: [
            'English'
        ],
        plot: 'An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more...',
        year: 1999,
        genres: [
            {
                link: '/genres/Drama',
                name: 'Drama'
            },
            {
                link: '/genres/Thriller',
                name: 'Thriller'
            },
            {
                link: '/genres/Action',
                name: 'Action'
            },
            {
                link: '/genres/Crime',
                name: 'Crime'
            }
        ],
        directors: [
            {
                name: 'David Fincher',
                tmdbId:'0000399'
            }
        ],
        imdbRating: 8.9,
        tmdbId:'0137523',
        title: 'Fight Club',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/wR5HZWdVpcXx9sevV1bQi7rP4op.jpg',
        favorite: true,
    }
]

/*
MATCH (n:Movie)

WHERE n.released IS NOT NULL and n.poster IS NOT NULL

WITH n {
  .tmdbId,
  .poster,
  .title,
  .year,
  .languages,
  .plot,
  imdbRating: n.imdbRating,
  directors: [ (n)<-[:DIRECTED]-(d) | d { tmdbId:d.imdbId, .name } ],
  actors: [ (n)<-[:ACTED_IN]-(p) | p { tmdbId:p.imdbId, .name } ][0..5],
  genres: [ (n)-[:IN_GENRE]->(g) | g {link: '/genres/'+ g.name, .name}]
}
ORDER BY n.released DESC
LIMIT 6
RETURN collect(n)
*/
export const latest = [
    {
        actors: [
            {
                name: 'Robin Williams',
                tmdbId:'0000245'
            },
            {
                name: 'Bradley Pierce',
                tmdbId:'0682300'
            },
            {
                name: 'Kirsten Dunst',
                tmdbId:'0000379'
            },
            {
                name: 'Jonathan Hyde',
                tmdbId:'0404993'
            }
        ],
        languages: [
            'English',
            ' French'
        ],
        plot: 'When two kids find and play a magical board game, they release a man trapped for decades in it and a host of dangers that can only be stopped by finishing the game.',
        year: 1995,
        genres: [
            {
                link: '/genres/Adventure',
                name: 'Adventure'
            },
            {
                link: '/genres/Children',
                name: 'Children'
            },
            {
                link: '/genres/Fantasy',
                name: 'Fantasy'
            }
        ],
        directors: [
            {
                name: 'Joe Johnston',
                tmdbId:'0002653'
            }
        ],
        imdbRating: 6.9,
        tmdbId:'0113497',
        title: 'Jumanji',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/vgpXmVaVyUL7GGiDeiK1mKEKzcX.jpg'
    },
    {
        actors: [
            {
                name: 'Walter Matthau',
                tmdbId:'0000527'
            },
            {
                name: 'Ann-Margret',
                tmdbId:'0000268'
            },
            {
                name: 'Jack Lemmon',
                tmdbId:'0000493'
            },
            {
                name: 'Sophia Loren',
                tmdbId:'0000047'
            }
        ],
        languages: [
            'English'
        ],
        plot: "John and Max resolve to save their beloved bait shop from turning into an Italian restaurant, just as its new female owner catches Max's attention.",
        year: 1995,
        genres: [
            {
                link: '/genres/Comedy',
                name: 'Comedy'
            },
            {
                link: '/genres/Romance',
                name: 'Romance'
            }
        ],
        directors: [
            {
                name: 'Howard Deutch',
                tmdbId:'0222043'
            }
        ],
        imdbRating: 6.6,
        tmdbId:'0113228',
        title: 'Grumpier Old Men',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/1FSXpj5e8l4KH6nVFO5SPUeraOt.jpg'
    },
    {
        actors: [
            {
                name: 'Whitney Houston',
                tmdbId:'0001365'
            },
            {
                name: 'Lela Rochon',
                tmdbId:'0005375'
            },
            {
                name: 'Angela Bassett',
                tmdbId:'0000291'
            },
            {
                name: 'Loretta Devine',
                tmdbId:'0222643'
            }
        ],
        languages: [
            'English'
        ],
        plot: "Based on Terry McMillan's novel, this film follows four very different African-American women and their relationships with the male gender.",
        year: 1995,
        genres: [
            {
                link: '/genres/Romance',
                name: 'Romance'
            },
            {
                link: '/genres/Drama',
                name: 'Drama'
            },
            {
                link: '/genres/Comedy',
                name: 'Comedy'
            }
        ],
        directors: [
            {
                name: 'Forest Whitaker',
                tmdbId:'0001845'
            }
        ],
        imdbRating: 5.6,
        tmdbId:'0114885',
        title: 'Waiting to Exhale',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/4wjGMwPsdlvi025ZqR4rXnFDvBz.jpg'
    },
    {
        actors: [
            {
                name: 'Steve Martin',
                tmdbId:'0000188'
            },
            {
                name: 'Kimberly Williams-Paisley',
                tmdbId:'0931090'
            },
            {
                name: 'Diane Keaton',
                tmdbId:'0000473'
            },
            {
                name: 'Martin Short',
                tmdbId:'0001737'
            }
        ],
        languages: [
            'English'
        ],
        plot: 'In this sequel, George Banks deals not only with the pregnancy of his daughter, but also with the unexpected pregnancy of his wife.',
        year: 1995,
        genres: [
            {
                link: '/genres/Comedy',
                name: 'Comedy'
            }
        ],
        directors: [
            {
                name: 'Charles Shyer',
                tmdbId:'0796124'
            }
        ],
        imdbRating: 5.9,
        tmdbId:'0113041',
        title: 'Father of the Bride Part II',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/lf9RTErt8BSLQy98aSFblElvsCQ.jpg'
    },
    {
        actors: [
            {
                name: 'Al Pacino',
                tmdbId:'0000199'
            },
            {
                name: 'Robert De Niro',
                tmdbId:'0000134'
            },
            {
                name: 'Val Kilmer',
                tmdbId:'0000174'
            },
            {
                name: 'Jon Voight',
                tmdbId:'0000685'
            }
        ],
        languages: [
            'English',
            ' Spanish'
        ],
        plot: 'A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.',
        year: 1995,
        genres: [
            {
                link: '/genres/Action',
                name: 'Action'
            },
            {
                link: '/genres/Crime',
                name: 'Crime'
            },
            {
                link: '/genres/Thriller',
                name: 'Thriller'
            }
        ],
        directors: [
            {
                name: 'Michael Mann',
                tmdbId:'0000520'
            }
        ],
        imdbRating: 8.2,
        tmdbId:'0113277',
        title: 'Heat',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/rrBuGu0Pjq7Y2BWSI6teGfZzviY.jpg'
    },
    {
        actors: [
            {
                name: 'Jim Varney',
                tmdbId:'0001815'
            },
            {
                name: 'Tim Allen',
                tmdbId:'0000741'
            },
            {
                name: 'Tom Hanks',
                tmdbId:'0000158'
            },
            {
                name: 'Don Rickles',
                tmdbId:'0725543'
            }
        ],
        languages: [
            'English'
        ],
        plot: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
        year: 1995,
        genres: [
            {
                link: '/genres/Adventure',
                name: 'Adventure'
            },
            {
                link: '/genres/Animation',
                name: 'Animation'
            },
            {
                link: '/genres/Children',
                name: 'Children'
            },
            {
                link: '/genres/Comedy',
                name: 'Comedy'
            },
            {
                link: '/genres/Fantasy',
                name: 'Fantasy'
            }
        ],
        directors: [
            {
                name: 'John Lasseter',
                tmdbId:'0005124'
            }
        ],
        imdbRating: 8.3,
        tmdbId:'0114709',
        title: 'Toy Story',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg'
    }
]

export const goodfellas = {
    actors: [
        {
            name: 'Joe Pesci',
            bornIn: 'Newark, New Jersey, USA ',
            tmdbId:'0000582',
            poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/7ecSqd7GXYbK3sJw1lvLWLiJ6fh.jpg',
            born: '1943-02-09'
        },
        {
            name: 'Lorraine Bracco',
            bornIn: 'Bay Ridge - Brooklyn - New York City - New York - USA',
            tmdbId:'0000966',
            poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/1lQiN8yggIJ8aGYLp4Nul3ALdXC.jpg',
            born: '1954-10-02'
        },
        {
            name: 'Ray Liotta',
            bornIn: 'Newark, New Jersey, USA',
            tmdbId:'0000501',
            poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/4trMXwGW6OZpyvDYQ7a5ZCxk9KL.jpg',
            born: '1954-12-18'
        },
        {
            name: 'Robert De Niro',
            bornIn: 'Greenwich Village, New York City, New York, USA',
            tmdbId:'0000134',
            poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg',
            born: '1943-08-17'
        }
    ],
    plot: 'Henry Hill and his friends work their way up through the mob hierarchy.',
    year: 1990,
    genres: [
        { link: '/genres/Crime', name: 'Crime' },
        { link: '/genres/Drama', name: 'Drama' },
    ],
    runtime: 146,
    directors: [
        {
            name: 'Martin Scorsese',
            bornIn: 'Queens, New York, USA',
            tmdbId:'0000217',
            poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/9U9Y5GQuWX3EZy39B8nkk4NY01S.jpg',
            born: '1942-11-17'
        },
    ],
    imdbRating: 8.7,
    languages: ['English', 'Italian'],
    tmdbId:'769',
    title: 'Goodfellas',
    poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/oErEczcVUmJm0EPdvWsvK4g4Lv3.jpg',

    ratingCount: 124,
    ratings: [
        {
            imdbRating: 2.0,
            user: {
                name: 'Catherine Trujillo',
                tmdbId:'570'
            },
            timestamp: 1475784311
        },
        {
            imdbRating: 5.0,
            user: {
                name: 'Teresa Graham',
                tmdbId:'457'
            },
            timestamp: 1471383372
        },
        {
            imdbRating: 5.0,
            user: {
                name: 'Meredith Leonard',
                tmdbId:'519'
            },
            timestamp: 1471150621
        },
        {
            imdbRating: 4.0,
            user: {
                name: 'Dr. Angela Johnson',
                tmdbId:'56'
            },
            timestamp: 1467003139
        },
        {
            imdbRating: 5.0,
            user: {
                name: 'Melissa King',
                tmdbId:'483'
            },
            timestamp: 1465387394
        }
    ]
}

/**
MATCH (m:Movie {title: "Goodfellas"})-[r:RATED]-(u:User)
WITH {
imdbRating: r.rating, timestamp: r.timestamp,
user: u {tmdbId:u.userId, .name}
} AS r
ORDER BY r.timestamp DESC
RETURN collect(r)[0..5]
 */
export const ratings = [
    {
        imdbRating: 2.0,
        user: {
            name: 'Catherine Trujillo',
            tmdbId:'570'
        },
        timestamp: 1475784311
    },
    {
        imdbRating: 5.0,
        user: {
            name: 'Teresa Graham',
            tmdbId:'457'
        },
        timestamp: 1471383372
    },
    {
        imdbRating: 5.0,
        user: {
            name: 'Meredith Leonard',
            tmdbId:'519'
        },
        timestamp: 1471150621
    },
    {
        imdbRating: 4.0,
        user: {
            name: 'Dr. Angela Johnson',
            tmdbId:'56'
        },
        timestamp: 1467003139
    },
    {
        imdbRating: 5.0,
        user: {
            name: 'Melissa King',
            tmdbId:'483'
        },
        timestamp: 1465387394
    }
]

/**
MATCH (:Movie {title: "Goodfellas"})<-[r:RATED]-(u:User)-[r2:RATED]->(n:Movie)

WHERE r.rating > 4.0 AND r2.rating >= r.rating

RETURN n {
  tmdbId:n.imdbId,
  .poster,
  .title,
  .year,
  .languages,
  .plot,
  imdbRating: n.imdbRating,
  genres: [ (n)-[:IN_GENRE]->(g) | g {link: '/genres/'+ g.name, .name}]
} AS movie

, avg(r2.rating) AS rating ORDER BY rating DESC LIMIT 5
 */
export const similar = [
    {
        languages: [
            'English'
        ],
        plot: "A twisted take on 'Little Red Riding Hood' with a teenage juvenile delinquent on the run from a social worker traveling to her grandmother's house and being hounded by a charming, but sadistic, serial killer/pedophile.",
        year: 1996,
        genres: [
            {
                link: '/genres/Drama',
                name: 'Drama'
            },
            {
                link: '/genres/Crime',
                name: 'Crime'
            },
            {
                link: '/genres/Comedy',
                name: 'Comedy'
            },
            {
                link: '/genres/Thriller',
                name: 'Thriller'
            }
        ],
        imdbRating: 6.9,
        tmdbId:'0116361',
        title: 'Freeway',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/m0pAARUq3foDWFsrUmlYDHtNPE9.jpg'
    },
    {
        languages: [
            'English'
        ],
        plot: 'Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his kids against prejudice.',
        year: 1962,
        genres: [
            {
                link: '/genres/Drama',
                name: 'Drama'
            }
        ],
        imdbRating: 8.4,
        tmdbId:'0056592',
        title: 'To Kill a Mockingbird',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/ymbVkjMBqRFNJsxDUKXR27Kqsxa.jpg'
    },
    {
        languages: [
            'German',
            ' English',
            ' French',
            ' Turkish',
            ' Hebrew',
            ' Spanish',
            ' Japanese'
        ],
        plot: 'An angel tires of overseeing human activity and wishes to become human when he falls in love with a mortal.',
        year: 1987,
        genres: [
            {
                link: '/genres/Drama',
                name: 'Drama'
            },
            {
                link: '/genres/Romance',
                name: 'Romance'
            },
            {
                link: '/genres/Fantasy',
                name: 'Fantasy'
            }
        ],
        imdbRating: 8.1,
        tmdbId:'0093191',
        title: 'Wings of Desire (Himmel über Berlin, Der)',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/iZQs2vUeCzvS1KfZJ6uYNCGJBBV.jpg'
    },
    {
        languages: [
            'English'
        ],
        plot: 'Wallace is used by a criminal penguin in a robbery involving mechanical trousers.',
        year: 1993,
        genres: [
            {
                link: '/genres/Comedy',
                name: 'Comedy'
            },
            {
                link: '/genres/Children',
                name: 'Children'
            },
            {
                link: '/genres/Animation',
                name: 'Animation'
            },
            {
                link: '/genres/Crime',
                name: 'Crime'
            }
        ],
        imdbRating: 8.4,
        tmdbId:'0108598',
        title: 'Wallace & Gromit: The Wrong Trousers',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/wRTCxYHx1d9diFFmOHQZT7CjdUV.jpg'
    },
    {
        languages: [
            'English'
        ],
        plot: 'A hack screenwriter writes a screenplay for a former silent-film star who has faded into Hollywood obscurity.',
        year: 1950,
        genres: [
            {
                link: '/genres/Romance',
                name: 'Romance'
            },
            {
                link: '/genres/Film-Noir',
                name: 'Film-Noir'
            },
            {
                link: '/genres/Drama',
                name: 'Drama'
            }
        ],
        imdbRating: 8.5,
        tmdbId:'0043014',
        title: 'Sunset Blvd. (a.k.a. Sunset Boulevard)',
        poster: 'https://image.tmdb.org/t/p/w440_and_h660_face/zt8aQ6ksqK6p1AopC5zVTDS9pKT.jpg'
    }
]
