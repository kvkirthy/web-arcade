import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommentsEntity, GamesEntity } from './board-games-entity';
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

  getComments(gameId: number): Observable<CommentsEntity[]>{
    return this
      .httpClient
      .get<CommentsEntity[]>(`${environment.commentsServiceUrl}?gameId=${gameId}`);
  }

  addComments(title: string, userName: string, comments: string, gameId: number, timeCommented = new Date()){
    return this
      .httpClient
      .post(environment.commentsServiceUrl, {
        title,
        userName,
        timeCommented,
        comments,
        gameId
      });
  }

}
