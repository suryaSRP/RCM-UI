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
  loginForm: FormGroup;
  public clientCode: any;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router, private route: ActivatedRoute
  ) {
    this.clientCode = this.route.snapshot.paramMap.get('clntId')
    console.log(this.clientCode,"client_code")
    this.loginForm = this.formBuilder.group({
      client_cd: new FormControl('RXN01', [Validators.required]),
      userID: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() { }

  loginUser() {
    console.log(this.loginForm, "this.loginForm_this.loginForm")
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
    }
  }
}
