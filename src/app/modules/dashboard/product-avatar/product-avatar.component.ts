import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-product-avatar',
  templateUrl: './product-avatar.component.html',
  styleUrl: './product-avatar.component.scss',
})
export class ProductAvatarComponent implements OnInit {
  data: any = [];
  selectedCategoryIndex: any = undefined;
  productList: any = [];
  selectedAvatarIndex: any = 0;
  selectedAvatar: any = '';
  objectMaskImageInfo: { x: number; y: number; width: number; height: number } =
    { x: 0, y: 0, width: 0, height: 0 };
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.dashboardService.title$.next('Product Avatar');
  }
  ngOnInit(): void {
    this.initData();
  }

  redirectToDashboard() {
    this.router.navigate([ROUTER_UTILS.DASHBOARD.getHome()]);
  }

  initData() {
    this.apiService.getProductCategory().subscribe((res) => {
      this.data = res as any[];
      this.productList = this.data.map((item: any) => item.products).flat();
      this.selectedAvatar = this.productList[0];
      this.selectedAvatarIndex = 0;
      this.setPositionProductAvatar(this.selectedAvatar?.objectMaskImageInfo);
    });
  }

  selectCategory(index?: any) {
    if (index === undefined) {
      this.selectedCategoryIndex = undefined;
      this.productList = this.data.map((item: any) => item.products).flat();
      return;
    }
    this.selectedCategoryIndex = index;
    this.productList = this.data[index]?.products ?? [];
  }

  selectAvatar(avatar: any) {
    this.selectedAvatarIndex = avatar;
    this.selectedAvatar = this.productList[avatar];
    this.setPositionProductAvatar(this.selectedAvatar?.objectMaskImageInfo);
  }

  setPositionProductAvatar(data: string) {
    const parse = JSON.parse(data);
    this.objectMaskImageInfo = {
      x: parse.x * 100,
      y: parse.y * 100,
      width: parse.w * 100,
      height: parse.h * 100,
    };
  }
}
