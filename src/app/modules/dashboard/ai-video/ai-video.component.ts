import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';

@Component({
  selector: 'app-ai-video',
  templateUrl: './ai-video.component.html',
  styleUrl: './ai-video.component.scss',
})
export class AiVideoComponent implements OnInit {
  selectedType: any = null;
  selectedTab: any = 'Text';
  customMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 25,
      label: '1',
    },
    {
      value: 50,
      label: '2',
    },
    {
      value: 75,
      label: '3',
    },
    {
      value: 100,
      label: '4',
    },
  ];

  typeList = [
    {
      value: 1,
      label: 'Video',
    },
    {
      value: 2,
      label: 'Image',
    },
    {
      value: null,
      label: 'All',
    },
  ];
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.dashboardService.title$.next('AI Creation');
  }
  ngOnInit(): void {}

  redirectToDashboard() {
    this.router.navigate([ROUTER_UTILS.DASHBOARD.getHome()]);
  }
}
