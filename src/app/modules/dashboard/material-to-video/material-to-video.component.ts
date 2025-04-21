import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard-layout/dashboard.service';

@Component({
  selector: 'app-material-to-video',
  standalone: true,
  imports: [],
  templateUrl: './material-to-video.component.html',
  styleUrl: './material-to-video.component.scss',
})
export class MaterialToVideoComponent {
  constructor(
    activatedRoute: ActivatedRoute,
    dashboardService: DashboardService
  ) {
    dashboardService.title$.next('Material to Video');
  }
}
