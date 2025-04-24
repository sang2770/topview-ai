import { Injectable, TemplateRef, Type, ViewContainerRef, ComponentRef, Injector, createComponent, ApplicationRef, EnvironmentInjector } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalConfig, ModalOptions } from './modal.model';
import { ModalRef } from './modal-ref';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalsContainerElement: HTMLElement | null = null;
  private activeModals: ModalRef[] = [];

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {
    this.createModalsContainer();
  }

  /**
   * Opens a modal with a component
   */
  open<T, R = any>(component: Type<T>, options: ModalOptions = {}): ModalRef<T, R> {
    return this.createModal(options, (modalRef, modalComponent) => {
      modalComponent.loadComponent(component, options.data);
    });
  }

  /**
   * Opens a modal with a template
   */
  openFromTemplate<T = any, R = any>(
    template: TemplateRef<T>,
    options: ModalOptions = {}
  ): ModalRef<T, R> {
    return this.createModal(options, (modalRef, modalComponent) => {
      modalComponent.loadTemplate(template, options.context);
    });
  }

  /**
   * Closes all active modals
   */
  closeAll(result?: any): void {
    this.activeModals.forEach(modalRef => modalRef.close(result));
  }

  /**
   * Creates a modal container and appends it to the body
   */
  private createModalsContainer(): void {
    if (!this.modalsContainerElement) {
      this.modalsContainerElement = document.createElement('div');
      this.modalsContainerElement.classList.add('modals-container');
      document.body.appendChild(this.modalsContainerElement);
    }
  }

  /**
   * Creates a modal instance
   */
  private createModal<T, R>(
    options: ModalOptions,
    contentLoader: (modalRef: ModalRef<T, R>, modalComponent: ModalComponent) => void
  ): ModalRef<T, R> {
    // Create the modal config
    const config: ModalConfig = {
      size: options.size || 'md',
      closeOnBackdropClick: options.closeOnBackdropClick !== false,
      closeOnEscape: options.closeOnEscape !== false,
      showCloseButton: options.showCloseButton !== false,
      centered: options.centered || false,
      fullscreen: options.fullscreen || false,
      title: options.title,
      footerTemplate: options.footerTemplate,
    };

    // Create the modal reference
    const modalRef = new ModalRef<T, R>();

    // Create the modal component
    const modalComponentRef = createComponent(ModalComponent, {
      environmentInjector: this.environmentInjector,
      hostElement: this.modalsContainerElement!,
      elementInjector: this.injector
    });

    const modalComponent = modalComponentRef.instance;
    modalComponent.config = config;
    modalComponent.modalRef = modalRef;

    // Set up the modal reference
    modalRef.componentRef = modalComponentRef;
    modalRef.component = modalComponent;

    // Load the content
    contentLoader(modalRef, modalComponent);

    // Handle modal closing
    modalComponent.closed.subscribe((result: R) => {
      this.removeModal(modalRef);
      modalRef.afterClosed.next(result);
    });

    // Set up the close method
    modalRef.close = (result?: R) => {
      modalComponent.close(result);
    };

    // Add to active modals
    this.activeModals.push(modalRef);

    // Detect changes
    this.appRef.attachView(modalComponentRef.hostView);
    modalComponentRef.changeDetectorRef.detectChanges();

    return modalRef;
  }

  /**
   * Removes a modal from the DOM and active modals list
   */
  private removeModal(modalRef: ModalRef): void {
    const index = this.activeModals.indexOf(modalRef);
    if (index > -1) {
      this.activeModals.splice(index, 1);
    }

    if (modalRef.componentRef) {
      this.appRef.detachView(modalRef.componentRef.hostView);
      modalRef.componentRef.destroy();
    }
  }
}