import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getAccessToken();
        console.log(accessToken,"accessToken_auth_service")
        req = req.clone({
            setHeaders: {
                Authorization: `JWT ${accessToken}`,
                "clientsid":`${localStorage.getItem("clientCd")};${localStorage.getItem("userLoggedIn")};${localStorage.getItem("role")}`
            }
        });
        return next.handle(req);
    }
}
