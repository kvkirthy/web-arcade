import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GamesEntity } from './board-games-entity';
import { Observable } from 'rxjs';


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

  addComments(title: string, userName: string, comments: string, gameId: number, timeCommented = new Date()){
    return this
      .httpClient
      .post(environment.commentsServiceUrl, {
        title,
        userName,
        timeCommented,
        comments,
        gameId
      }).subscribe( (res) => console.log("Add comment service call successful", res));
  }

}
