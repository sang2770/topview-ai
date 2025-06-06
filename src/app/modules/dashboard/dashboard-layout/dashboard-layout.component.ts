import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, throttleTime } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { ModalService } from '../../../../shared/components/modal';
import { TutorialComponent } from '../../../../shared/components/tutorial/tutorial.component';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit {
  readonly ROUTER_UTILS = ROUTER_UTILS;
  title: string | null = null;
  isShowSidebar = true;
  constructor(
    private DashboardService: DashboardService,
    private router: Router,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.DashboardService.title.subscribe((title) => {
      this.title = title;
      this.isShowSidebar = !title;
    });

    // this.router.events.subscribe(() => {
    //   this.modalService.closeAll();
    // })
  }

  redirtectTo(route: string) {
    this.router.navigate([route]);
  }

  isShowOptions() {
    return this.title === 'Product Avatar' ? true : false;
  }

  openTutorial() {
    this.modalService.open(
      TutorialComponent,
      {
        title: 'Tutorial',
        centered: true,
        size: 'lg',
        data: {
          type: this.title
        }
      }
    ).afterClosed$.subscribe();
  }
}
