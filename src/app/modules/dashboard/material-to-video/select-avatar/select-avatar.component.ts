import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ModalRef } from '../../../../../shared/components/modal';
import { ApiService } from '../../../../../shared/services/api.service';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrl: './select-avatar.component.scss',
})
export class SelectAvatarComponent implements AfterViewInit {
  avatarList: { url: string; videoUrl: string; name?: string }[] = [];
  selectedAvatar: number | null = null;
  @ViewChildren('avatarVideo') avatarVideos!: QueryList<
    ElementRef<HTMLVideoElement>
  >;
  modalRef!: ModalRef;
  constructor(private apiService: ApiService) {
    this.loadData();
  }

  ngAfterViewInit() {
    this.setupVideoHoverEffects();
  }

  setupVideoHoverEffects() {
    setTimeout(() => {
      const videoElements = this.avatarVideos.toArray();
      const avatarItems = document.querySelectorAll('.avatar-item');
      // skip first element
      avatarItems.forEach((item, index) => {
        if (index === 0) return;
        const video = videoElements[index - 1]?.nativeElement;
        if (!video) return;

        let isHovered = false;

        item.addEventListener('mouseenter', () => {
          isHovered = true;

          // Debounce nhẹ để tránh đụng `pause()` quá nhanh
          setTimeout(() => {
            console.log(isHovered, video.paused);

            if (isHovered && video.paused) {
              console.log('is hovered');

              video.style.opacity = '1';
              video.muted = true;

              video.play().catch((error) => {
                console.log('Video play failed:', error);
              });
            }
          }, 50);
        });

        item.addEventListener('mouseleave', () => {
          isHovered = false;
          video.pause();
          video.currentTime = 0;
          video.style.opacity = '0';
        });

        item.addEventListener('click', () => {
          video.muted = false;
          video.volume = 1.0;
          if (video.paused) {
            video.play().catch((error) => {
              console.log('Video play failed on click:', error);
            });
          }
        });
      });
    }, 500);
  }

  loadData() {
    this.apiService.getAvatarList().subscribe((res) => {
      this.avatarList = (res as any[]).map((item: any) => ({
        url: this.apiService.enrichUrl(item.coverDefault),
        videoUrl: item.previewVideoUrl,
        name: item.aiavatarName,
      }));
    });
  }

  selectAvatar(index: number | null) {
    this.selectedAvatar = index;
    // You can emit an event here to notify parent components about the selection
  }

  onConfirm() {
    this.modalRef.close(
      this.selectedAvatar ? this.avatarList[this.selectedAvatar!] : null
    );
  }
}
