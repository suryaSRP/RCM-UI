import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { credService } from 'src/app/services/credService.service';


@Injectable({
  providedIn: 'root'
})
export class clientDetailResolver implements Resolve<any> {
  clientCode: any;
  constructor(
    public credServices: credService,
    public router: Router, private route: ActivatedRoute) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('Called Get Product in resolver...', localStorage.getItem("clientCd"));
    this.clientCode = (localStorage.getItem("clientCd") !== "NoClient" && localStorage.getItem("clientCd") === window.location.href.split("/")[4]) ? localStorage.getItem("clientCd") : window.location.href.split("/")[4]
    console.log(this.clientCode, "this.clientCode on resolver", this.route.snapshot.paramMap)
    return this.credServices.getClntDtls(this.clientCode).pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
