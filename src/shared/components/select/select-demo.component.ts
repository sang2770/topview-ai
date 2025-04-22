import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from './select.component';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent, TooltipDirective],
  template: `
    <div class="demo-container">
      <h2>Select Component Demo</h2>

      <div class="demo-section">
        <h3>Basic Select</h3>
        <app-select
          [options]="basicOptions"
          placeholder="Select an option"
          (selectionChange)="onBasicSelectionChange($event)"
          [appTooltip]="'Select from available options'"
          placement="top"
        >
        </app-select>
        <p *ngIf="basicSelectedValue">Selected: {{ basicSelectedValue }}</p>
      </div>

      <div class="demo-section">
        <h3>Form Integration</h3>
        <form [formGroup]="form">
          <app-select
            [options]="formOptions"
            placeholder="Select a size"
            formControlName="size"
            [appTooltip]="'Choose your preferred size'"
            placement="right"
          >
          </app-select>
        </form>
        <p>Form value: {{ form.value | json }}</p>
      </div>

      <div class="demo-section">
        <h3>Variants</h3>
        <div class="variant-row">
          <app-select
            [options]="variantOptions"
            placeholder="Outline (Default)"
            variant="outline"
            [appTooltip]="'Default outline style'"
            placement="top"
          >
          </app-select>

          <app-select
            [options]="variantOptions"
            placeholder="Filled"
            variant="filled"
            [appTooltip]="'Filled background style'"
            placement="top"
          >
          </app-select>

          <app-select
            [options]="variantOptions"
            placeholder="Flushed"
            variant="flushed"
            [appTooltip]="'Borderless flushed style'"
            placement="top"
          >
          </app-select>

          <app-select
            [options]="variantOptions"
            placeholder="Unstyled"
            variant="unstyled"
            [appTooltip]="'No default styling'"
            placement="top"
          >
          </app-select>
        </div>
      </div>

      <div class="demo-section">
        <h3>Sizes</h3>
        <div class="size-row">
          <app-select 
            [options]="sizeOptions" 
            placeholder="Small" 
            size="sm"
            [appTooltip]="'Small size select'"
            placement="left"
          >
          </app-select>

          <app-select
            [options]="sizeOptions"
            placeholder="Medium (Default)"
            size="md"
            [appTooltip]="'Medium size select'"
            placement="top"
          >
          </app-select>

          <app-select 
            [options]="sizeOptions" 
            placeholder="Large" 
            size="lg"
            [appTooltip]="'Large size select'"
            placement="right"
          >
          </app-select>
        </div>
      </div>

      <div class="demo-section">
        <h3>States</h3>
        <div class="state-row">
          <app-select 
            [options]="stateOptions" 
            placeholder="Normal"
            [appTooltip]="'Normal state select'"
            placement="top"
          >
          </app-select>

          <app-select
            [options]="stateOptions"
            placeholder="Disabled"
            [disabled]="true"
            [appTooltip]="'This select is disabled'"
            placement="bottom"
          >
          </app-select>

          <app-select
            [options]="stateOptions"
            placeholder="Invalid"
            [invalid]="true"
            [appTooltip]="'Invalid state select'"
            placement="right"
          >
          </app-select>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: white;
      }

      .demo-section {
        margin-bottom: 30px;
        padding: 20px;
        background-color: var(--secondary-color);
        border-radius: 8px;
      }

      h2 {
        margin-top: 0;
        margin-bottom: 20px;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 15px;
      }

      .variant-row,
      .size-row,
      .state-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }
    `,
  ],
})
export class SelectDemoComponent {
  basicOptions: SelectOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  formOptions: SelectOption[] = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];

  variantOptions: SelectOption[] = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ];

  sizeOptions: SelectOption[] = [
    { label: 'First', value: '1' },
    { label: 'Second', value: '2' },
    { label: 'Third', value: '3' },
  ];

  stateOptions: SelectOption[] = [
    { label: 'Enabled', value: 'enabled' },
    { label: 'Disabled', value: 'disabled', disabled: true },
    { label: 'Selected', value: 'selected' },
  ];

  basicSelectedValue: string = '';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      size: ['md'],
    });
  }

  onBasicSelectionChange(value: string): void {
    this.basicSelectedValue = value;
  }
}
