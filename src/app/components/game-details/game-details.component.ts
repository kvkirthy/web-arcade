import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/common/games.service';
import { IdbStorageAccessService } from 'src/app/common/idb-storage-access.service';

@Component({
  selector: 'wade-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.sass']
})
export class GameDetailsComponent implements OnInit {

  name: string = "";
  title: string = "";
  comments: string = "";

  game = {
    "id": 1,
    "age": "3+",
    "title": "Checkers",
    "players": "Two players",
    "alternateNames": "Draughts",
    "origin": "12th century France",
    "link": "https://simple.wikipedia.org/wiki/Checkers",
    "description": "Two players start with dark and light colored pieces. The pieces move diagonally."
  }

  constructor(private idbSvc: IdbStorageAccessService,
    private gamesSvc: GamesService) { }

  ngOnInit(): void {
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
      this.gamesSvc.addComments(this.title, this.name, this.comments, this.game.id);
    } else {
      this.idbSvc.addComment(this.title, this.name, this.comments, this.game.id);
    }
  }

}
