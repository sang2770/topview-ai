# Drawer Component

A customizable drawer component for Angular applications, inspired by Ant Design's drawer component.

## Features

- Multiple placement options (left, right, top, bottom)
- Customizable size
- Optional mask
- Closable option
- Custom header and footer templates
- Animation support

## Usage

```typescript
// Import the component
import { DrawerComponent } from './drawer.component';

// Add to your component imports
@Component({
  imports: [DrawerComponent],
  // ...
})
```

```html
<!-- Basic usage -->
<app-drawer
  [(visible)]="drawerVisible"
  title="Drawer Title"
>
  <p>Drawer Content</p>
</app-drawer>

<!-- With custom placement and size -->
<app-drawer
  [(visible)]="drawerVisible"
  title="Custom Drawer"
  placement="left"
  [width]="500"
>
  <p>Drawer Content</p>
</app-drawer>

<!-- With custom footer -->
<app-drawer
  [(visible)]="drawerVisible"
  title="Drawer with Footer"
  [footerTemplate]="footerTpl"
>
  <p>Drawer Content</p>
  
  <ng-template #footerTpl>
    <div style="text-align: right;">
      <button (click)="drawerVisible = false">Cancel</button>
      <button (click)="submit()">Submit</button>
    </div>
  </ng-template>
</app-drawer>
```

## API

### Properties

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[visible]` | Whether the drawer is visible | `boolean` | `false` |
| `[title]` | The title of the drawer | `string` | `''` |
| `[placement]` | The placement of the drawer | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| `[width]` | Width of the drawer when placement is 'left' or 'right' | `string \| number` | `256` |
| `[height]` | Height of the drawer when placement is 'top' or 'bottom' | `string \| number` | `256` |
| `[closable]` | Whether to show close button | `boolean` | `true` |
| `[maskClosable]` | Whether to close the drawer when clicking the mask | `boolean` | `true` |
| `[mask]` | Whether to show the mask | `boolean` | `true` |
| `[zIndex]` | The z-index of the drawer | `number` | `1000` |
| `[closeIcon]` | Custom close icon | `TemplateRef<void>` | `null` |
| `[contentTemplate]` | Content template | `TemplateRef<void>` | `null` |
| `[headerTemplate]` | Header template | `TemplateRef<void>` | `null` |
| `[footerTemplate]` | Footer template | `TemplateRef<void>` | `null` |

### Events

| Event | Description | Type |
| --- | --- | --- |
| `(visibleChange)` | Callback when the visibility of the drawer changes | `EventEmitter<boolean>` |
| `(afterOpen)` | Callback after drawer opened | `EventEmitter<void>` |
| `(afterClose)` | Callback after drawer closed | `EventEmitter<void>` |

### Methods

| Method | Description |
| --- | --- |
| `open()` | Opens the drawer |
| `close()` | Closes the drawer |