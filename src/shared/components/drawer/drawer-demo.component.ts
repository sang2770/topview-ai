import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer.component';

@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  imports: [CommonModule, DrawerComponent],
  template: `
    <div style="padding: 24px;">
      <h1>Drawer Component Demo</h1>

      <div style="margin-bottom: 32px;">
        <h2>Basic Drawer</h2>
        <button (click)="openBasicDrawer()">Open Basic Drawer</button>
        <app-drawer
          [(visible)]="basicDrawerVisible"
          title="Basic Drawer"
          (afterOpen)="onAfterOpen()"
          (afterClose)="onAfterClose()"
        >
          <p>This is the content of the basic drawer.</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </app-drawer>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>Placement Options</h2>
        <div style="display: flex; gap: 16px;">
          <button (click)="openDrawer('left')">Left</button>
          <button (click)="openDrawer('right')">Right</button>
          <button (click)="openDrawer('top')">Top</button>
          <button (click)="openDrawer('bottom')">Bottom</button>
        </div>
        <app-drawer
          [(visible)]="placementDrawerVisible"
          [title]="'Drawer - ' + currentPlacement"
          [placement]="currentPlacement"
        >
          <p>This drawer opens from the {{currentPlacement}}.</p>
          <p>Some contents...</p>
        </app-drawer>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>Custom Size</h2>
        <button (click)="openSizeDrawer()">Open Large Drawer</button>
        <app-drawer
          [(visible)]="sizeDrawerVisible"
          title="Large Drawer"
          [width]="512"
        >
          <p>This is a drawer with custom width (512px).</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </app-drawer>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>No Mask</h2>
        <button (click)="openNoMaskDrawer()">Open Drawer without Mask</button>
        <app-drawer
          [(visible)]="noMaskDrawerVisible"
          title="Drawer without Mask"
          [mask]="false"
        >
          <p>This drawer has no mask.</p>
          <p>Some contents...</p>
        </app-drawer>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>With Footer</h2>
        <button (click)="openFooterDrawer()">Open Drawer with Footer</button>
        <app-drawer
          [(visible)]="footerDrawerVisible"
          title="Drawer with Footer"
          [footerTemplate]="footerTpl"
        >
          <p>This drawer has a custom footer.</p>
          <p>Some contents...</p>
          <ng-template #footerTpl>
            <div style="text-align: right;">
              <button style="margin-right: 8px;" (click)="footerDrawerVisible = false">Cancel</button>
              <button (click)="footerDrawerVisible = false">Submit</button>
            </div>
          </ng-template>
        </app-drawer>
      </div>
    </div>
  `,
  styles: [`
    button {
      padding: 8px 16px;
      background-color: #1890ff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 8px;
    }
    button:hover {
      background-color: #40a9ff;
    }
    h1 {
      margin-bottom: 24px;
    }
    h2 {
      margin-bottom: 16px;
    }
  `]
})
export class DrawerDemoComponent {
  basicDrawerVisible = false;
  placementDrawerVisible = false;
  sizeDrawerVisible = false;
  noMaskDrawerVisible = false;
  footerDrawerVisible = false;

  currentPlacement: 'left' | 'right' | 'top' | 'bottom' = 'right';

  openBasicDrawer(): void {
    this.basicDrawerVisible = true;
  }

  openDrawer(placement: 'left' | 'right' | 'top' | 'bottom'): void {
    this.currentPlacement = placement;
    this.placementDrawerVisible = true;
  }

  openSizeDrawer(): void {
    this.sizeDrawerVisible = true;
  }

  openNoMaskDrawer(): void {
    this.noMaskDrawerVisible = true;
  }

  openFooterDrawer(): void {
    this.footerDrawerVisible = true;
  }

  onAfterOpen(): void {
    console.log('Drawer opened');
  }

  onAfterClose(): void {
    console.log('Drawer closed');
  }
}