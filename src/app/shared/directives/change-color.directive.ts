import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[changeColor]',
})
export class ChangeColorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('pointerup') onPointerUp() {
    const childrensCount =
      (this.el.nativeElement as HTMLDivElement).parentElement?.children
        .length ?? 0;

    for (
      let childrenIndex = 0;
      childrenIndex < childrensCount;
      childrenIndex++
    ) {
      const currentChildren = (
        this.el.nativeElement as HTMLDivElement
      ).parentElement?.children.item(childrenIndex);
      currentChildren?.classList.remove('picked');
    }

    (this.el.nativeElement as HTMLDivElement).classList.add('picked');
  }
}
