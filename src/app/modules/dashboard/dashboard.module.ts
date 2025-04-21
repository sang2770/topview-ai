import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { MaterialToVideoComponent } from './material-to-video/material-to-video.component';

@NgModule({
  declarations: [HomeComponent, MaterialToVideoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SelectComponent,
  ],
})
export class DashboardModule {}
