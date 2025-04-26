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
  readonly sampleUrl =
    'https://www.amazon.com/MAMI-BABI-Indoor-Scratch-Resistant/dp/B0C2C7FQMZ/ref=pd_ybh_a_d_sccl_6/133-6358408-3616469?pd_rd_w=TVDGv&content-id=amzn1.sym.67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_p=67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_r=FE229K6NC2G2X6B7QRH3&pd_rd_wg=p7DyQ&pd_rd_r=f6720f05-bea8-4f32-82a1-ae9022ffa3e4&pd_rd_i=B0C2C7FQMZ&psc=1';
  test =
    'https://dr1coeak04nbk.cloudfront.net/analyzed_video%2Ftask%2Fvideo_generator%2Furl2video%2Famazon%2Fimg%2F01c96cbbc302213b1ae5ab3b50a5c3ea.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZHIxY29lYWswNG5iay5jbG91ZGZyb250Lm5ldC9hbmFseXplZF92aWRlbyUyRnRhc2slMkZ2aWRlb19nZW5lcmF0b3IlMkZ1cmwydmlkZW8lMkZhbWF6b24lMkZpbWclMkYwMWM5NmNiYmMzMDIyMTNiMWFlNWFiM2I1MGE1YzNlYS5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDU2Mjk5MTd9fX1dfQ__&Signature=tKO9zfaLx55MEwkxz-Ql-lZSUDTCmby7SXViEH4k8PVwEaclADLl3dNe6~F7~06RmUtWJz3BGSzUejAiUaX6qVX5PpXPsau~fSuDtHv50wXSmt1z386M5PNQEZ7V0INZC~QgcF8a0x4pDL4NW-ALzV7ukrNm8Q4fZ~zUtC2YYez2c-no2Bj5MNzapOMbsr2ga-NKv6GaVAVN1W22C5VidZ~kVpZG6o0WCVmlGojji9fHRq~DRkOHNhlqAbWwPTzTiTwoxaRSiQ2d2eL-qm1md3opK4ZldL19KDZe9ANyqV4V-uUWf6mI0s0ku6Ey8OisdthRTsrx-AzoQlqa1pmxCg__&Key-Pair-Id=K21X5TGS0ALJI4';
  resultItems = Array.from(Array(10).keys());
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
    this.http
      .post(`localhost:3000/exactImages`, {
        url: link,
      })
      .subscribe((res: any) => {
        this.images = res;
      });
  }

  fillExample() {
    this.form.get('link')?.setValue(this.sampleUrl);
  }

  removeItemResult(index: number) {
    this.resultItems = this.resultItems.filter((_, i) => i !== index);
  }
}
