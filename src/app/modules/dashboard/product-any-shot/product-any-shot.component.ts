import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { DashboardService } from '../dashboard-layout/dashboard.service';

@Component({
  selector: 'app-product-any-shot',
  templateUrl: './product-any-shot.component.html',
  styleUrl: './product-any-shot.component.scss',
})
export class ProductAnyShotComponent implements OnInit {
  customMarks = [
    { value: 0, label: '1' },
    { value: 25, label: '2' },
    { value: 50, label: '3' },
    { value: 75, label: '4' },
    { value: 100, label: '5' },
  ];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.dashboardService.title$.next('Product Avatar');
  }
  ngOnInit(): void {}

  redirectToDashboard() {
    this.router.navigate([ROUTER_UTILS.DASHBOARD.getHome()]);
  }
}
