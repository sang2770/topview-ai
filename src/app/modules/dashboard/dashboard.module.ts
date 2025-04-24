import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { MaterialToVideoComponent } from './material-to-video/material-to-video.component';
import { TooltipDirective } from '../../../shared/directives/tooltip.directive';
import { SelectAvatarComponent } from './material-to-video/select-avatar/select-avatar.component';
import { ExampleModalContentComponent, ModalDemoComponent } from '../../../shared/components/modal';

@NgModule({
  declarations: [HomeComponent, MaterialToVideoComponent, SelectAvatarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SelectComponent,
    TooltipDirective,
    ModalDemoComponent,
    ExampleModalContentComponent
  ],
})
export class DashboardModule {}
