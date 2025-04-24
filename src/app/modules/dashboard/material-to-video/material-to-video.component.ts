import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../shared/components/modal';
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';

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
    public fb: FormBuilder
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
}
