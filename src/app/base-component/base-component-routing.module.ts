import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseStructureComponent } from './base-structure/base-structure.component';

const routes: Routes = [
  {
    path: "company",
    component: BaseStructureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseComponentRoutingModule { }
