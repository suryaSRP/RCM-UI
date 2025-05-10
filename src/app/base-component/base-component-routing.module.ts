import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { BaseStructureComponent } from './base-structure/base-structure.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeManagementComponent } from '../employee-management/employee-management.component';
import { EventManagementComponent } from '../event-management/event-management.component';
import { InventoryComponent } from './inventory/inventory.component';
import { BillGeneratorComponent } from './bill-generator/bill-generator.component';
import { InventoryProductComponent } from './inventory/inventory-product/inventory-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'dboard', pathMatch: 'full' },
  {
    path: "dboard",
    component: DashboardComponent,
  }, {
    path: "base",
    component: BaseStructureComponent,
  }, {
    path: "schedule",
    component: EventManagementComponent,
  }, {
    path: "empDetails",
    component: EmployeeManagementComponent,
  }, {
    path: 'inventory',
    component: InventoryComponent
  }, {
    path: 'billRequest',
    component: BillGeneratorComponent
  },
  {
    path: 'product',
    component: InventoryProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseComponentRoutingModule { }
