import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule } from '../app.module.material';
import { SearchPipe } from '../common/pipes/search.pipe';
import { LayoutsModule } from '../layouts/layouts/layouts.module';
import { BaseComponentRoutingModule } from './base-component-routing.module';
import { BaseComponentComponent } from './base-component.component';
import { BaseStructureComponent } from './base-structure/base-structure.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    BaseStructureComponent,
    SearchPipe,
    BaseComponentComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    BaseComponentRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    LayoutsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppMaterialModule
  ],
  exports: [
    BaseStructureComponent
  ]
})
export class BaseComponentModule { }
