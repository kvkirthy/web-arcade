import { Injectable } from '@angular/core';
import { WebArcadeDB } from './web-arcade-db';
import { CommentsEntity } from './comments-entity';

@Injectable({
  providedIn: 'root'
})
export class DexieStorageAccessService {

  webArcadeDb = new WebArcadeDB();

  constructor(private windowObj: Window) {

  }

  init(){
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