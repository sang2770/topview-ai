import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { PopupConfirmService } from '../../../../shared/components/popup-confirm/popup-confirm.service';
import { URL_HANDLER } from '../../../../shared/constants/api';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../assets/environments/environment';

@Component({
  selector: 'app-product-any-shot',
  templateUrl: './product-any-shot.component.html',
  styleUrl: './product-any-shot.component.scss',
})
export class ProductAnyShotComponent implements OnInit {
  readonly SERVER_URL = environment.server;
  basicDrawerVisible = false;
  customMarks = [
    { value: 0, label: '1' },
    { value: 25, label: '2' },
    { value: 50, label: '3' },
    { value: 75, label: '4' },
    { value: 100, label: '5' },
  ];

  exampleList = [
    {
      id: 1,
      image: 'assets/images/sample_product_anyshot.png',
      thumbnail:
        'https://d1735p3aqhycef.cloudfront.net/aigc-web/public/product-anyfit/sample/clothes_product_compress_image.jpg',
      name: 'clothes',
    },
    {
      id: 2,
      image:
        'https://d1735p3aqhycef.cloudfront.net/aigc-web/public/product-anyfit/sample/shoes_template_image.jpg',
      thumbnail:
        'https://d1735p3aqhycef.cloudfront.net/aigc-web/public/product-anyfit/sample/shoes_product_compress_image.jpg',
      name: 'shoes',
    },
    {
      id: 3,
      image:
        'https://d1735p3aqhycef.cloudfront.net/aigc-web/public/product-anyfit/sample/hat_template_image.jpg',
      thumbnail:
        'https://d1735p3aqhycef.cloudfront.net/aigc-web/public/product-anyfit/sample/hat_product_compress_image.jpg',
      name: 'hat',
    },
    {
      id: 4,
      image:
        'https://d1735p3aqhycef.cloudfront.net/aigc-web/public/product-anyfit/sample/hat_template_image.jpg',
      thumbnail:
        'https://d1735p3aqhycef.cloudfront.net/aigc-web/public/product-anyfit/sample/dress_product_compress_image.jpg',
      name: 'dress',
    },
  ];

  productImage: any = null;
  templateImage: any = null;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private popupConfirmService: PopupConfirmService,
    private translateService: TranslateService
  ) {
    this.dashboardService.title$.next('Product AnyShot');
  }
  ngOnInit(): void {}

  redirectToDashboard() {
    this.router.navigate([ROUTER_UTILS.DASHBOARD.getHome()]);
  }

  onAfterOpen(): void {
    console.log('Drawer opened');
  }

  onAfterClose(): void {
    console.log('Drawer closed');
  }

  openSelectTemplate(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.basicDrawerVisible = true;
  }

  onSelectedTemplate(data: any) {
    this.basicDrawerVisible = false;
    this.templateImage = this.SERVER_URL + data.coverPath;
  }

  onFileSelected(file: File) {
    console.log('File selected:', file);
  }

  onTryExample(data: any) {
    this.productImage = data.thumbnail;
    this.templateImage = data.image;
  }

  onCreateNew() {
    this.productImage = null;
    this.templateImage = null;
  }

  generate() {
    this.popupConfirmService
      .progress({
        // title: "Generate AI Video",
        imagePreview: this.templateImage,
        size: 'lg',
        pendingMessage:
          'Your creation is brewing! Enjoy a coffee break while we finalize it. Video AI spinning magic, even when you leave the page.',
        message: 'Generate Completed! You can check and export',
        confirmText: this.translateService.instant('export'),
      })
      .afterClosed$.subscribe((res) => {
        if (!res) return;
        this.router.navigate([URL_HANDLER['PRODUCT_ANY_SHOT']]).then();
      });
  }
}
