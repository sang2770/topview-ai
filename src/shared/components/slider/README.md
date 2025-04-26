# Slider Component

A customizable slider component for Angular applications, inspired by Chakra UI's slider design.

## Features

- Different sizes (sm, md, lg)
- Different variants (solid, outline)
- Horizontal and vertical orientation
- Support for marks with custom labels
- Customizable thumb alignment
- Accessibility support with keyboard navigation
- Form control integration

## Usage

```typescript
import { SliderComponent } from "src/shared/components/slider";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [SliderComponent],
  template: ` <app-slider [(value)]="sliderValue" label="Volume" showValue="true" [min]="0" [max]="100" [step]="1" (valueChangeEnd)="onVolumeChange($event)"> </app-slider> `,
})
export class ExampleComponent {
  sliderValue = 50;

  onVolumeChange(value: number) {
    console.log("Volume changed:", value);
  }
}
```

## Props

| Prop             | Type                                              | Default      | Description                       |
| ---------------- | ------------------------------------------------- | ------------ | --------------------------------- |
| `min`            | number                                            | 0            | The minimum value of the slider   |
| `max`            | number                                            | 100          | The maximum value of the slider   |
| `step`           | number                                            | 1            | The step value of the slider      |
| `value`          | number                                            | 0            | The current value of the slider   |
| `label`          | string                                            | ''           | The label for the slider          |
| `showValue`      | boolean                                           | false        | Whether to show the current value |
| `disabled`       | boolean                                           | false        | Whether the slider is disabled    |
| `size`           | 'sm' \| 'md' \| 'lg'                              | 'md'         | The size of the slider            |
| `variant`        | 'outline' \| 'solid'                              | 'solid'      | The visual style of the slider    |
| `colorPalette`   | string                                            | 'primary'    | The color of the slider           |
| `orientation`    | 'horizontal' \| 'vertical'                        | 'horizontal' | The orientation of the slider     |
| `marks`          | Array<number \| { value: number; label: string }> | []           | Marks to display on the slider    |
| `thumbAlignment` | 'center' \| 'contain'                             | 'contain'    | The alignment of the thumb        |

## Events

| Event            | Description                                     |
| ---------------- | ----------------------------------------------- |
| `valueChange`    | Emitted when the value changes during dragging  |
| `valueChangeEnd` | Emitted when the user stops dragging the slider |

## Demo

To see all the features in action, import and use the `SliderDemoComponent`:

```typescript
import { SliderDemoComponent } from "src/shared/components/slider";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [SliderDemoComponent],
  template: `<app-slider-demo></app-slider-demo>`,
})
export class ExampleComponent {}
```
