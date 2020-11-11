
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class AppService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    get(url): Observable<any>{
        return this.httpClient
            .get(url)
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }
   
    protected handleError(error: any) {
        const details = error.json();
        let message = 'Interner Server error.';
        if (details.message) {
            message = details.message;
        } else if (details[0] && details[0].message) {
            message = details[0].message;
        } else {
            if (error.status === 404) {
                message = 'Backend Server not respond';
            }
            if (error.status === 401) {
                message = 'User is not authenticated';
            } else {
                if (error.status === 0 && !error.statusText) {
                    message = 'internal server error';
                } else {
                    message = (error.message) ? error.message : (error.status) ? `${error.status} - ${error.statusText}` : message;
                }
            }
        }
        if (message === 'Read timed out') {
            message = 'Read timed out';
        }
        return throwError(error);
    }
}