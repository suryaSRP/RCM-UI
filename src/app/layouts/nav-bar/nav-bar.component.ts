import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { credService } from 'src/app/services/credService.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public clientCode: any;
  public ClientName: any=localStorage.getItem("clientName")
  public userLoggedin: boolean = false
  constructor(public credServices: credService, private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,) {
  }


  ngOnInit(): void {
    this.userLoggedin = (this.credServices.isLoggedIn() == true) ? true : false
    console.log(this.credServices.isLoggedIn(), "this.credServices.isLoggedIn()")

    console.log(this.route.snapshot,"this.route.snapshot.paramMap")
  }
  logout() {
    this.credServices.logout()
  }
}
