import { Injectable } from '@angular/core';
import { WebArcadeDb } from 'src/app/common/web-arcade-db';
import { CommentsEntity } from 'src/app/common/comments-entity';

@Injectable({
  providedIn: 'root'
})
export class DexieStorageAccessService {

  webArcadeDb = new WebArcadeDb();

  constructor(private windowObj: Window) {}

  init(){
    this.webArcadeDb
    .open()
    .catch(err => console.log("Dexie, error opening DB"));

    this.windowObj.addEventListener("online", (event) => {
      // this.getAllCachedComments();
    });

    this.updateComment(1, "New title", "new comment description");
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
        })
        .then( id => console.log(`Comment added successfully. Comment Id is ${id}`))
        .catch( error => console.log(error))
        ;
  }
  
  deleteComment(id: number){
      return this.webArcadeDb
        .comments
        .delete(id)
        .then( () => console.log(`Comment deleted successfully.`))
        .catch(err => console.error("Error deleting", err));
  }

  updateComment(commentId: number, title: string, comments: string){
    this.webArcadeDb 
      .comments
      .update(commentId, {title: title, comments})
      .then( result => console.log(`Comment updated successfully. Updated record ID is ${result}`))
      .catch(error => console.error("Error updating", error));
  }

  getAllCachedComments(){
    let deleteIds: Array<number> = [];
    this.webArcadeDb.transaction("rw", this.webArcadeDb.comments, () => {

    this.webArcadeDb
      .comments      
      .each( (entity: CommentsEntity) => {
        console.log(entity);
      })
      .catch(error => console.error("Error updating", error));
    });
  }
}