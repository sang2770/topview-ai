import { Directive, ElementRef, Input, OnDestroy, OnInit, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ToolTipComponent } from '../components/tool-tip/tool-tip.component';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('appTooltip') content: string = '';
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() showDelay: number = 200;
  @Input() hideDelay: number = 100;

  private tooltipRef: ComponentRef<ToolTipComponent> | null = null;
  private showTimeout: any;
  private hideTimeout: any;

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.el.nativeElement.addEventListener('mouseenter', this.show.bind(this));
    this.el.nativeElement.addEventListener('mouseleave', this.hide.bind(this));
    this.el.nativeElement.addEventListener('focus', this.show.bind(this));
    this.el.nativeElement.addEventListener('blur', this.hide.bind(this));
  }

  ngOnDestroy() {
    this.el.nativeElement.removeEventListener('mouseenter', this.show.bind(this));
    this.el.nativeElement.removeEventListener('mouseleave', this.hide.bind(this));
    this.el.nativeElement.removeEventListener('focus', this.show.bind(this));
    this.el.nativeElement.removeEventListener('blur', this.hide.bind(this));
    this.destroyTooltip();
  }

  private show() {
    clearTimeout(this.hideTimeout);
    if (!this.tooltipRef) {
      this.showTimeout = setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(ToolTipComponent);
        this.tooltipRef = this.vcr.createComponent(factory);
        const elementRect = this.el.nativeElement.getBoundingClientRect();
        Object.assign(this.tooltipRef.instance, {
          content: this.content,
          placement: this.placement,
          element: this.el.nativeElement,
          elementRect: elementRect
        });
        if (this.tooltipRef && (this.tooltipRef as any).instance) {
          (this.tooltipRef as any).instance.show();
        }
      }, this.showDelay);
    }
  }

  private hide() {
    // clearTimeout(this.showTimeout);
    // if (this.tooltipRef) {
    //   this.hideTimeout = setTimeout(() => {
    //     this.destroyTooltip();
    //   }, this.hideDelay);
    // }
  }

  private destroyTooltip() {
    if (this.tooltipRef) {
      this.tooltipRef.destroy();
      this.tooltipRef = null;
    }
  }
}