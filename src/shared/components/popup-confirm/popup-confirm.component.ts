import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalRef } from '../modal/modal-ref';
import { ProgressComponent } from '../progress';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrl: './popup-confirm.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ProgressComponent
  ]
})
export class PopupConfirmComponent implements OnInit{
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() pendingMessage: string = "Generating...";
  @Input() type: 'default' | 'progress' = 'default';
  @Input() action: 'default' | 'confirm' | 'export' = 'default';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() data: any;
  @Input() imagePreview?: string;
  @Input() videoPreview?: {
    url: string;
    duration: number;
  };
  
  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  
  // This will be injected by the modal service
  modalRef!: ModalRef;
  
  // Progress value for progress type
  progress: number = 0;
  isProcessing: boolean = false;
  
  ngOnInit(): void {    
    if (this.type === 'progress') {
      this.startProgress()
    }
  }
  
  onConfirm(): void {
    this.confirm.emit(this.data);
    
    if (this.modalRef) {
      this.modalRef.close({success: true});
    }
  }
  
  onCancel(): void {
    this.cancel.emit();
    if (this.modalRef) {
      this.modalRef.close(null);
    }
  }
  
  private startProgress(): void {
    this.isProcessing = true;
    this.progress = 0;
    
    const interval = setInterval(() => {
      this.progress += 5;
      
      if (this.progress >= 100) {
        clearInterval(interval);
        this.isProcessing = false;
      }
    }, 100);
  }

  getDuration(): string {
    const duration = this.videoPreview?.duration || 0;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
