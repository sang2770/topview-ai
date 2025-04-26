# File Upload Component

A reusable Angular component for handling file uploads with a customizable UI.

## Features

- Drag and drop file upload
- Click to select file
- Customizable label and styling
- File type and size validation
- Optional icon toolbar
- Optional template selection button
- Event emitters for file selection and template selection

## Usage

```typescript
// In your component's module or standalone component imports
import { FileUploadComponent } from '@shared/components/file-upload';

// In your component template
<app-file-upload
  label="Click to upload image"
  [acceptedFormats]="'image/jpeg,image/png,image/webp'"
  [maxFileSize]="10"
  [showIcons]="false"
  [showOrText]="false"
  [showTemplateButton]="false"
  (fileSelected)="handleFileSelected($event)"
  (templateSelected)="handleTemplateSelected()"
></app-file-upload>
```

## Inputs

| Input              | Type    | Default                             | Description                                   |
| ------------------ | ------- | ----------------------------------- | --------------------------------------------- |
| label              | string  | 'Click to upload'                   | Text displayed in the upload area             |
| acceptedFormats    | string  | 'image/jpeg,image/png,image/webp'   | Comma-separated list of accepted MIME types   |
| maxFileSize        | number  | 10                                  | Maximum file size in MB                       |
| backgroundImage    | string  | 'assets/images/image_editor_bg.png' | Background image URL                          |
| showIcons          | boolean | false                               | Whether to show the icon toolbar              |
| showOrText         | boolean | false                               | Whether to show the "or" text                 |
| showTemplateButton | boolean | false                               | Whether to show the template selection button |
| templateButtonText | string  | 'Select from Public Templates'      | Text for the template button                  |

## Outputs

| Output           | Type               | Description                               |
| ---------------- | ------------------ | ----------------------------------------- |
| fileSelected     | EventEmitter<File> | Emits when a file is selected             |
| templateSelected | EventEmitter<void> | Emits when the template button is clicked |

## Example

```html
<!-- Basic usage -->
<app-file-upload label="Click to upload image" (fileSelected)="onFileSelected($event)"></app-file-upload>

<!-- With icons -->
<app-file-upload label="Click to upload product image" [showIcons]="true" (fileSelected)="onFileSelected($event)"></app-file-upload>

<!-- With template option -->
<app-file-upload label="Click to upload target image" [showOrText]="true" [showTemplateButton]="true" templateButtonText="Select from Templates" (fileSelected)="onFileSelected($event)" (templateSelected)="onTemplateSelected()"></app-file-upload>
```
