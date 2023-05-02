import { Injectable } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})

export class credService {
  API_URL: string = 'http://localhost:8081';
  headers = new HttpHeaders({ 'Content-Type': 'application/json', "clientsid": `${localStorage.getItem("clientCd")}` })
  currentUser = {};

  constructor(private httpClient: HttpClient,
    public router: Router,
    private route: ActivatedRoute) { }

  register(user: User): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/api/auth/signup`, user).pipe(
      catchError(this.handleError)
    )
  }
  getClntDtls(clntId: any): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/getClientDtls/${clntId}`, { headers: this.headers })
  }

  companyData(user: any): Observable<any> {
    console.log("cmpany services hitted")
    return this.httpClient.get(`${this.API_URL}/api/companyDtls`, { headers: this.headers })
  }
  login(user: User) {
    return this.httpClient.post<any>(`${this.API_URL}/api/auth/signin`, user)
      .subscribe((res: any) => {
        let loginResult = res.result
        localStorage.setItem('access_token', loginResult.token ? loginResult.token : loginResult.accessToken)
        localStorage.setItem("userLoggedIn", loginResult.email)
        localStorage.setItem("role", loginResult.roles)
        sessionStorage.setItem("isUserLoggedIn", "true")
        sessionStorage.setItem("username", loginResult.username)
        localStorage.setItem("username", loginResult.username)
        localStorage.setItem("ee_id", loginResult.ee_id)
        sessionStorage.setItem("ee_id", loginResult.ee_id)
        var clientname = localStorage.getItem("clientCd")
        console.log(`/${clientname}/dboard`, "routessssssssssss")
        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        //   console.log(this.currentUser, "this.currentUserthis.currentUserthis.currentUser")
        //   // this.router.navigate(['users/profile/' + res.msg._id]);
        //   this.router.navigate(['company'])
        // })
        this.router.navigate([`/${clientname}/dboard`])
      })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): any {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    console.log(localStorage.getItem("clientCd"), "this.route.snapshot.paramMap")
    var clientLogged = localStorage.getItem("clientCd")
    if (localStorage.removeItem('access_token') == null) {
      sessionStorage.setItem("isUserLoggedIn", "false")
      this.router.navigate([`${clientLogged}/login`]);
    }
  }

  getUserProfile(id: any): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers }).pipe(map((res: any) => {
      return res || {}
    }),
      catchError(this.handleError)
    )
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
