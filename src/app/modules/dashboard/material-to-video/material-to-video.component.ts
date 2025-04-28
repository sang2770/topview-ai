import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../shared/components/modal';
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-material-to-video',
  templateUrl: './material-to-video.component.html',
  styleUrl: './material-to-video.component.scss',
  standalone: false,
})
export class MaterialToVideoComponent implements AfterViewInit {
  readonly sampleUrl =
    'https://www.amazon.com/MAMI-BABI-Indoor-Scratch-Resistant/dp/B0C2C7FQMZ/ref=pd_ybh_a_d_sccl_6/133-6358408-3616469?pd_rd_w=TVDGv&content-id=amzn1.sym.67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_p=67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_r=FE229K6NC2G2X6B7QRH3&pd_rd_wg=p7DyQ&pd_rd_r=f6720f05-bea8-4f32-82a1-ae9022ffa3e4&pd_rd_i=B0C2C7FQMZ&psc=1';
  tab?: string = 'detail';
  isShowPlaceHolder: boolean = true;
  form: FormGroup = new FormGroup({});
  @ViewChild('inputLink', { static: true }) inputLinkRef: any;
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
    public loadingService: LoadingService,
    private apiService: ApiService
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
  ngAfterViewInit(): void {}

  changeTab(tab: string) {
    this.tab = tab;
  }

  generate() {}

  togglePlaceHolder() {
    this.isShowPlaceHolder = !this.isShowPlaceHolder;

    if (this.inputLinkRef) {
      this.inputLinkRef.nativeElement.focus();
    }
  }

  openSelectAvatar() {
    this.modalService
      .open(SelectAvatarComponent, {
        title: 'AI avatar',
        data: {},
        size: 'xl',
      })
      .afterClosed$.subscribe((result) => {
        this.avatar = result;
      });
  }

  redirectToDashboard() {
    this.router.navigate([ROUTER_UTILS.DASHBOARD.getHome()]);
  }

  getImageProduct() {
    const link = this.form.get('link')?.value;
    if (!link) return;
    this.apiService.getProduct(link).subscribe((res: any) => {
      console.log(res);
      this.images = res.images;
    });
  }

  fillExample() {
    this.form.get('link')?.setValue(this.sampleUrl);
    this.getImageProduct();
  }

  removeItemResult(index: number) {
    this.images = this.images.filter((_, i) => i !== index);
  }
}
