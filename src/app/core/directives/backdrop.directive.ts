import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class BackdropDirective {
  @Output() public clickOutside = new EventEmitter<EventTarget>();

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: EventTarget) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.clickOutside.emit(targetElement);
    }
  }
}
