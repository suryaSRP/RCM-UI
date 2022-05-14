import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    public router: Router
  ) { }
  canActivate(): any {
    if (sessionStorage.getItem("isUserLoggedIn") == "true") {
      console.log(sessionStorage.getItem("isUserLoggedIn"),'sessionStorage.getItem("isUserLoggedIn")')
      return true
    }
    var clientname = localStorage.getItem("clientCd")
    console.log("canActivate hitted and logged off")
    this.router.navigate([`/${clientname}/login`])
    return false
  }

}
