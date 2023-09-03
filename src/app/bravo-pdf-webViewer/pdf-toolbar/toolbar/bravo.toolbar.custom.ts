import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { PageViewModeType, ResponsiveVisibility, ScrollModeType } from 'ngx-extended-pdf-viewer';
import { SpreadType } from 'ngx-extended-pdf-viewer/lib/options/spread-type';
import { BravoPdfEditorTools } from '../tools';
import { BravoPDFToolsNotificationService } from '../../shared/services/bravoPdfTool.notification.service';

@Component({
  selector: 'pdf-toolbar-custom',
  templateUrl: './bravo.toolbar.custom.html',

})

export class PdfToolbarCustom implements OnInit {
  //*props here:
  @ViewChild('bravoEditorTools') bravoEditorTools!: BravoPdfEditorTools;

  @Input()
  public customToolbar: TemplateRef<any> | undefined;

  @Input()
  public mobileFriendlyZoomScale = 1;

  @Input()
  public primaryMenuVisible = true;

  @Input()
  public showDownloadButton: ResponsiveVisibility = true;

  @Input()
  public showDrawEditor: ResponsiveVisibility = false;

  @Input()
  public showTextEditor: ResponsiveVisibility = false;

  @Input()
  public showStampEditor: ResponsiveVisibility = false;

  @Input()
  public showFindButton: ResponsiveVisibility | undefined = undefined;

  @Input()
  public showHandToolButton: ResponsiveVisibility = true;

  @Input()
  public showSelectToolButton: ResponsiveVisibility = true;

  @Input()
  public showOpenFileButton: ResponsiveVisibility = true;

  @Input()
  public showPrintButton: ResponsiveVisibility = true;

  @Input()
  public showPagingButtons: ResponsiveVisibility = true;

  @Input()
  public showPresentationModeButton: ResponsiveVisibility = false;

  @Input()
  public showRotateButton: ResponsiveVisibility = true;

  @Input()
  public showSecondaryToolbarButton: ResponsiveVisibility = true;

  @Input()
  public showSidebarButton: ResponsiveVisibility = true;

  @Output()
  public sidebarVisibleChange = new EventEmitter<boolean>();

  @Input()
  public sidebarVisible: boolean | undefined = false;

  @Input()
  public showZoomButtons: ResponsiveVisibility = true;

  @Input()
  public textLayer: boolean | undefined = undefined;

  @Input()
  public toolbarMarginTop = '0px';

  @Input()
  public toolbarWidth = '100%';

  @Input()
  public zoomLevels = ['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

  @Input()
  public pageViewMode!: PageViewModeType;

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  @Input()
  public spread!: SpreadType;

  @Input()
  public scrollMode!: ScrollModeType;

  @Input()
  public showPropertiesButton: ResponsiveVisibility = true;

  @Input()
  public showSpreadButton: ResponsiveVisibility = true;

  @Input()
  public showSinglePageModeButton: ResponsiveVisibility = true;

  @Input()
  public showVerticalScrollButton: ResponsiveVisibility = true;

  @Input()
  public showHorizontalScrollButton: ResponsiveVisibility = true;

  @Input()
  public showWrappedScrollButton: ResponsiveVisibility = true;

  @Input()
  public showInfiniteScrollButton: ResponsiveVisibility = true;

  @Input()
  public showBookModeButton: ResponsiveVisibility = true;

  @Input()
  public findbarVisible = false;


  @Output() initialized = new EventEmitter<this>();

  get hostElement() {
    return this._elementRef.nativeElement;
  }

  //*constructor here:

  constructor(private _elementRef: ElementRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  public updatePageViewMode(pageViewMode: PageViewModeType): void {
    if (pageViewMode) {
      console.log(pageViewMode);
      this.pageViewModeChange.emit(pageViewMode);
      this.pageViewMode = pageViewMode;
    }
  }

  public updateSidebarVisible(sidebarVisible: boolean): void {
    this.sidebarVisibleChange.emit(sidebarVisible);
  }
}