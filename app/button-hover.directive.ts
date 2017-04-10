import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({ selector: '[buttonHover]' })
export class buttonHoverDirective {

  @HostBinding('class.is-hovering') hovering = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.hovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hovering = false;
  }
}