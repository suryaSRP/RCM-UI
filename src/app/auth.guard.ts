import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
      if(sessionStorage.getItem("isUserLoggedIn")){
        return true
      }
      var clientname = localStorage.getItem("clientCd")
      this.router.navigate([`/${clientname}/login`])
  }

}
