import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { MaterialToVideoComponent } from './material-to-video/material-to-video.component';
import { TooltipDirective } from '../../../shared/directives/tooltip.directive';
import { SelectAvatarComponent } from './material-to-video/select-avatar/select-avatar.component';
import {
  SliderComponent,
  SliderDemoComponent,
} from '../../../shared/components/slider';
import { ProductAnyShotComponent } from './product-any-shot/product-any-shot.component';
import { AiVideoComponent } from './ai-video/ai-video.component';
import { ProductAvatarComponent } from './product-avatar/product-avatar.component';
import { FileUploadDemoComponent } from '../../../shared/components/file-upload/file-upload-demo.component';
import { FileUploadComponent } from '../../../shared/components/file-upload';
import { ProgressComponent, ProgressDemoComponent } from '../../../shared/components/progress';

@NgModule({
  declarations: [
    HomeComponent,
    MaterialToVideoComponent,
    SelectAvatarComponent,
    ProductAnyShotComponent,
    AiVideoComponent,
    ProductAvatarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SelectComponent,
    TooltipDirective,
    SliderDemoComponent,
    SliderComponent,
    FileUploadComponent,
    ProgressComponent
  ],
})
export class DashboardModule {}
