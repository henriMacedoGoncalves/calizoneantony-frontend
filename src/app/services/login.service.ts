import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticatedInSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedInSubject.asObservable();

  login() {
    this.isAuthenticatedInSubject.next(true);
  }

  logout() {
    this.isAuthenticatedInSubject.next(false);
  }
}
