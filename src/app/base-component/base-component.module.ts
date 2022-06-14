import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { AppMaterialModule } from '../app.module.material';
import { DynamicFieldsModule } from '../common/dynamic-fields/dynamic-fields.module';
import { ModalModule } from '../common/modal/modal/modal.module';
import { OrderByPipe } from '../common/pipes/order-by.pipe';
import { SearchPipe } from '../common/pipes/search.pipe';
import { LayoutsModule } from '../layouts/layouts/layouts.module';
import { BaseComponentRoutingModule } from './base-component-routing.module';
import { BaseComponentComponent } from './base-component.component';
import { BaseStructureComponent } from './base-structure/base-structure.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    BaseStructureComponent,
    BaseComponentComponent,
    DashboardComponent,
    SearchPipe,
    OrderByPipe,
  ],
  imports: [
    CommonModule,
    BaseComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LayoutsModule,
    HttpClientModule,
    MatToolbarModule,
    AppMaterialModule,
    ModalModule,
    DynamicFieldsModule,NgPipesModule
  ],
  exports: [
    BaseStructureComponent
  ]
})
export class BaseComponentModule { }
