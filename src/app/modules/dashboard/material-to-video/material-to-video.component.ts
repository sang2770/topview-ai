import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { SuggestInstallExtenstionComponent } from '../suggest-install-extenstion/suggest-install-extenstion.component';

@Component({
  selector: 'app-material-to-video',
  templateUrl: './material-to-video.component.html',
  styleUrl: './material-to-video.component.scss',
  standalone: false,
})
export class MaterialToVideoComponent implements AfterViewInit, OnInit {
  readonly Tab_script = "script";
  readonly Tab_text = "text";
  readonly sampleUrl = 'https://www.amazon.com/Fitbit-Advanced-Smartwatch-Graphite-Included/dp/B0B4N2T7GL/ref=pd_ybh_a_d_sccl_13/133-6358408-3616469?pd_rd_w=bXNMi&content-id=amzn1.sym.67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_p=67f8cf21-ade4-4299-b433-69e404eeecf1&pf_rd_r=Q8RV6XHKNGAXTVVTS5KH&pd_rd_wg=ma93O&pd_rd_r=c256e4b2-1609-4215-9d4a-79793a53fe05&pd_rd_i=B0B4N2T7GL&psc=1';
  readonly sampleData = {
    title: 'Fitbit Sense 2 Advanced Health and Fitness Smartwatch with Tools to Manage Stress and Sleep, ECG App, SpO2, 24/7 Heart Rate and GPS, Shadow Grey/Graphite, One Size (S & L Bands Included)',
    description:
      `Learn to manage stress, sleep better and live healthier with Sense 2—our most advanced health and fitness smartwatch.Human Interface Input: Touchscreen
Manage stress and live healthier: all-day stress detection with cEDA and daily Stress Management Score, ECG app for atrial fibrillation assessment(1), irregular heart rhythm notifications(2), SpO2(3), health metrics dashboard(4), mindfulness content
Measure and improve sleep quality: personalized Sleep Profile(5), daily sleep stages & Sleep Score, smart wake alarm and do not disturb mode
Enhance activity: built-in GPS and workout intensity map, Daily Readiness Score(5), Active Zone Minutes, all-day activity tracking and 24/7 heart rate, 40+ exercise modes and automatic exercise tracking, water resistant to 50 meters
Designed for all-day wear: on-wrist Bluetooth calls, texts and phone notifications(6), customizable clock faces, Fitbit Pay(7), Amazon Alexa built-in(8), Google Wallet & Maps (Google Maps on Android only, coming Spring 2023 to iOS), 6+ day battery(9)
Includes a 6-month Premium membership complete with personalized insights, advanced analytics and more (New & returning Premium users only. Must activate trial within 60-days of device activation. Content and features may change)`,
    dataUrls: [
      "assets/images/1.jpg",
      "assets/images/2.jpg",
      "assets/images/3.jpg",
      "assets/images/4.jpg",
      "assets/images/5.jpg",
      "assets/images/6.jpg",
      "assets/images/7.jpg",
      "assets/images/8.jpg",
      "assets/images/9.jpg",
      "assets/images/10.jpg",
      "assets/images/11.jpg",
      "assets/images/12.jpg",
      "assets/images/13.jpg",
      "assets/images/14.jpg",
      "assets/images/15.jpg",
      "assets/images/16.jpg",
      "assets/images/17.jpg",
      "assets/images/18.jpg"
    ]}
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

  duration = [
    { label: '30 seconds', value: 30 },
    { label: '1 minutes', value: 60 },
    { label: '2 minutes', value: 120 },
    { label: '3 minutes', value: 180 },
    { label: '4 minutes', value: 240 },
  ]

  viewportList = [
    { label: '9:16', value: '9:16', w: '10px', h: '20px' },
    { label: '16:9', value: '16:9', w: '20px', h: '10px' },
    { label: '1:1', value: '1:1', w: '20px', h: '20px' },
    { label: '4:3', value: '4:3', w: '20px', h: '15px' },
    { label: '3:4', value: '3:4', w: '15px', h: '20px' },
  ];

  config: any = {
    viewport: '16:9',
    language: 'en',
    voice: 'female',
    duration: 30,
  };
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
    private popupService: PopupConfirmService,
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

  ngOnInit(): void {
    this.openSelectAvatar();

  }

  openSuggestInstallExtenstion() {
    this.modalService.open(SuggestInstallExtenstionComponent, {
      title: '',
      data: {},
      size: 'lg',
      centered: true,
    }).afterClosed$.subscribe((res) => {
    });
  }
  ngAfterViewInit(): void { }

  changeTab(tab: string) {
    this.tab = tab;
  }

  generate() {
    this.popupService.progress({
      // title: 'Create video',
      message: "Video Generated Successfully!",
      pendingMessage: "Generating...",
      confirmText: "Download",
      size: "md",
      videoPreview: {
        url: this.avatar?.url ?? 'https://www.topview.ai/images/m2v/avatar_demo.png',
        duration: this.config.duration,
      }
    }).afterClosed$.subscribe((res) => {
      if (!res) return;
      this.router.navigate([URL_HANDLER['MATERIAL_URL']]).then();
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
      if (this.analyzeProgress < 90) {
        this.analyzeProgress += 10;
      }
    }, 1000);
    const link = this.form.get('link')?.value;
    if (!link) return;
    this.apiService.getProduct(link).pipe(
      catchError(() => {
        return of({});
      })
    ).subscribe((res: any) => {
      this.images = res.images;
      this.form.get('name')?.setValue(res.title);
      this.form.get('script')?.setValue(res.description);      
      if (!this.images.length || ((!res.title || res.title === "Title not found") && (!res.description || res.description === "Description not found"))) {
        this.openSuggestInstallExtenstion();
      }
      clearInterval(interval);
      this.analyzeProgress = 0;
    });
  }

  fillExample() {
    this.form.get('link')?.setValue(this.sampleUrl);
    this.analyzeProgress = 10;
    this.loadingService.show();
    const interval = setInterval(() => {
      if (this.analyzeProgress < 90) {
        this.analyzeProgress += 10;
      }
    }, 500);
    setTimeout(() => {
      this.images = this.sampleData.dataUrls;
      this.form.get('name')?.setValue(this.sampleData.title);
      this.form.get('script')?.setValue(this.sampleData.description);
      clearInterval(interval);
      this.analyzeProgress = 0;
      this.loadingService.hide();
    }, 5000);
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
