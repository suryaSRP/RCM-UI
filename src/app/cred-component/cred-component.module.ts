import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule } from '../app.module.material';
import { BaseComponentRoutingModule } from '../base-component/base-component-routing.module';
import { DynamicFieldsModule } from '../common/dynamic-fields/dynamic-fields.module';
import { ModalModule } from '../common/modal/modal/modal.module';
import { OrderByPipe } from '../common/pipes/order-by.pipe';
import { SearchPipe } from '../common/pipes/search.pipe';
import { LayoutsModule } from '../layouts/layouts/layouts.module';
import { CredComponentRoutingModule } from './cred-component-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [],
  imports: [],
  exports: [CredComponentRoutingModule]
})
export class CredComponentModule { }
