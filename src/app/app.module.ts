import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { DiceComponent } from './components/dice/dice.component';
import { IdbStorageAccessService } from './common/idb-storage-access.service';
import { DexieStorageAccessService } from './common/dexie-storage-access.service';
import { BoardGamesComponent } from './components/board-games/board-games.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { SwCommunicationService } from './common/sw-communication.service';

@NgModule({
  declarations: [
    AppComponent,
    DiceComponent,
    BoardGamesComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    IdbStorageAccessService,
    {
      provide: Window,
      useValue: window
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (svc: IdbStorageAccessService) => () => svc.init(),
      deps: [IdbStorageAccessService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (svc: DexieStorageAccessService) => () => svc.init(),
      deps: [DexieStorageAccessService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
