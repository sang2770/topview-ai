import { Component, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { ModalRef } from './modal-ref';

// Example component to be opened in a modal
@Component({
  selector: 'app-example-modal-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>Example Modal Content</h2>
      <p>This is an example of a component loaded into a modal.</p>
      <p *ngIf="data?.message">Message: {{ data.message }}</p>
      
      <div style="margin-top: 24px; display: flex; justify-content: flex-end; gap: 12px;">
        <button 
          type="button" 
          style="background-color: transparent; border: 1px solid rgba(255, 255, 255, 0.4); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
          (click)="modalRef.close()">Cancel</button>
        <button 
          type="button" 
          style="background-color: var(--primary-color); border: none; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
          (click)="modalRef.close(data)">Confirm</button>
      </div>
    </div>
  `
})
export class ExampleModalContentComponent {
  modalRef!: ModalRef;
  data: any;
}

// Demo component to showcase modal usage
@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 24px;">
      <h1>Modal Component Demo</h1>
      
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <button 
          type="button" 
          style="background-color: var(--primary-color); border: none; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
          (click)="openComponentModal()">Open Component Modal</button>
        
        <button 
          type="button" 
          style="background-color: var(--primary-color); border: none; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
          (click)="openTemplateModal()">Open Template Modal</button>
          
        <button 
          type="button" 
          style="background-color: var(--primary-color); border: none; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
          (click)="openCustomSizeModal()">Open Large Modal</button>
          
        <button 
          type="button" 
          style="background-color: var(--primary-color); border: none; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
          (click)="openFullscreenModal()">Open Fullscreen Modal</button>
      </div>
      
      <div *ngIf="result" style="margin-top: 24px; padding: 16px; background-color: rgba(255, 255, 255, 0.1); border-radius: 8px;">
        <h3>Modal Result:</h3>
        <pre>{{ result | json }}</pre>
      </div>
      
      <ng-template #modalTemplate let-modalRef="modalRef">
        <div>
          <h2>Template Modal</h2>
          <p>This is an example of a template-based modal.</p>
          <p *ngIf="templateContext?.message">Message: {{ templateContext.message }}</p>
          
          <div style="margin-top: 24px; display: flex; justify-content: flex-end; gap: 12px;">
            <button 
              type="button" 
              style="background-color: transparent; border: 1px solid rgba(255, 255, 255, 0.4); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
              (click)="modalRef.close()">Close</button>
            <button 
              type="button" 
              style="background-color: var(--primary-color); border: none; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
              (click)="modalRef.close(templateContext)">Submit</button>
          </div>
        </div>
      </ng-template>
      
      <ng-template #footerTemplate let-modalRef="modalRef">
        <button 
          type="button" 
          style="background-color: transparent; border: 1px solid rgba(255, 255, 255, 0.4); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
          (click)="modalRef.close()">Cancel</button>
        <button 
          type="button" 
          style="background-color: var(--primary-color); border: none; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer;"
          (click)="modalRef.close({success: true})">Save Changes</button>
      </ng-template>
    </div>
  `
})
export class ModalDemoComponent {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;
  
  result: any;
  templateContext = { message: 'Hello from template context!' };
  
  constructor(private modalService: ModalService) {}
  
  openComponentModal() {
    const modalRef = this.modalService.open(ExampleModalContentComponent, {
      title: 'Component Modal',
      data: { message: 'Hello from component data!' },
      centered: true
    });
    
    modalRef.afterClosed$.subscribe(result => {
      if (result) {
        this.result = result;
        console.log('Modal closed with result:', result);
      }
    });
  }
  
  openTemplateModal() {
    const modalRef = this.modalService.openFromTemplate(this.modalTemplate, {
      title: 'Template Modal',
      context: this.templateContext,
      centered: true
    });
    
    modalRef.afterClosed$.subscribe(result => {
      if (result) {
        this.result = result;
        console.log('Modal closed with result:', result);
      }
    });
  }
  
  openCustomSizeModal() {
    const modalRef = this.modalService.open(ExampleModalContentComponent, {
      title: 'Large Modal',
      size: 'lg',
      data: { message: 'This is a large modal!' },
      centered: true
    });
    
    modalRef.afterClosed$.subscribe(result => {
      if (result) {
        this.result = result;
      }
    });
  }
  
  openFullscreenModal() {
    const modalRef = this.modalService.openFromTemplate(this.modalTemplate, {
      title: 'Fullscreen Modal',
      fullscreen: true,
      context: { message: 'This is a fullscreen modal!' },
      footerTemplate: this.footerTemplate
    });
    
    modalRef.afterClosed$.subscribe(result => {
      if (result) {
        this.result = result;
      }
    });
  }
}