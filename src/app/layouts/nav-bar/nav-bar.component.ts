import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

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

    console.log(this.route.snapshot,"this.route.snapshot.paramMap")
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
