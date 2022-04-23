import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { clientDetailResolver } from './common/resolver/baseComponent-resolver';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/:clntId/login', pathMatch: 'full' },
  { path: ':clntId/login', component: LoginComponent,
  resolve: { clientResolver: clientDetailResolver } },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
