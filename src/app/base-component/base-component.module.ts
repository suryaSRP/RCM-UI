import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from '../common/pipes/search.pipe';
import { LayoutsModule } from '../layouts/layouts/layouts.module';
import { BaseComponentRoutingModule } from './base-component-routing.module';
import { BaseComponentComponent } from './base-component.component';
import { BaseStructureComponent } from './base-structure/base-structure.component';



@NgModule({
  declarations: [
    BaseStructureComponent,
    SearchPipe,
    BaseComponentComponent,
  ],
  imports: [
    CommonModule,
    BaseComponentRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    LayoutsModule,
  ],
  exports: [
    BaseStructureComponent
  ]
})
export class BaseComponentModule { }
