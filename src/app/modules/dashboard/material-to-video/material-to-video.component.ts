import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-material-to-video',
  templateUrl: './material-to-video.component.html',
  styleUrl: './material-to-video.component.scss',
  standalone: false,
})
export class MaterialToVideoComponent {
  tab?: string = 'detail';
  isShowPlaceHolder: boolean = true;
  form: FormGroup = new FormGroup({});

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
  constructor(
    activatedRoute: ActivatedRoute,
    dashboardService: DashboardService,
    fb: FormBuilder
  ) {
    dashboardService.title$.next('Material to Video');
    this.form = fb.group({
      link: ['', [Validators.required]],
      name: ['', [Validators.required]],
      script: [''],
    });

    this.form.get('link')?.valueChanges.subscribe((value) => {
      this.isShowPlaceHolder = !value;
    });
  }

  changeTab(tab: string) {
    this.tab = tab;
  }

  generate() {}
}
