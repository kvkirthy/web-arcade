import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/common/games.service';
import { GamesEntity } from 'src/app/common/board-games-entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'wade-board-games',
  templateUrl: './board-games.component.html',
  styleUrls: ['./board-games.component.sass']
})
export class BoardGamesComponent implements OnInit {

  games = new Observable<GamesEntity>();

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.games = this.gameService.getBoardGames();
  }

}
