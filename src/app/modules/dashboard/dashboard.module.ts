import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from '../../../shared/components/file-upload';
import { ProgressComponent, ProgressDemoComponent } from '../../../shared/components/progress';
import { SelectComponent } from '../../../shared/components/select/select.component';
import {
  SliderComponent,
  SliderDemoComponent,
} from '../../../shared/components/slider';
import { TooltipDirective } from '../../../shared/directives/tooltip.directive';
import { AiVideoComponent } from './ai-video/ai-video.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialToVideoComponent } from './material-to-video/material-to-video.component';
import { SelectAvatarComponent } from './material-to-video/select-avatar/select-avatar.component';
import { ProductAnyShotComponent } from './product-any-shot/product-any-shot.component';
import { ProductAvatarComponent } from './product-avatar/product-avatar.component';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';
import { SelectTemplateComponent } from "./select-template/select-template.component";
import { NgOptimizedImage } from '@angular/common';
import { ResizeObserverDirective } from '../../../shared/components/directive/resize-observer.directive';
@NgModule({
  declarations: [
    HomeComponent,
    MaterialToVideoComponent,
    SelectAvatarComponent,
    ProductAnyShotComponent,
    AiVideoComponent,
    ProductAvatarComponent,
    SelectTemplateComponent,
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
    ProgressComponent,
    ProgressDemoComponent,
    DrawerComponent,
    NgOptimizedImage,
    ResizeObserverDirective
],
})
export class DashboardModule { }
