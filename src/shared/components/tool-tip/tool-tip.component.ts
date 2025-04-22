import { Component, Input, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'app-tool-tip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tool-tip.component.html',
  styleUrl: './tool-tip.component.scss',
  animations: [
    trigger('tooltipAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class ToolTipComponent implements OnDestroy {
  @Input() content: string = '';
  @Input() placement: TooltipPlacement = 'top';
  @Input() delay: number = 200;
  @Input() offset: number = 8;
  @Input() hasArrow: boolean = true;
  @Input() elementRect: DOMRect | null = null;

  isVisible: boolean = false;
  private showTimeout?: number;
  private hideTimeout?: number;

  constructor(private elementRef: ElementRef) {}

  ngOnDestroy() {
    this.clearTimeouts();
  }

  show() {
    this.clearTimeouts();
    this.showTimeout = window.setTimeout(() => {
    this.isVisible = true;

      this.updatePosition();
    }, this.delay);
  }

  hide() {
    this.clearTimeouts();
    this.hideTimeout = window.setTimeout(() => {
      this.isVisible = false;
    }, 100);
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  private updatePosition() {
    const element = this.elementRef.nativeElement;
    const tooltip = element.querySelector('.tooltip');
    const arrow = element.querySelector('.tooltip-arrow');
    
    if (!tooltip || !arrow || !this.elementRect) return;

    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Get viewport dimensions and scroll position
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    // Calculate available space in each direction using fixed positioning
    const spaceAbove = this.elementRect.top;
    const spaceBelow = viewportHeight - this.elementRect.bottom;
    const spaceLeft = this.elementRect.left;
    const spaceRight = viewportWidth - this.elementRect.right;

    // Determine if we need to flip the placement
    let effectivePlacement = this.placement;
    if (this.placement === 'top' && spaceAbove < tooltipRect.height + this.offset) {
      effectivePlacement = 'bottom';
    } else if (this.placement === 'bottom' && spaceBelow < tooltipRect.height + this.offset) {
      effectivePlacement = 'top';
    } else if (this.placement === 'left' && spaceLeft < tooltipRect.width + this.offset) {
      effectivePlacement = 'right';
    } else if (this.placement === 'right' && spaceRight < tooltipRect.width + this.offset) {
      effectivePlacement = 'left';
    }

    let top = 0;
    let left = 0;
    let arrowLeft = '50%';
    let arrowTop = '50%';

    // Reset tooltip position for accurate measurements
    tooltip.style.top = '0px';
    tooltip.style.left = '0px';


    const calculatePosition = () => {
      if (!this.elementRect) return;
      switch (effectivePlacement) {
        case 'top':
          top = -tooltipRect.height - this.offset;
          left = (this.elementRect.width - tooltipRect.width) / 2;
          
          // Adjust horizontal position if tooltip would overflow viewport
          if (this.elementRect.left + left < 0) {
            left = -this.elementRect.left + 5;
            arrowLeft = `${this.elementRect.width / 2}px`;
          } else if (this.elementRect.left + left + tooltipRect.width > viewportWidth) {
            left = viewportWidth - this.elementRect.left - tooltipRect.width - 5;
            arrowLeft = `${this.elementRect.width / 2}px`;
          }
          
          arrow.style.bottom = '-4px';
          arrow.style.left = arrowLeft;
          arrow.style.transform = 'translateX(-50%) rotate(45deg)';
          break;

        case 'bottom':
          top = this.elementRect.height + this.offset;
          left = (this.elementRect.width - tooltipRect.width) / 2;
          
          // Adjust horizontal position if tooltip would overflow viewport
          if (this.elementRect.left + left < 0) {
            left = -this.elementRect.left + 5;
            arrowLeft = `${this.elementRect.width / 2}px`;
          } else if (this.elementRect.left + left + tooltipRect.width > viewportWidth) {
            left = viewportWidth - this.elementRect.left - tooltipRect.width - 5;
            arrowLeft = `${this.elementRect.width / 2}px`;
          }
          
          arrow.style.top = '-4px';
          arrow.style.left = arrowLeft;
          arrow.style.transform = 'translateX(-50%) rotate(45deg)';
          break;

        case 'left':
          top = (this.elementRect.height - tooltipRect.height) / 2;
          left = -tooltipRect.width - this.offset;
          
          // Adjust vertical position if tooltip would overflow viewport
          if (this.elementRect.top + top < 0) {
            top = -this.elementRect.top + 5;
            arrowTop = `${this.elementRect.height / 2}px`;
          } else if (this.elementRect.top + top + tooltipRect.height > viewportHeight) {
            top = viewportHeight - this.elementRect.top - tooltipRect.height - 5;
            arrowTop = `${this.elementRect.height / 2}px`;
          }
          
          arrow.style.right = '-4px';
          arrow.style.top = arrowTop;
          arrow.style.transform = 'translateY(-50%) rotate(45deg)';
          break;

        case 'right':
          top = (this.elementRect.height - tooltipRect.height) / 2;
          left = this.elementRect.width + this.offset;
          
          // Adjust vertical position if tooltip would overflow viewport
          if (this.elementRect.top + top < 0) {
            top = -this.elementRect.top + 5;
            arrowTop = `${this.elementRect.height / 2}px`;
          } else if (this.elementRect.top + top + tooltipRect.height > viewportHeight) {
            top = viewportHeight - this.elementRect.top - tooltipRect.height - 5;
            arrowTop = `${this.elementRect.height / 2}px`;
          }
          
          arrow.style.left = '-4px';
          arrow.style.top = arrowTop;
          arrow.style.transform = 'translateY(-50%) rotate(45deg)';
          break;
      }
    };

    

    calculatePosition();
    // Apply fixed positioning
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${this.elementRect.top + top}px`;
    tooltip.style.left = `${this.elementRect.left + left}px`;
  }
}
