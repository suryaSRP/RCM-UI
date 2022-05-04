import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule } from 'src/app/app.module.material';
import { LayoutsRoutingModule } from 'src/app/layouts/layouts/layouts-routing.module';



@NgModule({
  declarations: [MatDialogComponent],
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
  exports:[MatDialogComponent]
})
export class ModalModule { }
