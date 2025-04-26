import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ROUTER_UTILS } from '../../../shared/constants/router-utils';
import { MaterialToVideoComponent } from './material-to-video/material-to-video.component';
import { ProductAnyShotComponent } from './product-any-shot/product-any-shot.component';
import { AiVideoComponent } from './ai-video/ai-video.component';
import { ProductAvatarComponent } from './product-avatar/product-avatar.component';

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
  {
    path: ROUTER_UTILS.DASHBOARD.productAnyShot,
    component: ProductAnyShotComponent,
  },
  {
    path: ROUTER_UTILS.DASHBOARD.productAvatar,
    component: ProductAvatarComponent,
  },
  {
    path: ROUTER_UTILS.DASHBOARD.aiVideo,
    component: AiVideoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
