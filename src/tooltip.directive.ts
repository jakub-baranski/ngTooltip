import {
  Directive, ElementRef, HostListener, Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[ngtTooltip]'
})
export class TooltipDirective implements OnInit {

  @Input() tooltipText: string;
  @Input() tooltipWidth: string;
  private tooltipHTML: string;
  private tooltipElement: HTMLElement;

  constructor(private el: ElementRef) {  }

  /**
   * Listen to mouse enter event, add tooltip element to DOM
   * @param e: event
   */
  @HostListener('mouseenter', ['$event']) onMouseEnter(e) {
    this.el.nativeElement.insertAdjacentHTML('afterend', this.tooltipHTML);
    this.tooltipElement = this.el.nativeElement.parentElement.querySelector('.tooltip');
    this.tooltipElement.style.minWidth = this.tooltipWidth;
    this.tooltipElement.style.top = `${e.pageY - this.tooltipElement.clientHeight - 15}px`;
    this.tooltipElement.style.left = `${e.pageX - this.tooltipElement.clientWidth / 2 }px`;
  }

  /**
   * Listen to mouse leave event and remove tooltip element from DOM.
   * @param e: event
   */
  @HostListener('mouseleave', ['$event']) onMouseLeave(e) {
    this.tooltipElement.remove();
  }

  @HostListener('mousemove', ['$event']) onMouseMove(e) {
    if (this.tooltipElement) {
      this.tooltipElement.style.top = `${e.pageY - this.tooltipElement.clientHeight - 15}px`;
      this.tooltipElement.style.left = `${e.pageX - this.tooltipElement.clientWidth / 2 }px`;
    }
  }

  /**
   * Create simple tooltip div with set text.
   */
  ngOnInit() {
    this.tooltipHTML = `<div class="tooltip">${this.tooltipText}</div>`;
  }
}
