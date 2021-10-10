import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BoardGamesEntity, GamesEntity } from './board-games-entity';
import { CommentsEntity } from './comments-entity';
import { Observable, ObservedValueOf } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private httpClient: HttpClient) { }

  getBoardGames(): Observable<GamesEntity>{
    return this
      .httpClient
      .get<GamesEntity>(environment.boardGameServiceUrl);
  }

  getGameById(gameId: number): Observable<BoardGamesEntity>{
    return this
      .httpClient
      .get<BoardGamesEntity>(environment.boardGamesByIdServiceUrl,{
        params: {gameId}
      });
  }

  getComments(gameId: number): Observable<CommentsEntity[]>{
    return this
      .httpClient
      .get<CommentsEntity[]>(environment.commentsServiceUrl,{
        params: {gameId}
      });
  }

  addComments(title: string, userName: string, comments: string, gameId: number, timeCommented = new Date()){
    return this
      .httpClient
      .post(environment.commentsServiceUrl, [{
        title,
        userName,
        timeCommented,
        comments,
        gameId
      }]);
  }

  addBulkComments(comments: Array<{title: string, 
    userName: string, 
    comments: string, 
    gameId: number,
    timeCommented: Date}>){
    return this
      .httpClient
      .post(environment.commentsServiceUrl, comments);
    
  }

}
