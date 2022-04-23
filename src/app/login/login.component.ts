import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public clientCode: any;
  public knownClient: boolean = false;
  public clientDetails: any;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router, private route: ActivatedRoute
  ) {
    this.clientCode = this.route.snapshot.paramMap.get('clntId')
    console.log(this.clientCode, "client_code")
  }

  ngOnInit() {
    this.clientDetails = this.route.snapshot.data['clientResolver'].data
    this.knownClient = this.clientDetails.length > 0 ? true : false
    localStorage.setItem('clientCd', this.clientDetails.length > 0 ? this.clientDetails[0]["clientCd"] : "NoClient");
    localStorage.setItem('clientId', this.clientDetails.length > 0 ? this.clientDetails[0]["clientId"] : "NoClient");
    localStorage.setItem('clientName', this.clientDetails.length > 0 ? this.clientDetails[0]["clientName"] : "NoClient");
    this.loginForm = this.formBuilder.group({
      clientCD: new FormControl((this.knownClient == true) ? this.clientCode : "", [Validators.required]),
      userID: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  loginUser() {
    console.log(this.loginForm, "this.loginFormthis.loginFormthis.loginFormthis.loginForm")
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
    }
  }
}
