import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { credService } from 'src/app/services/credService.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  currentUser: Object = {};

  constructor(
    public credServices: credService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.credServices.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    })
  }

  ngOnInit() { }
}
