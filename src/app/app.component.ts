import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'R-C-M';
  public clientCode: any;
  public clientDetails: any
  public userLoggedin: boolean = false
  constructor(public authService: AuthService, private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,) {
    this.getClientDtls(window.location.href.split("/")[3])
  }
  ngOnInit(): void {
    this.userLoggedin = (this.authService.isLoggedIn() == true) ? true : false
    console.log(this.authService.isLoggedIn(), "this.authService.isLoggedIn()")
  }
  getClientDtls(clientId: any) {
    this.authService.getClntDtls(clientId).subscribe((resp: any) => {
      this.clientDetails = (resp.data.length > 0) ? resp.data[0] : {}
      console.log(this.clientDetails, "client details on app component")
    })
  }
  logout() {
    this.authService.logout()
  }
}
