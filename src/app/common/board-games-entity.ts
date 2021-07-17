export interface BoardGamesEntity {
    title: string;
    description: string;
    age: string;
    players: string;
    origin: string;
    link: string;
    alternateNames: string;
}

export interface GamesEntity {
    boardGames: Array<BoardGamesEntity>;
}
