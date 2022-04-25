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
  public ClientName: any=localStorage.getItem("clientName")
  public userLoggedin: boolean = false
  constructor(public authService: AuthService, private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,) {
  }


  ngOnInit(): void {
    this.userLoggedin = (this.authService.isLoggedIn() == true) ? true : false
    console.log(this.authService.isLoggedIn(), "this.authService.isLoggedIn()")

    console.log(this.route.snapshot,"this.route.snapshot.paramMap")
  }
  logout() {
    this.authService.logout()
  }
}
