import { ComponentRef } from '@angular/core';
import { ModalComponent } from './modal.component';
import { Observable, Subject } from 'rxjs';

/**
 * A reference to a modal dialog.
 * Use this reference to close the dialog or subscribe to events.
 */
export class ModalRef<T = any, R = any> {
  /** Reference to the modal component */
  component!: ModalComponent;
  
  /** Reference to the component ref */
  componentRef!: ComponentRef<ModalComponent>;
  
  /** Subject that emits when the modal is closed */
  public readonly afterClosed = new Subject<R | undefined>();
  
  /** Observable that emits when the modal is closed */
  afterClosed$ = this.afterClosed.asObservable();
  
  /**
   * Closes the modal dialog
   * @param result Optional result to pass to the afterClosed observable
   */
  close(result?: R): void {
    // This method is implemented by the modal service
  }
  
  /**
   * Updates the modal data
   * @param data The data to update
   */
  updateData(data: Partial<T>): void {
    if (this.componentRef && this.componentRef.instance.componentRef) {
      Object.assign(this.componentRef.instance.componentRef.instance, data);
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }
}