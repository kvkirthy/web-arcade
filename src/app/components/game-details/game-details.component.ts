import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GamesService } from 'src/app/common/games.service';
import { CommentsEntity } from 'src/app/common/comments-entity';
import { BoardGamesEntity } from 'src/app/common/board-games-entity';
import { IdbStorageAccessService } from 'src/app/common/idb-storage-access.service';
import { DexieStorageAccessService } from 'src/app/common/dexie-storage-access.service';
import { EnvironmentUtilitiesService } from 'src/app/common/environment-utilities.service';

@Component({
  selector: 'wade-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.sass']
})
export class GameDetailsComponent implements OnInit {

  name: string = "";
  title: string = "";
  comments: string = "";
  commentsObservable = new Observable<CommentsEntity[]>();
  toolbarColor = "primary";

  game: BoardGamesEntity;

  constructor(private idbSvc: IdbStorageAccessService,
    // private dexieSvc: DexieStorageAccessService,
    private gamesSvc: GamesService,
    private envUtil : EnvironmentUtilitiesService,
    private snackbar: MatSnackBar,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router
      .queryParams
      .subscribe( r => 
        this.getGameById(r['gameId']));

    this.idbSvc.CommentsSyncObservable.subscribe(
      () => {
        this.getComments(this.game.gameId);
        this.snackbar.open('Cached comments synchronized', "Close");
      },
      (error) => {
        console.error("unable to identify if cached comments were synchronized", error);
        this.snackbar.open('Unable to identify if cached comments were synchronized', "Close");
      }
    );

    this.envUtil.isOnline.subscribe( res => this.toolbarColor = res ? 'primary' : 'secondary' );
  }

  private getGameById(gameId: number){
    this.gamesSvc
    .getGameById(gameId)
    .subscribe(
      (res: BoardGamesEntity) => {
        this.game = res;
        this.getComments(res?.gameId);
      });
  }
  
  private getComments(gameId:number){
    this.commentsObservable = this.gamesSvc.getComments(gameId);
  }

  updateName(event: any){
    this.name = event.target.value;
  }

  updateTitle(event: any){
    this.title = event.target.value;
  }

  updateComments(event: any){
    this.comments = event.target.value;
  }

  submitComment(){
    if(this.idbSvc.IsOnline){
      this
        .gamesSvc
        .addComments(this.title, this.name, this.comments, this.game.gameId)
        .subscribe( (res) => {
          this.getComments(this.game.gameId);
          this.snackbar.open('Add comment successful', 'Close');
        });
    } else {
      this.idbSvc.addComment(this.title, this.name, this.comments, this.game.gameId);
      // this.dexieSvc.addComment(this.title, this.name, this.comments, this.game.gameId);
      this.snackbar.open('Application is offline. We saved it temporarily', 'Close');
    }
  }

}
