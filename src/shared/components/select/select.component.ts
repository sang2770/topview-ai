import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  forwardRef,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' })),
      ]),
    ]),
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() options: SelectOption[] = [];
  @ContentChild('optionTemplate') optionTemplate?: TemplateRef<any>;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() invalid: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() ariaLabel: string = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'outline' | 'filled' | 'flushed' | 'unstyled' = 'outline';

  @Output() selectionChange = new EventEmitter<any>();

  @ViewChild('triggerButton') triggerButton!: ElementRef;
  @ViewChild('optionsContainer') optionsContainer!: ElementRef;
  @ViewChild('selectWrapper') selectWrapper!: ElementRef;

  isOpen = false;
  isFocused = false;
  value: any = '';
  selectedOption: SelectOption | null = null;
  highlightedIndex = -1;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateSelectedOption();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.isOpen &&
      !this.selectWrapper.nativeElement.contains(event.target)
    ) {
      this.closeDropdown();
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateSelectedOption();
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

  private calculateDropdownPosition(): { position: 'bottom' | 'top'; maxHeight: number } {
    const triggerRect = this.triggerButton.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - triggerRect.bottom - 8; // Subtract offset
    const spaceAbove = triggerRect.top - 8; // Subtract offset
    const minHeight = 120; // Minimum height for dropdown
    
    if (spaceBelow >= minHeight || spaceBelow >= spaceAbove) {
      return { position: 'bottom', maxHeight: Math.max(minHeight, spaceBelow) };
    } else {      
      return { position: 'top', maxHeight: Math.max(minHeight, spaceAbove) };
    }
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.highlightedIndex = this.options.findIndex(
          (option) => option.value === this.value
        );
        const { position, maxHeight } = this.calculateDropdownPosition();
        
        // Use setTimeout to ensure the dropdown is rendered
        setTimeout(() => {
          const dropdownElement = this.selectWrapper.nativeElement.querySelector('.select-dropdown');
          if (dropdownElement) {
            dropdownElement.style.position = 'absolute';
            dropdownElement.style.width = '100%';
            dropdownElement.style.maxHeight = `${maxHeight}px`;
            dropdownElement.style.overflowY = 'auto';          
            if (position === 'top') {
              dropdownElement.style.bottom = '100%';
              dropdownElement.style.top = 'auto';
              dropdownElement.style.marginTop = 'auto';
              dropdownElement.style.marginBottom = '8px';
              dropdownElement.style.transformOrigin = 'bottom';
            } else {
              dropdownElement.style.top = '100%';
              dropdownElement.style.bottom = 'auto';
              dropdownElement.style.marginTop = '8px';
              dropdownElement.style.marginBottom = 'auto';
              dropdownElement.style.transformOrigin = 'top';
            }
            this.optionsContainer?.nativeElement?.focus();
          }
        });
      }
    }
  }

  closeDropdown(): void {
    this.isOpen = false;
    this.highlightedIndex = -1;
  }

  selectOption(option: SelectOption): void {
    if (!option.disabled) {
      this.value = option.value;
      this.selectedOption = option;
      this.onChange(option.value);
      this.selectionChange.emit(option.value);
      this.closeDropdown();
      this.triggerButton.nativeElement.focus();
    }
  }

  highlightOption(index: number): void {
    if (!this.options[index]?.disabled) {
      this.highlightedIndex = index;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen && this.highlightedIndex >= 0) {
          this.selectOption(this.options[this.highlightedIndex]);
        } else {
          this.toggleDropdown();
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggleDropdown();
        } else {
          this.highlightNextOption();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggleDropdown();
        } else {
          this.highlightPreviousOption();
        }
        break;

      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.closeDropdown();
        }
        break;

      case 'Tab':
        if (this.isOpen) {
          this.closeDropdown();
        }
        break;
    }
  }

  onTriggerBlur(event: FocusEvent): void {
    if (
      !this.selectWrapper.nativeElement.contains(event.relatedTarget as Node)
    ) {
      this.isFocused = false;
      this.onTouched();
    }
  }

  private updateSelectedOption(): void {
    this.selectedOption =
      this.options.find((option) => option.value === this.value) || null;
    this.cdr.detectChanges();
  }

  private highlightNextOption(): void {
    let nextIndex = this.highlightedIndex;
    do {
      nextIndex = (nextIndex + 1) % this.options.length;
    } while (
      nextIndex !== this.highlightedIndex &&
      this.options[nextIndex].disabled
    );

    if (!this.options[nextIndex].disabled) {
      this.highlightedIndex = nextIndex;
      this.scrollOptionIntoView(nextIndex);
    }
  }

  private highlightPreviousOption(): void {
    let prevIndex = this.highlightedIndex;
    do {
      prevIndex =
        prevIndex <= 0 ? this.options.length - 1 : (prevIndex - 1);
    } while (
      prevIndex !== this.highlightedIndex &&
      this.options[prevIndex].disabled
    );

    if (!this.options[prevIndex].disabled) {
      this.highlightedIndex = prevIndex;
      this.scrollOptionIntoView(prevIndex);
    }
  }

  private scrollOptionIntoView(index: number): void {
    if (this.optionsContainer) {
      const container = this.optionsContainer.nativeElement;
      const option = container.children[index];
      if (option) {
        const containerRect = container.getBoundingClientRect();
        const optionRect = option.getBoundingClientRect();

        if (optionRect.bottom > containerRect.bottom) {
          container.scrollTop += optionRect.bottom - containerRect.bottom;
        } else if (optionRect.top < containerRect.top) {
          container.scrollTop -= containerRect.top - optionRect.top;
        }
      }
    }
  }
}
