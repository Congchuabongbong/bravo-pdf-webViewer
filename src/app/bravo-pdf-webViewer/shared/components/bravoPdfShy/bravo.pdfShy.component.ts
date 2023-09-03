import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfShyButtonComponent, PdfShyButtonService } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'bravo-pdfShy-button',
  templateUrl: './bravo.pdfShy.component.html',
  styleUrls: ['./bravo.pdfShy.component.scss']
})

export class BravoPdfShyButton extends PdfShyButtonComponent {

  @Output() clickAction = new EventEmitter<MouseEvent>();

  constructor(pdfShyButtonServiceService: PdfShyButtonService, sanitizer: DomSanitizer) {
    super(pdfShyButtonServiceService, sanitizer);
  }

  override onClick(event: MouseEvent): void {
    super.onClick(event);
    this.clickAction.emit(event);
  }

}
