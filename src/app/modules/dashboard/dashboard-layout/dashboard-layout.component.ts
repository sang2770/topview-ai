import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, throttleTime } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit {
  title: string | null = null;
  isShowSidebar = true;
  constructor(private DashboardService: DashboardService) {}
  ngOnInit(): void {
    this.DashboardService.title.subscribe((title) => {
      this.title = title;
      this.isShowSidebar = !title;
    });
  }
}
