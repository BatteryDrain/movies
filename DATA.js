DATA = [
    //id, name, picture, link, recomend(1/0/-1)
    [0, "Lost In Starlight", "LostinStarlight", "https://www.imdb.com/title/tt28664733/", 1],
    [1, "Bastille Day/The Take", "TheTake", "https://www.imdb.com/title/tt2368619/", 1],
    [2, "Pirates of the Caribbean: The Curse of the Black Pearl", "Jack", "https://www.imdb.com/title/tt0325980/", 1],
    [3, "The Acountant 2", "TheAcountant2", "https://www.imdb.com/title/tt7068946/", 1],
    [4, "The Accountant", "TheAccountant", "https://www.imdb.com/title/tt2140479/", 1],
    [5, "Head of State", "HeadofState", "https://www.imdb.com/title/tt13357520/", 1]
]

TAGS = [
    //id, tag, description,
    [0, "adventure", ""],
    [1, "romance", ""],
    [2, "love", ""],
    [3, "action", ""],
    [4, "cop", ""],
    [5, "heist", ""],
    [6, "spy", ""],
    [7, "Business", ""],
    [8, "Mystery", ""],
    [9, "comedy", ""],
    [10, "spy", ""]
]

MOVIETAGS = [
    //movie id, tag1, tag2, tag3, tag4, tag5,
    [0, 0, 1, 2],
    [1, 3, 0, 4, 5],
    [2, 3, 0, 5],
    [3, 3, 0, 2, 6],
    [4, 3, 7, 8],
    [5, 3, 9, 10]
]

OTHER = [
    //movie id, age ratting, year realised, score, animated?,
    [0, "PG", 2025, 100, "an"],
    [1, "R", 2016, 99, "la"],
    [2, "PG-13", 2003, 98, "la"],
    [3, "R", 2025, 90, "la"],
    [4, "R", 2016, 80, "la"],
    [5, "PG-13", 2025, 70, "la"]
]

AGERATE = [
    //id, str, rate id,
    [0, "all ages"],
    [1, "with guidence"],
    [2, "preteen"],
    [3, "teen"],
    [4, "mature teen"],
    [5, "18+"]
]

RATE = [
    //id, agerate id, str, system id,
    [0, 0, "G", 110],
    [1, 0, "U", 111],
    [2, 0, "ALL", 7],
    [3, 0, "0", 8],
    [4, 0, "U", 9],
    [5, 1, "PG", 112],
    [6, 1, "PG-12", 6],
    [7, 1, "M", 113],
    [8, 1, "UA", 9],
    [9, 2, "12A", 2],
    [10, 2, "12", 114],
    [11, 2, "PG-13", 0],
    [12, 2, "RP13", 5],
    [13, 3, "14A", 1],
    [14, 3, "15", 115],
    [15, 3, "R15+", 6],
    [16, 3, "R13 / R15", 5],
    [17, 4, "16", 8],
    [18, 4, "-16", 3],
    [19, 4, "R16", 5],
    [20, 4, "R", 116],
    [21, 4, "18A", 1],
    [22, 5, "18", 117],
    [23, 5, "-18", 3],
    [24, 5, "R18", 2],
    [25, 5, "R18+", 118],
    [26, 5, "A", 9],
    [27, 5, "NC-17", 0]
]

SYSTEM = [
    //id, country1, country2, country3, ...
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8], 
    [9, 9],
    [110, 0, 1, 4, 5, 6],
    [111, 2, 3],
    [112, 0, 1, 4, 5, 2],
    [113, 4, 5],
    [114, 2, 7, 8],
    [115, 2, 7], 
    [116, 0, 1, 4],
    [117, 3, 2, 8, 5, 7],
    [118, 4, 5, 6],
]

COUNTRY = [
    //id, emoji, str,
    [0, "🇺🇸", "USA"],
    [1, "🇨🇦", "Canada"],
    [2, "🇬🇧", "UK"],
    [3, "🇫🇷", "France"],
    [4, "🇦🇺", "Australia"],
    [5, "🇳🇿", "NZ"],
    [6, "🇯🇵", "Japan"],
    [7, "🇰🇷", "South Korea"],
    [8, "🇩🇪", "Germany"],
    [9, "🇮🇳", "India"]
]