import { TemplateRef } from '@angular/core';

/**
 * Configuration options for the modal component
 */
export interface ModalConfig {
  /** Size of the modal: 'sm', 'md', 'lg', 'xl' */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Whether to close the modal when clicking on the backdrop */
  closeOnBackdropClick?: boolean;

  /** Whether to close the modal when pressing the escape key */
  closeOnEscape?: boolean;

  /** Whether to show the close button in the header */
  showCloseButton?: boolean;

  /** Whether to center the modal vertically */
  centered?: boolean;

  /** Whether to display the modal in fullscreen mode */
  fullscreen?: boolean;

  /** Title of the modal */
  title?: string;

  /** Template for the footer */
  footerTemplate?: TemplateRef<any>;
  customBg?: string;
}

/**
 * Options for opening a modal
 */
export interface ModalOptions extends Partial<ModalConfig> {
  /** Data to pass to the component */
  data?: any;

  /** Context to pass to the template */
  context?: any;
}

/**
 * Interface for components that can be opened in a modal
 */
export interface ModalComponent {
  /** Reference to the modal */
  modalRef?: any;

  /** Data passed to the component */
  data?: any;
}
