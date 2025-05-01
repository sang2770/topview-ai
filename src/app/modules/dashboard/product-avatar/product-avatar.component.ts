import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { ApiService } from '../../../../shared/services/api.service';
import { PopupConfirmService } from '../../../../shared/components/popup-confirm/popup-confirm.service';
import { URL_HANDLER } from '../../../../shared/constants/api';
import { ElementRef, ViewChild } from '@angular/core';

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
    private apiService: ApiService,
    private popupService: PopupConfirmService
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

  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImage: string | null = null;

  replaceWithMyProductImage() {
    // Create a hidden file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }

  generate() {
    this.popupService
      .progress({
        // title: 'Generating Product Avatar',
        message: 'Product Avatar Generated Successfully!',
        pendingMessage: 'Generating...',
        confirmText: 'Export',
        imagePreview: 'https://d1735p3aqhycef.cloudfront.net/' + this.selectedAvatar.avatarImagePath,
      })
      .afterClosed$.subscribe(() => {
        this.router.navigate([URL_HANDLER['PRODUCT_AVATAR_URL']]).then();
      });
  }
}
