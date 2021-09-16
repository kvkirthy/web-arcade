import { Injectable } from '@angular/core';
import { GamesService } from './games.service';

@Injectable()
export class IdbStorageAccessService {

  idb = window.indexedDB;
  indexedDb: IDBDatabase;

  constructor(private gameSvc: GamesService) {
    // this.create();
  }

  init() {
    let request = this.idb
      .open('web-arcade', 1);

    request.onsuccess = (evt:any) => {
      console.log("Open Success", evt);
      this.indexedDb = evt?.target?.result;
    };

    request.onupgradeneeded = function(event: any){
      console.log("version upgrade event triggered");
      let dbRef = event.target.result;
      dbRef
        .createObjectStore("gameComments", { keyPath: "commentId" });
    };

    addEventListener("online", (event) => {
      let promise = this.getAllCachedComments();
      promise.then((result: any) => {
        if (Array.isArray(result)) {
          result?.map( (r: {key: number; value: any}) => {
            if (r.key) {
              this.gameSvc.addComments(r.value.title, r.value.userName, r.value.comments, r.value.gameId);
              this.deleteComment(r.key);
            }
          });
        }
      });
    });
  }

  addComment(title: string, userName: string, comments: string, gameId: number, timeCommented = new Date()){
    let transaction = this.indexedDb
      .transaction("gameComments", "readwrite");

      transaction.objectStore("gameComments")
        .add(
          {
            title,
            userName,
            timeCommented,
            comments,
            gameId,
            commentId: new Date().getTime()
          }
        )
        .onsuccess = (evt:any) => console.log("add successful", evt.target.result);

      transaction.oncomplete = (evt) => console.log("add comment transaction complete", evt);
      transaction.onerror = (err) => console.log("add comment transaction errored out", err);

  }

  get IsOnline(){
    return navigator.onLine;
  }

  deleteComment(recordId: number){
    let deleteQuery = this.indexedDb
          .transaction("gameComments", "readwrite")
          .objectStore("gameComments")
          .delete(recordId);
    
    deleteQuery.onsuccess = (evt) => console.log("delete successful", evt);
    deleteQuery.onerror = (error) => console.log("delete successful", error);
  }

  getAllCachedComments() {
    return new Promise(
      (resolve, reject) => {
        let results: Array<{
          key: number,
          value: any
        }> = [];

        let query = this.indexedDb
          .transaction("gameComments", "readonly")
          .objectStore("gameComments")
          .openCursor();

          query.onsuccess = function (evt: any) {
            console.log("all cached comments", evt?.target?.result);
            let gameCommentsCursor = evt?.target?.result;
            if(gameCommentsCursor){
              results.push({
                key: gameCommentsCursor.primaryKey,
                value: gameCommentsCursor.value
              });
              gameCommentsCursor.continue();
            } else {
              resolve(results);
            }
          };

          query.onerror = function (error: any){
            reject(error);
          };

      });
  }

}