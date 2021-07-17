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
}
