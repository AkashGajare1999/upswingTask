import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductChartComponent } from './product-chart/product-chart.component';

const routes: Routes = [
  { path: '', component: ProductChartComponent },
  { path: 'UserManagement', component: UserManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
