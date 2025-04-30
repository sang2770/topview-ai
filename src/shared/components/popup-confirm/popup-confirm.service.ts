import { Injectable } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { ModalRef } from '../modal/modal-ref';
import { PopupConfirmComponent } from './popup-confirm.component';

export interface PopupConfirmOptions {
title?: string;
  message?: string;
  pendingMessage?: string;
  type?: 'default' | 'progress';
  action?: 'default' | 'confirm' | 'export';
  confirmText?: string;
  cancelText?: string;
  data?: any;
  size?: any;
  imagePreview?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PopupConfirmService {
  constructor(private modalService: ModalService) {}

  /**
   * Opens a confirmation dialog
   * @param options Configuration options for the confirmation dialog
   * @returns ModalRef instance
   */
  confirm(options: PopupConfirmOptions = {}): ModalRef {
    return this.modalService.open(PopupConfirmComponent, {
      centered: true,
      size: options.size ?? 'sm',
      title: options.title,
      data: {
        message: options.message,
        type: options.type || 'default',
        action: options.action || 'confirm',
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        data: options.data,
        imagePreview: options.imagePreview
      }
    });
  }

  /**
   * Opens a progress confirmation dialog
   * @param options Configuration options for the confirmation dialog
   * @returns ModalRef instance
   */
  progress(options: PopupConfirmOptions = {}): ModalRef {
    return this.confirm({
      ...options,
      type: 'progress'
    });
  }

  /**
   * Opens an export confirmation dialog
   * @param options Configuration options for the confirmation dialog
   * @returns ModalRef instance
   */
  export(options: PopupConfirmOptions = {}): ModalRef {
    return this.confirm({
      ...options,
      action: 'export',
      confirmText: options.confirmText || 'Export'
    });
  }
}