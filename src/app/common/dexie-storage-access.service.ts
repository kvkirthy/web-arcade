import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { CommentsEntity } from './board-games-entity';

@Injectable({
  providedIn: 'root'
})
export class DexieStorageAccessService {

  webArcadeDb = new WebArcadeDB('web-arcade-dexie');

  constructor(private windowObj: Window) {
    this.webArcadeDb
      .open()
      .catch(err => console.log("Dexie, error opening DB"));

      this.windowObj.addEventListener("online", (event) => {
        this.getAllCachedComments();
      });
  }

  addComment(title: string, userName: string, comments: string, gameId: number, timeCommented = new Date()){
    this.webArcadeDb
      .comments
      .add({
        title,
        userName,
        timeCommented: `${timeCommented.getMonth()}/${timeCommented.getDate()}/${timeCommented.getFullYear()}`,
        comments,
        gameId,
      });
  }
  
  deleteComment(id: number){
      this.webArcadeDb
        .comments
        .delete(id)
        .catch(err => console.error("delete error", err));
  }

  getAllCachedComments(){
    let deleteIds: Array<number> = [];
    this.webArcadeDb.transaction("rw", this.webArcadeDb.comments, () => {

    this.webArcadeDb
      .comments
      .each( (entity: CommentsEntity) => {
        console.log("each", entity);
        this.deleteComment(entity.IdxCommentId || 0);
      });
    });
  }
}

class WebArcadeDB extends Dexie {
  comments: Dexie.Table<CommentsEntity, number>;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      dGameComments: '++IdxCommentId,commentId'
    });
    this.comments = this.table('dGameComments');
   }

   
}