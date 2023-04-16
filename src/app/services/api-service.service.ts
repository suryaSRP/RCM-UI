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

  fetchFlds(pageInfo: any, pageAction: {}): Observable<any> {
    console.log(pageAction, "queryyyyyy")
    return this.httpClient.get(`${this.API_URL}/api/${pageInfo}/fetchFlds/${pageAction}`, { headers: this.headers })
  }
  createOrgPstn(pageInfo: any, formValue: any): Observable<any> {
    console.log("fetchFlds pageInfo services hitted")
    return this.httpClient.post(`${this.API_URL}/api/${pageInfo}/create`, formValue, { headers: this.headers })
  }
  updateOrgPstn(pageInfo: any, formValue: any,id:any): Observable<any> {
    console.log("fetchFlds pageInfo updateOrgPstn-services hitted")
    return this.httpClient.post(`${this.API_URL}/api/${pageInfo}/update/${id._id}`, formValue, { headers: this.headers })
  }
  getValueId(fetchDataBasedOn: any, fetchId: any): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/api/info/${fetchDataBasedOn}/${fetchId}`, { headers: this.headers })
  }
  deleteData(collectionName: any, dataID: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/api/deleteData/${collectionName}/${dataID}`, "", { headers: this.headers })
  }
}
