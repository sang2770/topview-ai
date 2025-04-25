import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../shared/components/modal';
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-material-to-video',
  templateUrl: './material-to-video.component.html',
  styleUrl: './material-to-video.component.scss',
  standalone: false,
})
export class MaterialToVideoComponent implements AfterViewInit {
  tab?: string = 'detail';
  isShowPlaceHolder: boolean = true;
  form: FormGroup = new FormGroup({});
  @ViewChild('inputLink', {static: true}) inputLinkRef: any;
  images: string[] = [];
  languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Korean', value: 'ko' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Turkish', value: 'tr' },
    { label: 'Indonesian', value: 'id' },
    { label: 'Thai', value: 'th' },
    { label: 'Vietnamese', value: 'vi' },
    { label: 'Malay', value: 'ms' },
    { label: 'Tamil', value: 'ta' },
    { label: 'Greek', value: 'el' },
  ];

  voices = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  avatar: any = {};
  constructor(
    public activatedRoute: ActivatedRoute,
    public dashboardService: DashboardService,
    public modalService: ModalService,
    public fb: FormBuilder,
    public router: Router,
    public http: HttpClient,
    public loadingService: LoadingService
  ) {
    dashboardService.title$.next('Material to Video');
    this.form = fb.group({
      link: ['', []],
      name: ['', [Validators.required]],
      script: ['', [Validators.required]],
    });

    this.form.get('link')?.valueChanges.subscribe((value) => {
      this.isShowPlaceHolder = !value;
    });
  }
  ngAfterViewInit(): void {
  }

  changeTab(tab: string) {
    this.tab = tab;
  }

  generate() {}

  togglePlaceHolder() {
    this.isShowPlaceHolder = !this.isShowPlaceHolder;
    
    if (this.inputLinkRef){
      this.inputLinkRef.nativeElement.focus();
    }
  }

  openSelectAvatar() {
    this.modalService.open(
      SelectAvatarComponent, {
        title: 'AI avatar',
        data: {},
        size: 'xl',
      }
    ).afterClosed$.subscribe(result => {
      this.avatar = result;
    })
  }

  redirectToDashboard() {
    this.router.navigate([ROUTER_UTILS.DASHBOARD.getHome()]);
  }

  getImageProduct() {
    const link = this.form.get('link')?.value;
    if (!link) return;
    this.http.post(`localhost:3000/exactImages`, {
      url: link,
    }).subscribe((res: any) => {
      this.images = res;
    });
  }
}
