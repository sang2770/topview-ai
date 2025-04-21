import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '../shared/constants/router-utils';
import { DashboardLayoutComponent } from './modules/dashboard/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.DASHBOARD.root,
    component: DashboardLayoutComponent,
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '**',
    redirectTo: ROUTER_UTILS.DASHBOARD.getHome(),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
