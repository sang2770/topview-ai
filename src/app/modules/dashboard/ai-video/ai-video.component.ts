import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { PopupConfirmService } from '../../../../shared/components/popup-confirm/popup-confirm.service';
import { URL_HANDLER } from '../../../../shared/constants/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ai-video',
  templateUrl: './ai-video.component.html',
  styleUrl: './ai-video.component.scss',
})
export class AiVideoComponent implements OnInit {
  selectedType: any = null;
  selectedTab: any = 'Text';
  aspectSelected = '9:16';
  count = 25;
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
    private router: Router,
    private popupConfirmService: PopupConfirmService,
    private translateService: TranslateService
  ) {
    this.dashboardService.title$.next('AI Creation');
  }
  ngOnInit(): void {}

  redirectToDashboard() {
    this.router.navigate([ROUTER_UTILS.DASHBOARD.getHome()]);
  }

  selectAspect(text: string) {
    this.aspectSelected = text;
  }

  getCount(): string {
    return this.customMarks.find(item => item.value === this.count)?.label ?? "";
  }

  generate() {
    this.popupConfirmService.progress({
      // title: "Generate AI Video",
      size: 'lg',
      pendingMessage: "Your creation is brewing! Enjoy a coffee break while we finalize it. Video AI spinning magic, even when you leave the page.",
      message: "Generate Completed! You can check and export",
      confirmText: this.translateService.instant('export'),
    }).afterClosed$.subscribe((res) => {
      if (!res || !URL_HANDLER['AI_VIDEO']) return;
      window.location.href = URL_HANDLER['AI_VIDEO'];
    });
  }
}
