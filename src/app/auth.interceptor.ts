import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { credService } from "./services/credService.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private credServices: credService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.credServices.getAccessToken();
        console.log(accessToken,"accessToken_auth_service")
        req = req.clone({
            setHeaders: {
                Authorization: `JWT ${accessToken}`,
                "userId": `${localStorage.getItem("userLoggedIn")}`,
                "role": `${localStorage.getItem("role")}`,
                "clientsid":`${localStorage.getItem("clientCd")}`,
            }
        });
        return next.handle(req);
    }
}
