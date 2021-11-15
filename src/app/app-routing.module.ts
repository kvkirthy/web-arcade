import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardGamesComponent } from './components/board-games/board-games.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

const routes: Routes = [{
  path: "home",
  component: BoardGamesComponent
}, {
  path: "details",
  component: GameDetailsComponent
}, {
  path: "",
  redirectTo: "/home",
  pathMatch: "full"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
