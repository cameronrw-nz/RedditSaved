import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appSelectedItem]"
})
export class SelectedItemDirective {
  @Input() isSelected: boolean;

  constructor(private element: ElementRef) {}

  ngOnChanges() {
    if (this.isSelected) {
      this.element.nativeElement.style.backgroundColor =
        "rgb(65.9%, 96%, 65.9%)";
    } else {
      this.element.nativeElement.style.backgroundColor = "inherit";
    }
  }
}
