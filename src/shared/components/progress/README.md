# Progress Component

A flexible progress bar component that supports different types, states, and customization options.

## Features

- Supports line and circle progress types
- Multiple status states: normal, success, exception, active
- Customizable colors, stroke width, and size
- Optional percentage display

## Usage

```typescript
// Import in your component
import { ProgressComponent } from 'src/shared/components/progress';

// Add to your component imports
@Component({
  // ...
  imports: [ProgressComponent],
  // ...
})
```

```html
<!-- Basic usage -->
<app-progress [percent]="30"></app-progress>

<!-- Circle progress -->
<app-progress [percent]="75" type="circle"></app-progress>

<!-- With status -->
<app-progress [percent]="100" status="success"></app-progress>
<app-progress [percent]="70" status="exception"></app-progress>
<app-progress [percent]="50" status="active"></app-progress>

<!-- Custom styling -->
<app-progress 
  [percent]="40" 
  strokeColor="#1890ff" 
  trailColor="rgba(24, 144, 255, 0.2)"
  [strokeWidth]="10"
></app-progress>
```

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| percent | The completion percentage | number | 0 |
| showInfo | Whether to display the progress info | boolean | true |
| type | The type of progress bar | 'line' \| 'circle' | 'line' |
| status | The current status | 'normal' \| 'success' \| 'exception' \| 'active' | 'normal' |
| strokeWidth | The stroke width of the progress bar | number | 8 |
| strokeColor | The color of the progress bar | string | - |
| trailColor | The color of the unfilled part | string | - |
| width | The width of the circle progress | number | 120 |