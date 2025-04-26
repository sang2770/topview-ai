import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
})
export class SliderComponent implements ControlValueAccessor {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() value: number = 0;
  @Input() label: string = '';
  @Input() showValue: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'outline' | 'solid' = 'solid';
  @Input() colorPalette: string = 'primary';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() marks: Array<number | { value: number; label: string }> = [];
  @Input() thumbAlignment: 'center' | 'contain' = 'contain';

  @Output() valueChange = new EventEmitter<number>();
  @Output() valueChangeEnd = new EventEmitter<number>();

  @ViewChild('sliderTrack') sliderTrack!: ElementRef;

  isDragging = false;
  formattedMarks: { value: number; label: string; position: string }[] = [];

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit() {
    this.formatMarks();
  }

  ngOnChanges() {
    this.formatMarks();
  }

  formatMarks() {
    this.formattedMarks = this.marks.map((mark) => {
      const value = typeof mark === 'number' ? mark : mark.value;
      const label = typeof mark === 'number' ? mark.toString() : mark.label;
      const percentage = ((value - this.min) / (this.max - this.min)) * 100;
      const position = `${percentage}%`;

      return { value, label, position };
    });
  }

  getThumbPosition(): string {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    return this.orientation === 'horizontal'
      ? `${percentage}%`
      : `${100 - percentage}%`;
  }

  getRangeWidth(): string {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    return `${percentage}%`;
  }

  onTrackClick(event: MouseEvent) {
    if (this.disabled) return;

    const rect = this.sliderTrack.nativeElement.getBoundingClientRect();
    let percentage;

    if (this.orientation === 'horizontal') {
      percentage = (event.clientX - rect.left) / rect.width;
    } else {
      percentage = 1 - (event.clientY - rect.top) / rect.height;
    }

    const newValue = this.min + percentage * (this.max - this.min);
    this.setValue(this.roundToStep(newValue));
    this.valueChangeEnd.emit(this.value);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging || this.disabled) return;

    const rect = this.sliderTrack.nativeElement.getBoundingClientRect();
    let percentage;

    if (this.orientation === 'horizontal') {
      percentage = (event.clientX - rect.left) / rect.width;
    } else {
      percentage = 1 - (event.clientY - rect.top) / rect.height;
    }

    percentage = Math.max(0, Math.min(1, percentage));
    const newValue = this.min + percentage * (this.max - this.min);
    this.setValue(this.roundToStep(newValue));
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.valueChangeEnd.emit(this.value);
    }
  }

  onThumbMouseDown() {
    if (this.disabled) return;
    this.isDragging = true;
  }

  roundToStep(value: number): number {
    const steps = Math.round((value - this.min) / this.step);
    return this.min + steps * this.step;
  }

  setValue(value: number) {
    const clampedValue = Math.max(this.min, Math.min(this.max, value));
    if (this.value !== clampedValue) {
      this.value = clampedValue;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: number): void {
    if (value !== undefined && value !== null) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
