import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GamesService } from './games.service';

@Injectable()
export class IdbStorageAccessService {

  idb = window.indexedDB;
  indexedDb: IDBDatabase;
  syncRemoteService$ = new Subject<boolean>();

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

    request.onerror = (error: any) => {
      console.error("Error opening IndexedDB", error);
    }

    request.onupgradeneeded = function(event: any){
      console.log("version upgrade event triggered");
      let dbRef = event.target.result;
      let objStore = dbRef
        .createObjectStore("gameComments", { autoIncrement: true })

      let idxCommentId = objStore.createIndex('IdxCommentId', 'commentId', {unique: true})
    };

    addEventListener("online", (event) => {
      let promise = this.getAllCachedComments();
      promise.then((result: any) => {
        if (Array.isArray(result)) {
          this.prepareCommentsToUpdate(result).then(
            r => {
              this
                .gameSvc
                .addBulkComments(r)
                .subscribe(
                  () => this.syncRemoteService$.next(true),
                  () => this.syncRemoteService$.next(false)
                )
            });
        }
      });
    });
  }

  get CommentsSyncObservable(): Observable<boolean>{
    return this.syncRemoteService$.asObservable();
  }

  private prepareCommentsToUpdate(result: Array<any>){
    return new Promise<any>((resolve) => {
      let comments: any[] = [];
      result?.map( (r: {key: number; value: any}, mapIndex: number) => {
        if (r.key) {
          comments.push({
            title: r.value.title, 
            userName: r.value.userName, 
            comments: r.value.comments, 
            gameId: r.value.gameId,
            timeCommented: new Date()
          });
          this.deleteComment(r.key)
        }
        if((mapIndex + 1) === result.length){ 
          resolve(comments);
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
    return new Promise( (resolve, reject) => {
      let deleteQuery = this.indexedDb
            .transaction("gameComments", "readwrite")
            .objectStore("gameComments")
            .delete(recordId);
      
      deleteQuery.onsuccess = (evt) => {
        console.log("delete successful", evt);
        resolve(true);
      }
      deleteQuery.onerror = (error) => {
        console.log("delete successful", error);
        reject(error);
      }
    });
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
