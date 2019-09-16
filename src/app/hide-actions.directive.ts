import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[appHideActions]"
})
export class HideActionsDirective {
  @Input() isShowing: boolean;

  constructor(private element: ElementRef) {}

  ngOnChanges() {
    if (this.isShowing) {
      this.element.nativeElement.style.paddingBottom = "80px";
    } else {
      this.element.nativeElement.style.paddingBottom = "0px";
    }
  }
}
