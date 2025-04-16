import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogComponent } from 'src/app/common/modal/mat-dialog/mat-dialog.component';
import { credService } from 'src/app/services/credService.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  public clientCode: any = localStorage.getItem("clientCd");
  public ClientName: any = localStorage.getItem("clientName")
  public userName: any = localStorage.getItem("username")
  public userLoggedin: boolean = false
  public imagePath: any = "src/assets/images/clientImages/starkindustries.png";
  public loggedInRole: any = localStorage.getItem('role');
  constructor(public credServices: credService, private route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'my-star-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/my-star-icon.svg'));
  }


  ngOnInit(): void {
    console.log(this.loggedInRole, "loggedInRoleloggedInRoleloggedInRoleloggedInRole")
    this.userLoggedin = (this.credServices.isLoggedIn() == true) ? true : false
    console.log(this.credServices.isLoggedIn(), "this.credServices.isLoggedIn()")

    console.log(this.route.snapshot, "this.route.snapshot.paramMap")
  }
  logout() {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '750px',
      data: {
        title: "Logout", showas: 'dialog',
        action: ["Logout", "cancel"],
        pageAction: "logout"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result,"reukltttt")
      if (result) {

        this.credServices.logout()
      }
    });
  }
  toBase() {
    if (this.userLoggedin) {
      this.router.navigate([`/${this.clientCode}/base`])
    }
  }
  toDashboard(){
    if (this.userLoggedin) {
      this.router.navigate([`/${this.clientCode}/dboard`])
    }
  }
  toBillRequest(){
    if (this.userLoggedin) {
      this.router.navigate([`/${this.clientCode}/billRequest`])
    }
  }
  toInventory(){
    if (this.userLoggedin) {
      this.router.navigate([`/${this.clientCode}/inventory`])
    }
  }
  todaySchedule() {
    if (this.userLoggedin) {
      this.router.navigate([`/${this.clientCode}/todaySchedule`])
    }
  }
  navigateTo(navTo: any) {
    if (this.userLoggedin) {
      this.router.navigate([`/${this.clientCode}/${navTo}`])
    }

  }
  showNotification() {
    alert('No Notification')
  }
  contactUs() {
    alert('You Have contacted ADMIN')
  }
  billingRequest(){
    if (this.userLoggedin) {
      this.router.navigate([`/${this.clientCode}/base`])
    }
  }
}
