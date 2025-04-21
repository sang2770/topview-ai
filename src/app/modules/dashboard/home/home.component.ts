import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/constants/router-utils';

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
  @ViewChild('toolsContainer') toolsContainer!: ElementRef;
  @ViewChild('templatesContainer') templatesContainer!: ElementRef;
  @ViewChild('productAvatarsContainer') productAvatarsContainer!: ElementRef;
  @ViewChild('videoAvatarsContainer') videoAvatarsContainer!: ElementRef;

  toolList = [
    {
      name: 'Avatar Marketing Video',
      description: 'Create marketing video ads from link or local materials',
      image: 'https://www.topview.ai/images/home/ai_video_ads.png',
      link: '/ai-video-ads',
    },
    {
      name: 'Avatar Marketing Video',
      description: 'Create marketing video ads from link or local materials',
      image: 'https://www.topview.ai/images/home/ai_video_ads.png',
      link: '/gen/m2v?videoConfigType=avatar',
    },
    {
      name: 'Video Avatar',
      description: 'Create avatar videos or clone your avatar from a video',
      image: 'https://www.topview.ai/images/home/ai_avatar.png',
      link: '/gen/avatar-video-creation',
    },
    {
      name: 'Product Avatar',
      description: 'Create an avatar holding your product with one image',
      image: 'https://www.topview.ai/images/home/product_avatar.png',
      link: '/gen/product-avatar',
      badge: 'New',
    },
    {
      name: 'Product AnyShoot',
      description:
        'Fit any product anywhere, perfect for try-ons and product showcases',
      video:
        'https://d1735p3aqhycef.cloudfront.net/aigc-web/public/product-anyfit/cover_video.mp4',
      link: '/gen/product-any-shoot',
      badge: 'Limited Free',
    },
    {
      name: 'Photo Avatar',
      description: 'Make the picture talk',
      image: 'https://www.topview.ai/images/home/photo_talking_avatar_v2.png',
      link: '/gen/photo-talking-avatar',
    },
    {
      name: 'AI Image',
      description: 'Enter prompts to generate images',
      image: 'https://www.topview.ai/images/home/ai_image_creation.png',
      link: '/gen/ai-creation?type=image',
    },
    {
      name: 'AI Video',
      description: 'Text to video, image to video',
      image: 'https://www.topview.ai/images/home/ai_video.png',
      link: '/gen/ai-creation?type=video',
    },
    {
      name: 'AI Voice Generator',
      description: 'Transfer text to speech',
      image: 'https://www.topview.ai/images/home/ai_voice.png',
      link: '/gen/tts',
    },
  ];

  templateList = [
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/YGTZZuzJI8.webp',
    },
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/tUztU66Bxh.webp',
    },
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/2ZlsEM6OGL.webp',
    },
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/mzQs6OzA2c.webp',
    },
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/69j4fD2lMb.webp',
    },
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/BBMBjEIhNT.webp',
    },
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/J8cqyYP36X.webp',
    },
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/HTeBecsxGP.webp',
    },
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/ParQG1p0kY.webp',
    },
    {
      title: '3C Digital Products',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/anyFit/7Ve33jak3a.webp',
    },
  ];

  productAvatarList = [
    {
      category: 'Jewelry',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/dD0VtI6Mpf.webp',
    },
    {
      category: 'Jewelry',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/EaTjULErQh.webp',
    },
    {
      category: 'Beauty & Personal Care',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/W15tKSOWBg.webp',
    },
    {
      category: 'Beauty & Personal Care',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/FKKcvAXJzB.webp',
    },
    {
      category: 'Beauty & Personal Care',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/LOS7rU2ieN.webp',
    },
    {
      category: 'Beauty & Personal Care',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/mPai28y3f6.webp',
    },
    {
      category: 'Clothing',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/D3SXalNdlr.webp',
    },
    {
      category: 'Clothing',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/tUiyJrNAhz.webp',
    },
    {
      category: 'Clothing',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/XcfqxpLzY9.webp',
    },
    {
      category: 'Clothing',
      image:
        'https://d1735p3aqhycef.cloudfront.net/asset/dashboard/aiavatarManage/productAvatar/Y7CWHVY1sw.webp',
    },
  ];

  videoAvatarTemplate = [
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/307a5107db9742b99ee2f004df2e31ce/ef4-2e7044604829.webp',
    },
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/9952a9fdd1484afa868eb913c06d8df8/8a3-42cc41d85d71.webp',
    },
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/9f36c8c20b944111b1953f6fc6b6bfc9/613-11f726248dc1.webp',
    },
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/102ca06850e54ac583d95fd4fc486ae6/559-9f157b66c94d.webp',
    },
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/3bef05cfcff54fdeb14f99e71bafda27/e96-51dcd5cbe5e3.webp',
    },
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/ef8d8d86273741399c8261938d324a44/94b-118cc6514289.webp',
    },
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/b4d62f41f8b44ba9a7378316c0fe00cc/055-f29aecda8eac.webp',
    },
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/ab25ba064c584488a0e3b8dd3dd3ce8a/fa0-680b1b3e5a42.webp',
    },
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/577176e06a1a4ed28227de6e76672297/eb1-985ebf0bbafc.webp',
    },
    {
      title: 'Video Avatar Templates',
      image:
        'https://d1735p3aqhycef.cloudfront.net/aiavatar/public_model_video/d34311e2dce84c799a21772d2b3f3372/5c4-0a2cfad8245c.webp',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    ['tools', 'templates', 'productAvatars', 'videoAvatars'].forEach((type) => {
      this.updateButtonVisibility(type as ScrollContainerType);
      this.getScrollConfig(
        type as ScrollContainerType
      ).elementRef.nativeElement.addEventListener('scroll', () =>
        this.updateButtonVisibility(type as ScrollContainerType)
      );
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
}
