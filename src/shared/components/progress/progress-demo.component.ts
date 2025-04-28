import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress.component';

@Component({
  selector: 'app-progress-demo',
  standalone: true,
  imports: [CommonModule, ProgressComponent],
  template: `
    <div class="demo-container">
      <h3>Progress Component</h3>
      
      <div class="demo-section">
        <h4>Line Progress (Default)</h4>
        <app-progress [percent]="30"></app-progress>
      </div>
      
      <div class="demo-section">
        <h4>Line Progress with Success Status</h4>
        <app-progress [percent]="100" status="success"></app-progress>
      </div>
      
      <div class="demo-section">
        <h4>Line Progress with Exception Status</h4>
        <app-progress [percent]="70" status="exception"></app-progress>
      </div>
      
      <div class="demo-section">
        <h4>Line Progress with Active Animation</h4>
        <app-progress [percent]="50" status="active"></app-progress>
      </div>
      
      <div class="demo-section">
        <h4>Line Progress with Custom Colors</h4>
        <app-progress [percent]="40" strokeColor="#1890ff" trailColor="rgba(24, 144, 255, 0.2)"></app-progress>
      </div>
      
      <div class="demo-section">
        <h4>Circle Progress</h4>
        <app-progress [percent]="75" type="circle"></app-progress>
      </div>
      
      <div class="demo-section">
        <h4>Circle Progress with Success Status</h4>
        <app-progress [percent]="100" type="circle" status="success"></app-progress>
      </div>
      
      <div class="demo-section">
        <h4>Circle Progress with Exception Status</h4>
        <app-progress [percent]="70" type="circle" status="exception"></app-progress>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 20px;
      background-color: var(--secondary-color);
      border-radius: 8px;
      color: white;
    }
    
    .demo-section {
      margin-bottom: 24px;
    }
    
    h3 {
      margin-top: 0;
      margin-bottom: 16px;
    }
    
    h4 {
      margin-bottom: 8px;
      font-weight: normal;
      opacity: 0.8;
    }
  `]
})
export class ProgressDemoComponent {}