import { Component, HostListener, OnInit } from '@angular/core';
import { LoadingService } from '../shared/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { PopupConfirmService } from '../shared/components/popup-confirm/popup-confirm.service';
import { ModalService } from '../shared/components/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit {
  loading = false;
  popupDesktop: any;
  constructor(
    public loadingService: LoadingService,
    public httpClient: HttpClient,
    public apiSerive: ApiService,
    private translate: TranslateService,
    private popupService: PopupConfirmService,
    private modalService: ModalService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((loading) => {
      setTimeout(() => {
        this.loading = loading;
      }, 100);
    });
    this.apiSerive.getUrlListHandle();
    if (this.isMobile()) {
      this.showPopupDesktop();
    }
  }

  isMobile(): boolean {
    const width = window.innerWidth;
    return width <= 768; // Common breakpoint for mobile devices
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.isMobile()) {
      this.showPopupDesktop();
    } else if (this.popupDesktop) {
      this.popupDesktop.close();
      this.popupDesktop = null;
    }
  }

  showPopupDesktop() {
    if (this.popupDesktop) {
      return;
    }
    this.popupDesktop = this.popupService.confirm({
      title: '',
      imagePreview: 'assets/images/desktop.png',
      message: 'Desktop browser recommended for better experience',
      disableAction: true,
      customBg:
        'linear-gradient(90deg, rgb(161, 255, 206) 0%, rgb(250, 255, 209) 100%)',
    });
  }
}
