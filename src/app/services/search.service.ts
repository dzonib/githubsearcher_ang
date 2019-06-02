import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  getRepos(argQuery: string, passedPage?: number): Observable<any> {
    const query = `?q=${argQuery}`;
    const page = `&page=${passedPage || 1}`;
    // console.log(`${this.url}${query}${page}`);
    return this.http.get(`${this.url}${query}&per_page=5${page}`);
  }
}
