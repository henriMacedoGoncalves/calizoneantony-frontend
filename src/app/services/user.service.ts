import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  get authUser() {
    return this.authService.user$;
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated$;
  }

  login() {
    this.authService.loginWithRedirect({
      appState: { target: '/overview' },
    });
  }

  logout() {
    this.authService.logout();
  }

  userExists(subId: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/verify/${subId}`);
  }
}
