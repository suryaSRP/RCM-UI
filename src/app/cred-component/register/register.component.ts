import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { credService } from 'src/app/services/credService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public credServices: credService,
    public router: Router
  ) {
    this.registerForm= this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  registerUser() {
    this.credServices.register(this.registerForm.value).subscribe((res) => {
      if (res.result) {
        this.registerForm.reset()
        this.router.navigate(['/asd/login']);
      }
    })
  }
}
