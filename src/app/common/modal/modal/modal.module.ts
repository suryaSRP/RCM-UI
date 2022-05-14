import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule } from 'src/app/app.module.material';
import { LayoutsRoutingModule } from 'src/app/layouts/layouts/layouts-routing.module';
import { DynamicFieldsComponent } from '../../dynamic-fields/dynamic-fields.component';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';



@NgModule({
  declarations: [MatDialogComponent,DynamicFieldsComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatToolbarModule,
    AppMaterialModule
  ],
  exports:[MatDialogComponent,DynamicFieldsComponent]
})
export class ModalModule { }
