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
import { ElementRef } from '@angular/core';
import { catchError, of } from 'rxjs';
import { PopupConfirmService } from '../../../../shared/components/popup-confirm/popup-confirm.service';
import { URL_HANDLER } from '../../../../shared/constants/api';

@Component({
  selector: 'app-material-to-video',
  templateUrl: './material-to-video.component.html',
  styleUrl: './material-to-video.component.scss',
  standalone: false,
})
export class MaterialToVideoComponent implements AfterViewInit {
  readonly Tab_script = "script";
  readonly Tab_text = "text";
  readonly sampleUrl =
    'https://www.amazon.com/MAMI-BABI-Indoor-Scratch-Resistant/dp/B0C2C7FQMZ/ref=pd_ybh_a_d_sccl_6/133-6358408-3616469?pd_rd_w=TVDGv&content-id=amzn1.sym.67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_p=67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_r=FE229K6NC2G2X6B7QRH3&pd_rd_wg=p7DyQ&pd_rd_r=f6720f05-bea8-4f32-82a1-ae9022ffa3e4&pd_rd_i=B0C2C7FQMZ&psc=1';
  tab?: string = this.Tab_text;
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

  duration = Array.from(new Array(5)).map((_, index) => ({
    label: index + ' minutes',
    value: index
  }));

  avatar: any = {};

  analyzeProgress = 0;
  constructor(
    public activatedRoute: ActivatedRoute,
    public dashboardService: DashboardService,
    public modalService: ModalService,
    public fb: FormBuilder,
    public router: Router,
    public http: HttpClient,
    public loadingService: LoadingService,
    private apiService: ApiService,
    private popupService: PopupConfirmService
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

  generate() {
    this.popupService.progress({
      // title: 'Create video',
      message: "Video Generated Successfully!",
      pendingMessage: "Generating...",
      confirmText: "Export",
      size: "md"
    }).afterClosed$.subscribe((res) => {
      if (!res) return;
      this.router.navigate([URL_HANDLER['Material_URL']]).then();
    });
  }

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
    this.analyzeProgress = 10;
    const interval = setInterval(() => {
      if (this.analyzeProgress < 100) {
        this.analyzeProgress += 10;
      }
    }, 1000);
    const link = this.form.get('link')?.value;
    if (!link) return;
    this.apiService.getProduct(link).pipe(
      catchError(() => {
        return of([]);
      })
    ).subscribe((res: any) => {
      console.log(res);
      this.images = res.images;
      clearInterval(interval);
      this.analyzeProgress = 0;
    });
  }

  fillExample() {
    this.form.get('link')?.setValue(this.sampleUrl);
    this.getImageProduct();
  }

  removeItemResult(index: number) {
    this.images = this.images.filter((_, i) => i !== index);
  }
  
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  // Add allowed file types
  private allowedFileTypes = [
    'image/jpeg',
    'image/png', 
    'image/bmp',
    'image/webp',
    'video/mp4',
    'video/quicktime' // for .mov files
  ];

  onFileUploadClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (const file of files) {
      if (!this.allowedFileTypes.includes(file.type)) {
        console.error('Invalid file type:', file.type);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    // Clear input value to allow selecting the same file again
    this.fileInput.nativeElement.value = '';
  }
}
