import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/common/games.service';
import { BoardGamesEntity, GamesEntity } from 'src/app/common/board-games-entity';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wade-board-games',
  templateUrl: './board-games.component.html',
  styleUrls: ['./board-games.component.sass']
})
export class BoardGamesComponent implements OnInit {

  games = new Observable<GamesEntity>();

  constructor(private gameService: GamesService,
    private router: Router) { }

  ngOnInit(): void {
    this.games = this.gameService.getBoardGames();
  }

  gameSelected(game: BoardGamesEntity){
    this.router.navigate(['/details'], {queryParams: {gameId: game.gameId}})
  }

}
