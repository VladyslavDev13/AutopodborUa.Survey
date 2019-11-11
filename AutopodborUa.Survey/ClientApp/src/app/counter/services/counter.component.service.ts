import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CounterService {

    constructor(private http: HttpClient) {
    }

    getClaims(baseUrl: string): Observable<string[]> {
        return this.http.get<string[]>(`${baseUrl}/claims`);
    }
}
