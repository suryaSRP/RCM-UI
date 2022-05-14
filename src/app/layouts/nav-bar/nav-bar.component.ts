import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { credService } from 'src/app/services/credService.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public clientCode: any=localStorage.getItem("clientCd");
  public ClientName: any=localStorage.getItem("clientName")
  public userLoggedin: boolean = false
  constructor(public credServices: credService, private route: ActivatedRoute,
    public router: Router,) {
  }


  ngOnInit(): void {
    this.userLoggedin = (this.credServices.isLoggedIn() == true) ? true : false
    console.log(this.credServices.isLoggedIn(), "this.credServices.isLoggedIn()")

    console.log(this.route.snapshot,"this.route.snapshot.paramMap")
  }
  logout() {
    this.credServices.logout()
  }
  toBase(){
    if(this.userLoggedin){
      this.router.navigate([`/${this.clientCode}/base`])
    }
  }
}
