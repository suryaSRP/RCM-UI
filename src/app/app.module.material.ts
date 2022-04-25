import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatChipsModule,
    MatOptionModule, MatGridListModule,
    MatProgressBarModule, MatSliderModule,
    MatSlideToggleModule, MatMenuModule,
    MatDialogModule, MatSnackBarModule, MatSelectModule,
    MatInputModule, MatSidenavModule, MatCardModule,
    MatIconModule, MatRadioModule, MatProgressSpinnerModule,
    MatTabsModule, MatListModule, MatExpansionModule],
  exports: [
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatChipsModule,
    MatOptionModule, MatGridListModule,
    MatProgressBarModule, MatSliderModule,
    MatSlideToggleModule, MatMenuModule,
    MatDialogModule, MatSnackBarModule,
    MatSelectModule, MatInputModule,
    MatSidenavModule, MatCardModule,
    MatIconModule, MatRadioModule,
    MatProgressSpinnerModule, MatTabsModule,
    MatListModule,MatExpansionModule
  ],
})
export class AppMaterialModule { }
