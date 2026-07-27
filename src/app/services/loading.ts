import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false);
  isServerOffline$ = new BehaviorSubject<boolean>(false);

  show() {
    this.isLoading$.next(true);
  }

  hide() {
    this.isLoading$.next(false);
  }

  setServerOffline(status: boolean) {
    this.isServerOffline$.next(status);
  }
}