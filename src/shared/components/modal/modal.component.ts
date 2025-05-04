import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalRef } from './modal-ref';
import { ModalConfig } from './modal.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('contentAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '100ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() config: ModalConfig = {
    size: 'md',
    closeOnBackdropClick: true,
    closeOnEscape: true,
    showCloseButton: true,
    centered: false,
    fullscreen: false,
    customBg: undefined,
  };

  @Output() closed = new EventEmitter<any>();

  @ViewChild('modalContent', { read: ViewContainerRef })
  modalContent!: ViewContainerRef;
  @ViewChild('modalContainer') modalContainer!: ElementRef;

  componentRef: ComponentRef<any> | null = null;
  contentTemplate: TemplateRef<any> | null = null;
  modalRef: ModalRef | null = null;
  result: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    document.body.classList.add('modal-open');
    console.log(this.config);
  }

  ngAfterViewInit(): void {
    if (this.modalContainer && this.modalContainer.nativeElement) {
      setTimeout(() => {
        this.modalContainer.nativeElement.focus();
      });
    }
  }

  ngOnDestroy(): void {
    this.removeComponent();
    document.body.classList.remove('modal-open');
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent): void {
    if (this.config.closeOnEscape) {
      this.close();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (
      this.config.closeOnBackdropClick &&
      event.target === event.currentTarget
    ) {
      this.close();
    }
  }

  close(result?: any): void {
    this.result = result;
    this.closed.emit(result);
    // Removed the circular reference that was causing stack overflow
    // The modalRef.close() call is not needed here as it would call back to this method
    // The modalService already handles cleanup when the closed event is emitted
  }

  loadComponent<T>(component: Type<T>, data?: any): void {
    this.removeComponent();

    // Use setTimeout to ensure ViewChild is initialized
    setTimeout(() => {
      if (!this.modalContent) {
        console.warn('Modal content container is not available');
        return;
      }

      this.modalContent.clear();

      this.componentRef = this.modalContent.createComponent(component);
      if (data) {
        Object.assign(this.componentRef.instance, data);
      }

      if (this.componentRef.instance.modalRef === undefined) {
        this.componentRef.instance.modalRef = this.modalRef;
      }

      this.cdr.detectChanges();
    });
  }

  loadTemplate(template: TemplateRef<any>, context?: any): void {
    // Use setTimeout to ensure ViewChild is initialized
    setTimeout(() => {
      if (!this.modalContent) {
        console.warn('Modal content container is not available');
        return;
      }

      this.modalContent.clear();
      this.contentTemplate = template;
      this.modalContent.createEmbeddedView(template, {
        ...context,
        modalRef: this.modalRef,
      });
      this.cdr.detectChanges();
    });
  }

  private removeComponent(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
