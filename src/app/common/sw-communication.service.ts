import { first } from 'rxjs/operators';
import { concat, interval } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwCommunicationService {

  constructor(private updateSvc: SwUpdate,
    private snackbar: MatSnackBar,
    private appRef: ApplicationRef) {
      
    console.log('I\'ll verify if new version of the application is available');

    let isApplicationStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    let isReadyForVersionUpgrade$ = concat( isApplicationStable$, interval ( 12 * 60 * 60 * 1000));
    isReadyForVersionUpgrade$.subscribe( () => {
      console.log("checking for version upgrade...")
      this.updateSvc.checkForUpdate();
    });

    this.updateSvc.available.subscribe( i => {
      let message = i?.available?.appData as { "name": string };
      console.log('A new version of the application available', i.current, i.available);
      let snackRef = this.snackbar
        .open(`A new version of the app available. ${message.name}. Click to install the application`, "Install new version");
      snackRef
        .onAction()
        .subscribe (() => {
          console.log("Snackbar action performed");
          this.updateSvc.activateUpdate().then( () => {
            console.log("activate update invoked");
            window.location.reload();
          });
      });
    });
    this.updateSvc.activated.subscribe( i => console.log('A new version of the application activated', i.current, i.previous));
    this.updateSvc.unrecoverable.subscribe( i => {
      console.log('The application is unrecoverable', i.reason);
      let snackRef = this.snackbar
      .open(`We identified an error loading the application. Use the following reload button. If the error persists, clear cache and reload the application`, 
        "Reload");
    snackRef
      .onAction()
      .subscribe (() => {
        this.updateSvc.activateUpdate().then( () => {
          window.location.reload();
        });
     });
    });
  }
}
