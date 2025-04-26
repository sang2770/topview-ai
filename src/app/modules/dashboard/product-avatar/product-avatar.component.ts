import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';

@Component({
  selector: 'app-product-avatar',
  templateUrl: './product-avatar.component.html',
  styleUrl: './product-avatar.component.scss',
})
export class ProductAvatarComponent implements OnInit {
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
