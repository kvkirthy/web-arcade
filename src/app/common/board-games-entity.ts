export interface BoardGamesEntity {
    gameId: number;
    age: string;
    link: string;
    title: string;
    origin: string;
    players: string;
    description: string;
    alternateNames: string;
}

export interface GamesEntity {
    boardGames: Array<BoardGamesEntity>;
}
