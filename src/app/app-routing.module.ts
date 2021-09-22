import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardGamesComponent } from './components/board-games/board-games.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

const routes: Routes = [{
  path: "",
  component: BoardGamesComponent
}, {
  path: "details",
  component: GameDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
