import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[isTagPicked]',
})
export class IsTagPickedDirective implements OnInit {
  @Input() clickable: boolean;
  @Input() isTagPicked: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.onPointerUp();
  }

  @HostListener('pointerup') onPointerUp() {
    if (!this.clickable) {
      return;
    }
    this.togglePicked();
  }

  private togglePicked() {
    if (this.isTagPicked) {
      (this.el.nativeElement as Element).classList.add('picked');
    } else {
      (this.el.nativeElement as Element).classList.remove('picked');
    }
    this.isTagPicked = !this.isTagPicked;
  }
}
