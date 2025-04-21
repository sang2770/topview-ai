import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ROUTER_UTILS } from '../../../shared/constants/router-utils';
import { MaterialToVideoComponent } from './material-to-video/material-to-video.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.DASHBOARD.home,
    component: HomeComponent,
  },
  {
    path: ROUTER_UTILS.DASHBOARD.materialToVideo,
    component: MaterialToVideoComponent,
    data: {
      title: 'Materials to Video',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
