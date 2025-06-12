import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ebook } from '../common/ebook';
import { EbookPage } from '../common/ebook-page';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  private baseUrl = 'http://localhost:8080/api/ebooks';

  constructor(private httpClient: HttpClient) {}

  getEbook(ebookId: number): Observable<Ebook> {
    const ebookUrl = `${this.baseUrl}/${ebookId}`;

    return this.httpClient.get<Ebook>(ebookUrl);
  }

  getEbooks(): Observable<Ebook[]> {
    return this.httpClient
      .get<GetResponseEbooks>(this.baseUrl)
      .pipe(map((response) => response._embedded.ebooks));
  }
}

interface GetResponseEbooks {
  _embedded: {
    ebooks: Ebook[];
  };
}

interface GetResponseEbookPages {
  _embedded: {
    ebookPages: EbookPage[];
  };
}
