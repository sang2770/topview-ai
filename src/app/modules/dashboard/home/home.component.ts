import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';
import { DashboardService } from '../dashboard-layout/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../../../shared/services/api.service';

type ScrollContainerType =
  | 'tools'
  | 'templates'
  | 'productAvatars'
  | 'videoAvatars';

interface ScrollConfig {
  elementRef: ElementRef;
  scrollAmount: number;
  leftButtonProp: keyof HomeComponent;
  rightButtonProp: keyof HomeComponent;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})
export class HomeComponent implements OnInit, AfterViewInit {
  // Properties to track button visibility
  showToolsLeftButton = false;
  showToolsRightButton = true;
  showTemplatesLeftButton = false;
  showTemplatesRightButton = true;
  showProductAvatarsLeftButton = false;
  showProductAvatarsRightButton = true;
  showVideoAvatarLeftButton = false;
  showVideoAvatarRightButton = true;
  public ROUTER_UTILS = ROUTER_UTILS;
  @ViewChild('toolsContainer') toolsContainer!: ElementRef;
  @ViewChild('templatesContainer') templatesContainer!: ElementRef;
  @ViewChild('productAvatarsContainer') productAvatarsContainer!: ElementRef;
  @ViewChild('videoAvatarsContainer') videoAvatarsContainer!: ElementRef;
  @ViewChildren('videoEl') videoElements!: QueryList<
    ElementRef<HTMLVideoElement>
  >;
  toolList = [
    {
      name: 'Materials/Links to Video',
      description: 'Create marketing video ads from link or local materials',
      image: '/assets/images/ai_video_ads.png',
      link: ROUTER_UTILS.DASHBOARD.getMaterialToVideo(),
    },
    // {
    //   name: 'Video Avatar',
    //   description: 'Create avatar videos or clone your avatar from a video',
    //   image: '/assets/images/ai_avatar.png',
    //   link: '/gen/avatar-video-creation',
    // },
    {
      name: 'Product Avatar',
      description: 'Create an avatar holding your product with one image',
      image: '/assets/images/product_avatar.png',
      link: ROUTER_UTILS.DASHBOARD.getProductAvatar(),
      badge: 'New',
    },
    {
      name: 'Product AnyShoot',
      description:
        'Fit any product anywhere, perfect for try-ons and product showcases',
      video: '/assets/videos/cover_video.mp4',
      link: ROUTER_UTILS.DASHBOARD.getProductAnyShot(),
      badge: 'Limited Free',
    },
    // {
    //   name: 'Photo Avatar',
    //   description: 'Make the picture talk',
    //   image: '/assets/images/photo_talking_avatar_v2.png',
    //   link: '/gen/photo-talking-avatar',
    // },
    // {
    //   name: 'AI Image',
    //   description: 'Enter prompts to generate images',
    //   image: '/assets/images/ai_image_creation.png',
    //   link: '/gen/ai-creation?type=image',
    // },
    {
      name: 'AI Video',
      description: 'Text to video, image to video',
      image: '/assets/images/ai_video.png',
      link: ROUTER_UTILS.DASHBOARD.getAiVideo(),
    },
    // {
    //   name: 'AI Voice Generator',
    //   description: 'Transfer text to speech',
    //   image: '/assets/images/ai_voice.png',
    //   link: '/gen/tts',
    // },
  ];

  templateList: any[] = [];

  productAvatarList: any[] = [];

  videoAvatarTemplate: any[] = [];
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private sanitizer: DomSanitizer,
    private apiService: ApiService
  ) {
    this.apiService.getHomeData().subscribe((res: any) => {
      this.templateList = res.anyShoot;
      this.productAvatarList = res.productAvatar;
      this.videoAvatarTemplate = res.videoAvatar;
    });
  }

  ngOnInit(): void {
    this.dashboardService.title$.next(null);
  }

  ngAfterViewInit(): void {
    ['tools', 'templates', 'productAvatars', 'videoAvatars'].forEach((type) => {
      this.updateButtonVisibility(type as ScrollContainerType);
      this.getScrollConfig(
        type as ScrollContainerType
      ).elementRef.nativeElement.addEventListener('scroll', () =>
        this.updateButtonVisibility(type as ScrollContainerType)
      );
    });

    this.videoElements.forEach((videoRef, index) => {
      const video = videoRef.nativeElement;
      video.muted = true;
      video.play().catch((err) => {
        console.warn(`Autoplay failed for video ${index}:`, err);
      });
    });
  }
  @HostListener('window:resize')
  onResize(): void {
    ['tools', 'templates', 'productAvatars'].forEach((type) =>
      this.updateButtonVisibility(type as ScrollContainerType)
    );
  }

  private getScrollConfig(type: ScrollContainerType): ScrollConfig {
    switch (type) {
      case 'tools':
        return {
          elementRef: this.toolsContainer,
          scrollAmount: 300,
          leftButtonProp: 'showToolsLeftButton',
          rightButtonProp: 'showToolsRightButton',
        };
      case 'templates':
        return {
          elementRef: this.templatesContainer,
          scrollAmount: 450,
          leftButtonProp: 'showTemplatesLeftButton',
          rightButtonProp: 'showTemplatesRightButton',
        };
      case 'productAvatars':
        return {
          elementRef: this.productAvatarsContainer,
          scrollAmount: 350,
          leftButtonProp: 'showProductAvatarsLeftButton',
          rightButtonProp: 'showProductAvatarsRightButton',
        };
      case 'videoAvatars':
        return {
          elementRef: this.videoAvatarsContainer,
          scrollAmount: 350,
          leftButtonProp: 'showVideoAvatarLeftButton',
          rightButtonProp: 'showVideoAvatarRightButton',
        };
      default:
        throw new Error(`Unknown scroll container type: ${type}`);
    }
  }

  private updateButtonVisibility(type: ScrollContainerType): void {
    const { elementRef, leftButtonProp, rightButtonProp } =
      this.getScrollConfig(type);
    const container = elementRef.nativeElement;

    (this as any)[leftButtonProp] = container.scrollLeft > 0;
    const isAtEnd =
      container.scrollWidth - container.clientWidth <= container.scrollLeft + 1;
    (this as any)[rightButtonProp] = !isAtEnd;
  }

  scrollContainer(
    type: ScrollContainerType,
    direction: 'left' | 'right'
  ): void {
    const { elementRef, scrollAmount } = this.getScrollConfig(type);
    const container = elementRef.nativeElement;

    container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;

    this.updateButtonVisibility(type);
  }

  // Handle other functionalities like button click event for scroll
  scrollTools(direction: 'left' | 'right'): void {
    this.scrollContainer('tools', direction);
  }

  scrollTemplates(direction: 'left' | 'right'): void {
    this.scrollContainer('templates', direction);
  }

  scrollProductAvatars(direction: 'left' | 'right'): void {
    this.scrollContainer('productAvatars', direction);
  }

  createVideo(): void {
    this.router.navigate([ROUTER_UTILS.DASHBOARD.getMaterialToVideo()]).then();
  }

  redirectToTool(link: string): void {
    this.router.navigate([link]).then();
  }

  byPassUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
