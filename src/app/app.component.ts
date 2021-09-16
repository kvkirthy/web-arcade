import { Component } from '@angular/core';
import { SwCommunicationService } from 'src/app/common/sw-communication.service';
import { IdbStorageAccessService } from './common/idb-storage-access.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'web-arcade';

  constructor(private commSvc: SwCommunicationService){
  }
}
