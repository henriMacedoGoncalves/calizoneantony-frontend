import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OnlineCoaching } from '../common/online-coaching';

@Injectable({
  providedIn: 'root',
})
export class OnlineCoachingService {
  private baseUrl = 'http://localhost:8080/api/onlineCoachings';

  constructor(private httpClient: HttpClient) {}

  getOnlineCoachings(): Observable<OnlineCoaching[]> {
    return this.httpClient
      .get<GetResponseOnlineCoachings>(this.baseUrl)
      .pipe(map((response) => response._embedded.onlineCoachings));
  }
}

interface GetResponseOnlineCoachings {
  _embedded: {
    onlineCoachings: OnlineCoaching[];
  };
}
