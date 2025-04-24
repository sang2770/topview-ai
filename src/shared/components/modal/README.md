# Modal Component

A reusable, accessible modal dialog component for Angular applications, similar to Angular Material's Dialog component.

## Features

- Standalone Angular component with minimal dependencies
- Support for both component-based and template-based content
- Configurable size options (sm, md, lg, xl, fullscreen)
- Backdrop click handling with optional close on click
- Keyboard navigation (ESC to close)
- Accessibility support with proper ARIA attributes
- Smooth animations for opening and closing
- Customizable header with title and close button
- Optional footer template
- Centered positioning option
- Fullscreen mode
- TypeScript interfaces for type safety

## Usage

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { ModalService } from '@shared/components/modal';
import { YourModalContentComponent } from './your-modal-content.component';

@Component({
  selector: 'app-your-component',
  template: `<button (click)="openModal()">Open Modal</button>`
})
export class YourComponent {
  constructor(private modalService: ModalService) {}
  
  openModal() {
    const modalRef = this.modalService.open(YourModalContentComponent, {
      title: 'Modal Title',
      size: 'md',
      centered: true
    });
    
    modalRef.afterClosed$.subscribe(result => {
      console.log('Modal closed with result:', result);
    });
  }
}
```

### Component-Based Modal

Create a component to be displayed inside the modal:

```typescript
import { Component } from '@angular/core';
import { ModalRef } from '@shared/components/modal';

@Component({
  selector: 'app-your-modal-content',
  template: `
    <div>
      <p>Your modal content here</p>
      <button (click)="modalRef.close('result')">Close</button>
    </div>
  `
})
export class YourModalContentComponent {
  // The modalRef will be automatically injected by the modal service
  modalRef!: ModalRef;
  
  // Any data passed to the modal will be available here
  data: any;
}
```

### Template-Based Modal

```typescript
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from '@shared/components/modal';

@Component({
  selector: 'app-your-component',
  template: `
    <button (click)="openTemplateModal()">Open Template Modal</button>
    
    <ng-template #modalTemplate let-modalRef="modalRef">
      <div>
        <p>Your template content here</p>
        <button (click)="modalRef.close('result')">Close</button>
      </div>
    </ng-template>
  `
})
export class YourComponent {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  
  constructor(private modalService: ModalService) {}
  
  openTemplateModal() {
    const modalRef = this.modalService.openFromTemplate(this.modalTemplate, {
      title: 'Template Modal',
      size: 'md',
      context: { /* context data available in the template */ }
    });
    
    modalRef.afterClosed$.subscribe(result => {
      console.log('Modal closed with result:', result);
    });
  }
}
```

### Custom Footer

```typescript
@Component({
  selector: 'app-your-component',
  template: `
    <button (click)="openModalWithFooter()">Open Modal with Custom Footer</button>
    
    <ng-template #footerTemplate let-modalRef="modalRef">
      <button (click)="modalRef.close()">Cancel</button>
      <button (click)="modalRef.close('confirmed')">Confirm</button>
    </ng-template>
  `
})
export class YourComponent {
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;
  
  constructor(private modalService: ModalService) {}
  
  openModalWithFooter() {
    const modalRef = this.modalService.open(YourModalContentComponent, {
      title: 'Modal with Custom Footer',
      footerTemplate: this.footerTemplate
    });
  }
}
```

## Configuration Options

The modal component accepts the following configuration options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Size of the modal |
| `closeOnBackdropClick` | boolean | true | Whether to close the modal when clicking on the backdrop |
| `closeOnEscape` | boolean | true | Whether to close the modal when pressing the escape key |
| `showCloseButton` | boolean | true | Whether to show the close button in the header |
| `centered` | boolean | false | Whether to center the modal vertically |
| `fullscreen` | boolean | false | Whether to display the modal in fullscreen mode |
| `title` | string | undefined | Title of the modal |
| `footerTemplate` | TemplateRef<any> | undefined | Template for the footer |
| `data` | any | undefined | Data to pass to the component (component-based modals only) |
| `context` | any | undefined | Context to pass to the template (template-based modals only) |

## API Reference

### ModalService

- `open<T, R = any>(component: Type<T>, options?: ModalOptions): ModalRef<T, R>` - Opens a modal with a component
- `openFromTemplate<T = any, R = any>(template: TemplateRef<T>, options?: ModalOptions): ModalRef<T, R>` - Opens a modal with a template
- `closeAll(result?: any): void` - Closes all active modals

### ModalRef

- `close(result?: any): void` - Closes the modal with an optional result
- `afterClosed$: Observable<any>` - Observable that emits when the modal is closed
- `updateData(data: Partial<T>): void` - Updates the data of the modal component

## Styling

The modal component uses CSS variables for theming. You can customize the appearance by overriding these variables in your global styles:

```scss
:root {
  --dark-background: #121212;
  --border-color: rgba(255, 255, 255, 0.1);
  --primary-color: #007bff;
}
```