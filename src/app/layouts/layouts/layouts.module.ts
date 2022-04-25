import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponentRoutingModule } from 'src/app/base-component/base-component-routing.module';
import { BaseComponentModule } from 'src/app/base-component/base-component.module';
import { HeaderTabComponent } from '../header-tab/header-tab.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppMaterialModule } from 'src/app/app.module.material';


@NgModule({
  declarations: [
    NavBarComponent,
    HeaderTabComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    // BaseComponentModule,
    // BaseComponentRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppMaterialModule
  ],
  exports: [
    NavBarComponent,
    HeaderTabComponent
  ]
})
export class LayoutsModule { }
