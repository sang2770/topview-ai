import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  template: `
    <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
      <h2>File Upload Component Demo</h2>

      <h3>Basic Upload</h3>
      <app-file-upload
        label="Click to upload image"
        (fileSelected)="onFileSelected($event)"
      ></app-file-upload>

      <h3 style="margin-top: 30px;">With Icons</h3>
      <app-file-upload
        label="Click to upload product image"
        [showIcons]="true"
        (fileSelected)="onFileSelected($event)"
      ></app-file-upload>

      <h3 style="margin-top: 30px;">With Template Option</h3>
      <app-file-upload
        label="Click to upload target image"
        [showOrText]="true"
        [showTemplateButton]="true"
        templateButtonText="Select from Templates"
        (fileSelected)="onFileSelected($event)"
        (templateSelected)="onTemplateSelected()"
      ></app-file-upload>

      <div
        *ngIf="selectedFile"
        style="margin-top: 20px; padding: 15px; background: #333; border-radius: 8px;"
      >
        <h4>Selected File:</h4>
        <p>Name: {{ selectedFile.name }}</p>
        <p>Size: {{ (selectedFile.size / 1024).toFixed(2) }} KB</p>
        <p>Type: {{ selectedFile.type }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      h2,
      h3,
      h4 {
        color: #fff;
      }
      p {
        color: #ccc;
        margin: 5px 0;
      }
    `,
  ],
})
export class FileUploadDemoComponent {
  selectedFile: File | null = null;

  onFileSelected(file: File) {
    console.log('File selected:', file);
    this.selectedFile = file;
  }

  onTemplateSelected() {
    console.log('Template selection requested');
  }
}
