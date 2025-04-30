import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  HostListener,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() label: string = 'Click to upload';
  @Input() acceptedFormats: string = 'image/jpeg,image/png,image/webp';
  @Input() maxFileSize: number = 10; // In MB
  @Input() backgroundImage: string = 'assets/images/image_editor_bg.png';
  @Input() showIcons: boolean = false;
  @Input() showOrText: boolean = false;
  @Input() showTemplateButton: boolean = false;
  @Input() templateButtonText: string = 'Select from Public Templates';
  @Input() templateLabel: TemplateRef<any> | null = null;

  @Output() fileSelected = new EventEmitter<File>();
  @Output() templateSelected = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;
  dragOver: boolean = false;
  @Input() previewUrl: string | null = null;

  constructor() {}

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    // Check file type
    const fileType = file.type;
    const acceptedTypes = this.acceptedFormats.split(',');

    if (!acceptedTypes.includes(fileType)) {
      alert('Invalid file type. Please upload a valid image file.');
      return;
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > this.maxFileSize) {
      alert(`File size exceeds ${this.maxFileSize}MB limit.`);
      return;
    }

    this.selectedFile = file;

    // Create preview URL for the selected image
    this.createImagePreview(file);

    this.fileSelected.emit(file);
  }

  onTemplateClick() {
    this.templateSelected.emit();
  }

  private createImagePreview(file: File) {
    // Revoke previous URL to prevent memory leaks
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }

    // Create a new object URL for the file
    this.previewUrl = URL.createObjectURL(file);
  }

  ngOnDestroy() {
    // Clean up any object URLs when component is destroyed
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
  }
}
