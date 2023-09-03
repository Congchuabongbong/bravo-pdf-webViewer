import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnnotationEditorEditorModeChangedEvent, IPDFViewerApplication, PDFNotificationService, ResponsiveVisibility, getVersionSuffix, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { BravoNameEventBusCustom } from 'src/app/bravo-pdf-webViewer/shared/events';
import { BravoPdfSignatureTool } from '../signature-tool/signature-tool.component';

@Component({
  selector: 'pdf-stamp-editor-dropdown',
  templateUrl: './stamp-editor-dropdown.component.html',
  styleUrls: ['./stamp-editor-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PdfStampEditorDropdownComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('signatureTool') signatureTool!: BravoPdfSignatureTool;

  @Input()
  public show: ResponsiveVisibility = true;

  public isSelected = false;

  public isToggleDropdown = false;

  public get pdfJsVersion(): string {
    return getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }

  public pdfViewerApp!: IPDFViewerApplication;

  constructor(private _elRef: ElementRef<Element>, private _notificationService: PDFNotificationService, private _cd: ChangeDetectorRef) {
    const subscription = this._notificationService.onPDFJSInit.subscribe(() => {
      this.onPdfJsInit();
      subscription.unsubscribe();
    });
  }

  //*life cycle here:
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    if (this.pdfViewerApp) {
      this.pdfViewerApp.eventBus.off('annotationeditormodechanged', this.onHandleAnnotationEditorModeChanged);
      this.pdfViewerApp.eventBus.off(BravoNameEventBusCustom.widowMouseDown, this.onHandleWindowMouseDown);
    }
  }

  //* methods start here
  private onPdfJsInit() {
    this.pdfViewerApp = (window as any).PDFViewerApplication;

    this.pdfViewerApp.eventBus.on('annotationeditormodechanged', this.onHandleAnnotationEditorModeChanged);

    this.pdfViewerApp.eventBus.on(BravoNameEventBusCustom.widowMouseDown, this.onHandleWindowMouseDown)
  }

  public onClick(): void {
    document.getElementById('editorStamp')?.click();
  }

  public openTool(event: MouseEvent) {
    this.isToggleDropdown = false;
    this.signatureTool.openDrawingTool();
  }

  public onHandleWindowMouseDown = this._handleWindowMouseDown.bind(this);
  private _handleWindowMouseDown(pPayload: any) {
    if (!this._elRef.nativeElement.contains(pPayload['value'])) {
      this.isToggleDropdown = false;
      this._cd.detectChanges();
    }
  }

  public onHandleAnnotationEditorModeChanged = this._handleAnnotationEditorModeChanged.bind(this);
  private _handleAnnotationEditorModeChanged({ mode }: AnnotationEditorEditorModeChangedEvent) {
    this.isSelected = mode === 13
    this.isToggleDropdown = mode === 13;
    this._cd.markForCheck();
  }
}
