import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../assets/environments/environment';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-select-template',
  templateUrl: './select-template.component.html',
  styleUrl: './select-template.component.scss',
})
export class SelectTemplateComponent implements OnInit {
  readonly SERVER_URL = environment.server;
  @Output() selectedTemplate: EventEmitter<any> = new EventEmitter<any>();

  categories: any = [];
  avatarList: any = [];
  selectedCategoryIndex: any = null;

  selectedAvatar: any = null;

  // Gallery
  avatarListRender: any = [];
  totalColumn: any = 6;

  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.apiService.getTemplatesAnyShot().subscribe((res) => {
      this.categories = (res as any[]).map((item: any) => {
        return {
          ...item,
          dataList: item.dataList?.map((product: any) => ({
            ...product,
            coverPath: this.apiService.enrichUrl(product.coverPath),
          })),
        };
      });
      console.log(this.categories);

      this.avatarList = this.categories
        .map((item: any) => item.dataList)
        .flat();
      this.renderGallery();
    });
  }

  selectCategory(index?: any) {
    if (index === undefined) {
      this.selectedCategoryIndex = null;
      this.avatarList = this.categories
        .map((item: any) => item.dataList)
        .flat();
      this.renderGallery();
      return;
    }
    this.selectedCategoryIndex = index;
    this.avatarList = this.categories[index]?.dataList ?? [];
    this.renderGallery();
  }

  selectAvatar(avatar: any) {
    this.selectedAvatar = avatar;
  }

  onCancel(): void {
    this.selectedTemplate.emit(null);
  }

  onConfirm(): void {
    this.selectedTemplate.emit(this.selectedAvatar);
  }

  renderGallery() {
    console.log(this.avatarList);

    this.avatarListRender = Array.from({ length: this.totalColumn }).map(
      () => []
    );
    for (let i = 0; i < this.avatarList.length; i++) {
      this.avatarListRender[i % this.totalColumn].push(this.avatarList[i]);
    }
  }

  //   xs (extra small)	0px	Điện thoại nhỏ
  // sm (small)	640px	Điện thoại lớn
  // md (medium)	768px	Máy tính bảng dọc
  // lg (large)	1024px	Máy tính bảng ngang / laptop nhỏ
  // xl (extra large)	1280px	Laptop / Desktop
  // 2xl	1536px	Màn hình lớn, desktop rộng
  resizeGallery(size: any) {
    const width = size.width;
    if (width < 640) {
      this.totalColumn = 2;
    } else if (width < 768) {
      this.totalColumn = 3;
    } else if (width < 1024) {
      this.totalColumn = 4;
    } else if (width < 1280) {
      this.totalColumn = 5;
    } else {
      this.totalColumn = 6;
    }
    this.renderGallery();
  }
}
