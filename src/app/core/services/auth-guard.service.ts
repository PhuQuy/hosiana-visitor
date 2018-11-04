import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '@core/store/app.states';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isAuthenticated = false;

  constructor(private store: Store<any>) {
    this.store.select(selectAuthState).subscribe(auth => {
    });
  }
  canActivate(): boolean {
    return this.isAuthenticated;
  }
}
