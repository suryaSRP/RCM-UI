import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';


@Injectable({
  providedIn: 'root'
})
export class clientDetailResolver implements Resolve<any> {
  clientCode: any;
  constructor(
    public authService: AuthService,
    public router: Router, private route: ActivatedRoute) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('Called Get Product in resolver...',localStorage.getItem("clientCd"));
    this.clientCode =localStorage.getItem("clientCd")!=="NoClient"?localStorage.getItem("clientCd"):window.location.href.split("/")[3]
    console.log(this.clientCode,"this.clientCode on resolver",this.route.snapshot.paramMap)
    return this.authService.getClntDtls(this.clientCode).pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
