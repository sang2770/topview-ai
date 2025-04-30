import {
    Directive,
    ElementRef,
    EventEmitter,
    NgZone,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';

@Directive({
    selector: '[appResizeObserver]',
    standalone: true
})
export class ResizeObserverDirective implements OnInit, OnDestroy {
    @Output() resize = new EventEmitter<DOMRectReadOnly>();
    private resizeObserver!: ResizeObserver;

    constructor(private el: ElementRef, private ngZone: NgZone) { }

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    // Gửi sự kiện resize vào trong Angular zone
                    this.ngZone.run(() => {
                        this.resize.emit(entry.contentRect);
                    });
                }
            });

            this.resizeObserver.observe(this.el.nativeElement);
        });
    }

    ngOnDestroy(): void {
        this.resizeObserver.disconnect();
    }
}
