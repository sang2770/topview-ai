import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss'
})
export class TutorialComponent {
  @Input() type: string | null = null;
  
  typeMap = {
    'Product Avatar': {
      title: 'How to Use Product AnyShoot',
      description: 'Fit any product into any scenario, seamlessly blending perspective, lighting, and angles. Especially suitable for wearable products.',
      video: 'https://d1735p3aqhycef.cloudfront.net/aigc-web/public/helpCenter/product_anyShoot_tutorial_v3.mp4',
    }
  }
}
