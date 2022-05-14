import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  {
    path: ":client",
    loadChildren: () => import('../app/base-component/base-component-routing.module').then(x => x.BaseComponentRoutingModule),
     canActivate: [AuthService]
  },
];
const credRoutes: Routes = [
  {
    path: "",
    loadChildren: () => import('../app/cred-component/cred-component.module').then(x => x.CredComponentModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),],
  exports: [RouterModule]
})

export class AppRoutingModule { }
