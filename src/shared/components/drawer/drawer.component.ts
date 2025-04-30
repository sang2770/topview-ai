import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  animations: [
    trigger('drawerAnimation', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(0)' })),
      state('top', style({ transform: 'translateY(0)' })),
      state('bottom', style({ transform: 'translateY(0)' })),
      transition('void => left', [style({ transform: 'translateX(-100%)' }), animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)')]),
      transition('left => void', [animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)', style({ transform: 'translateX(-100%)' }))]),
      transition('void => right', [style({ transform: 'translateX(100%)' }), animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)')]),
      transition('right => void', [animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)', style({ transform: 'translateX(100%)' }))]),
      transition('void => top', [style({ transform: 'translateY(-100%)' }), animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)')]),
      transition('top => void', [animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)', style({ transform: 'translateY(-100%)' }))]),
      transition('void => bottom', [style({ transform: 'translateY(100%)' }), animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)')]),
      transition('bottom => void', [animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)', style({ transform: 'translateY(100%)' }))]),
    ]),
    trigger('maskAnimation', [
      state('void', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('void => visible', [animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)')]),
      transition('visible => void', [animate('0.4s cubic-bezier(0.23, 1, 0.32, 1)')]),
    ])
  ]
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() visible = false;
  @Input() title: string = '';
  @Input() placement: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() width: string | number = 256;
  @Input() height: string | number = 256;
  @Input() closable = true;
  @Input() maskClosable = true;
  @Input() mask = true;
  @Input() zIndex = 1000;
  @Input() closeIcon: TemplateRef<void> | null = null;
  @Input() contentTemplate: TemplateRef<void> | null = null;
  @Input() headerTemplate: TemplateRef<void> | null = null;
  @Input() footerTemplate: TemplateRef<void> | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() afterOpen = new EventEmitter<void>();
  @Output() afterClose = new EventEmitter<void>();

  @ViewChild('drawerContainer') drawerContainer!: ElementRef;

  private originalOverflow: string = '';

  ngOnInit(): void {
    if (this.visible) {
      this.disableBodyScroll();
    }
  }

  ngOnDestroy(): void {
    this.enableBodyScroll();
  }

  open(): void {
    this.visible = true;
    this.visibleChange.emit(true);
    this.disableBodyScroll();
    setTimeout(() => this.afterOpen.emit(), 300);
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.enableBodyScroll();
    setTimeout(() => this.afterClose.emit(), 300);
  }

  onMaskClick(): void {
    if (this.maskClosable && this.mask) {
      this.close();
    }
  }

  getDrawerStyle(): { [key: string]: string } {
    const style: { [key: string]: string } = {
      'z-index': `${this.zIndex}`
    };

    if (this.placement === 'left' || this.placement === 'right') {
      const width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      style['width'] = width;
    } else {
      const height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      style['height'] = height;
    }

    return style;
  }

  private disableBodyScroll(): void {
    if (document && document.body) {
      this.originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  }

  private enableBodyScroll(): void {
    if (document && document.body) {
      document.body.style.overflow = this.originalOverflow;
    }
  }
}
