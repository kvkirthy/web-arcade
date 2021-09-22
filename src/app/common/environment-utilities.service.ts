import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUtilitiesService {

  isOnline = new Subject<boolean>()

  constructor() { 
    addEventListener("online", (event) => {
      this.isOnline.next(true);
    });
    addEventListener("offline", (event) => {
      this.isOnline.next(false);
    });
  }

  get IsOnline(){
    return this.isOnline.asObservable();
  }

}
