import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  API_URL: string = 'http://localhost:8081';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,
    public router: Router,
    private route: ActivatedRoute) { }

    prsnMenuDtls(user: any): Observable<any> {
    console.log("cmpany services hitted")
    return this.httpClient.get(`${this.API_URL}/api/prsnMenuDtls`, { headers: this.headers })
  }
  pstnDtls(orgId: any): Observable<any> {
    console.log("cmpany services hitted")
    return this.httpClient.get(`${this.API_URL}/api/pstnDtls/${orgId}`, { headers: this.headers })
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
