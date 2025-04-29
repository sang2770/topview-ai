import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ProgressComponent implements OnChanges, OnInit {
  ngOnInit(): void {
    
  }
  @Input() percent: number = 0;
  @Input() showInfo: boolean = true;
  @Input() type: 'line' | 'circle' = 'line';
  @Input() status: 'normal' | 'success' | 'exception' | 'active' = 'normal';
  @Input() strokeWidth: number = 8; // For line: height in px, for circle: stroke width
  @Input() strokeColor: string = ''; // Custom color
  @Input() trailColor: string = ''; // Background color
  @Input() width: number = 120; // Circle width
  
  // Computed properties
  progressStyle: any = {};
  circlePathStyle: any = {};
  circleTrailStyle: any = {};
  statusIcon: string = '';
  
  ngOnChanges(changes: SimpleChanges): void {
    // Ensure percent is between 0-100
    this.percent = Math.min(100, Math.max(0, this.percent));
    
    // Update styles based on inputs
    this.updateStyles();
  }
  
  private updateStyles(): void {
    if (this.type === 'line') {
      this.progressStyle = {
        width: `${this.percent}%`,
        height: `${this.strokeWidth}px`,
        background: this.getStrokeColor()
      };
    } else if (this.type === 'circle') {
      const radius = 50 - (this.strokeWidth / 2);
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (this.percent / 100) * circumference;
      
      this.circlePathStyle = {
        stroke: this.getStrokeColor(),
        strokeDasharray: `${circumference} ${circumference}`,
        strokeDashoffset: offset
      };
      
      this.circleTrailStyle = {
        stroke: this.trailColor || 'rgba(255, 255, 255, 0.1)',
        strokeWidth: this.strokeWidth
      };
    }
    
    // Set status icon
    if (this.status === 'success') {
      this.statusIcon = 'check';
    } else if (this.status === 'exception') {
      this.statusIcon = 'close';
    }
  }
  
  private getStrokeColor(): string {
    if (this.strokeColor) {
      return this.strokeColor;
    }
    
    switch (this.status) {
      case 'success':
        return '#52c41a';
      case 'exception':
        return '#ff4d4f';
      case 'active':
      case 'normal':
      default:
        return 'var(--primary-color)';
    }
  }
}