import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';

@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderComponent],
  template: `
    <div style="padding: 24px;">
      <h1>Slider Component Demo</h1>

      <div style="margin-bottom: 32px;">
        <h2>Basic Slider</h2>
        <app-slider
          [(value)]="basicValue"
          label="Basic Slider"
          [showValue]="true"
          (valueChangeEnd)="onValueChangeEnd($event)"
        >
        </app-slider>
        <div style="margin-top: 8px; font-size: 14px; opacity: 0.7;">
          Current value: {{ basicValue }}
        </div>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>Sizes</h2>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <app-slider [(value)]="sizeSmValue" label="Small" size="sm">
          </app-slider>

          <app-slider [(value)]="sizeMdValue" label="Medium" size="md">
          </app-slider>

          <app-slider [(value)]="sizeLgValue" label="Large" size="lg">
          </app-slider>
        </div>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>Variants</h2>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <app-slider
            [(value)]="variantSolidValue"
            label="Solid"
            variant="solid"
          >
          </app-slider>

          <app-slider
            [(value)]="variantOutlineValue"
            label="Outline"
            variant="outline"
          >
          </app-slider>
        </div>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>With Marks</h2>
        <app-slider
          [(value)]="marksValue"
          [marks]="[0, 25, 50, 75, 100]"
          label="Marks"
        >
        </app-slider>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>With Custom Marks</h2>
        <app-slider
          [(value)]="customMarksValue"
          [marks]="customMarks"
          label="Custom Marks"
        >
        </app-slider>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>Vertical Slider</h2>
        <div style="height: 200px; width: 100px;">
          <app-slider
            [(value)]="verticalValue"
            orientation="vertical"
            label="Vertical"
          >
          </app-slider>
        </div>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>Disabled Slider</h2>
        <app-slider
          [(value)]="disabledValue"
          label="Disabled"
          [disabled]="true"
        >
        </app-slider>
      </div>

      <div style="margin-bottom: 32px;">
        <h2>Thumb Alignment</h2>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <app-slider
            [(value)]="thumbContainValue"
            label="Contain"
            thumbAlignment="contain"
          >
          </app-slider>

          <app-slider
            [(value)]="thumbCenterValue"
            label="Center"
            thumbAlignment="center"
          >
          </app-slider>
        </div>
      </div>
    </div>
  `,
})
export class SliderDemoComponent {
  basicValue = 40;
  sizeSmValue = 30;
  sizeMdValue = 50;
  sizeLgValue = 70;
  variantSolidValue = 60;
  variantOutlineValue = 40;
  marksValue = 25;
  customMarksValue = 50;
  verticalValue = 60;
  disabledValue = 30;
  thumbContainValue = 40;
  thumbCenterValue = 60;

  customMarks = [
    { value: 0, label: 'Low' },
    { value: 50, label: 'Medium' },
    { value: 100, label: 'High' },
  ];

  onValueChangeEnd(value: number) {
    console.log('Value change end:', value);
  }
}
