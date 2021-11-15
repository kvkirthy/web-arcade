import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DiceComponent } from '../dice/dice.component';
import { GamesService } from 'src/app/common/games.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BoardGamesEntity, GamesEntity } from 'src/app/common/board-games-entity';

@Component({
  selector: 'wade-board-games',
  templateUrl: './board-games.component.html',
  styleUrls: ['./board-games.component.sass']
})
export class BoardGamesComponent implements OnInit {

  games = new Observable<GamesEntity>();

  constructor(private gameService: GamesService,
    private router: Router,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.games = this.gameService.getBoardGames();
  }

  gameSelected(game: BoardGamesEntity){
    this.router.navigate(['/details'], {queryParams: {gameId: game.gameId}})
  }

  showDice(){
    this.bottomSheet.open(DiceComponent);
  }

}
