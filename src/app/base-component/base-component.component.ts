import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { path } from '../utils/shared/constants';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss']
})
export class BaseComponentComponent implements OnInit {
  currentModule: string = '';
  modulePath: any = path;
  constructor(private route: ActivatedRoute,
      public router: Router,) { }

  ngOnInit(): void {
    this.currentModule = this.route.snapshot.routeConfig?.path || '';
    console.log(this.route.snapshot.routeConfig?.path, "paramss");
  }

}
