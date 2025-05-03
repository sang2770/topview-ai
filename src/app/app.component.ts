import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit {
  loading = false;
  constructor(
    public loadingService: LoadingService,
    public httpClient: HttpClient,
    public apiSerive: ApiService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe(
      (loading) => {
        setTimeout(() => {
          this.loading = loading;
        }, 100);
      }
    );
    this.apiSerive.getUrlListHandle();
  }
}
