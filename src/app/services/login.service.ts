import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) {}

  userExists(subId: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/verify/${subId}`);
  }
}
