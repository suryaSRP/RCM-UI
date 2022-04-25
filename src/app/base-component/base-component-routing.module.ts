import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { BaseStructureComponent } from './base-structure/base-structure.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dboard', pathMatch: 'full' },
  {
    path: "dboard",
    component: DashboardComponent, canActivate: [AuthGuard]
  },{
    path: "base",
    component: BaseStructureComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseComponentRoutingModule { }
