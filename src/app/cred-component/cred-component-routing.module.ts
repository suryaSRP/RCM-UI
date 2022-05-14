import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule } from '../app.module.material';
import { DynamicFieldsModule } from '../common/dynamic-fields/dynamic-fields.module';
import { ModalModule } from '../common/modal/modal/modal.module';
import { clientDetailResolver } from '../common/resolver/baseComponent-resolver';
import { LayoutsModule } from '../layouts/layouts/layouts.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // { path: '', redirectTo: '/:clntId/login', pathMatch: 'full' },
  {
    path: ':clntId/login', component: LoginComponent,
    resolve: { clientResolver: clientDetailResolver }
  },
  { path: 'register', component: RegisterComponent },];

@NgModule({
  declarations:[
    LoginComponent,
    RegisterComponent,],
  imports: [RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LayoutsModule,
    HttpClientModule,
    MatToolbarModule,
    AppMaterialModule,
    ModalModule,
    DynamicFieldsModule],
  exports: [RouterModule]
})
export class CredComponentRoutingModule { }
