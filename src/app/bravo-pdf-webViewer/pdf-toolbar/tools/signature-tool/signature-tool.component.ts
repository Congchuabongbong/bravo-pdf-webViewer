import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPDFViewerApplication, PDFNotificationService } from 'ngx-extended-pdf-viewer';
import { BravoDrawingApp, CanvasSource } from 'src/app/bravo-pdf-webViewer/shared/components/drawing-app/drawing-app.component';
import { BravoNameEventBusCustom, SavedEditorStampEvent } from 'src/app/bravo-pdf-webViewer/shared/events';

@Component({
  selector: 'bravo-pdf-signature-tool',
  templateUrl: './signature-tool.component.html',
  styleUrls: ['./signature.tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BravoPdfSignatureTool implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawingTool') drawingTool!: BravoDrawingApp;
  @ViewChild('signatureModal') signatureModal!: ElementRef<HTMLElement>;
  @Input()
  public isOpenTool = false;

  public isSelected = false;

  get hostElement() {
    return this._elRef.nativeElement;
  }

  private _isPdfInit = false;

  public pdfViewerApp!: IPDFViewerApplication;


  constructor(private _elRef: ElementRef<Element>, private _cd: ChangeDetectorRef, private _notificationService: PDFNotificationService) {
    const subscription = this._notificationService.onPDFJSInit.subscribe(() => {
      this._isPdfInit = true;

      this.onPdfJsInit();

      subscription.unsubscribe();
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

  private onPdfJsInit() {

  }

  public savedActionDrawingApp(pPayload: CanvasSource) {
    if (this._isPdfInit) {
      this.pdfViewerApp = (window as any).PDFViewerApplication;
      createImageBitmap(pPayload.asBlob).then((bitmap) => {
        this.pdfViewerApp.eventBus.dispatch('switchannotationeditorparams', {
          type: 2,
          value: bitmap
        });


        const _payload = {
          source: this,
          value: pPayload.asUrl
        } as SavedEditorStampEvent
        this.pdfViewerApp.eventBus.dispatch(BravoNameEventBusCustom.savedStampEditor, _payload)
      });
    }
    this.onCloseSignatureTool();
    //*add to list image and save to local storage
  }

  public openDrawingTool() {
    this.isOpenTool = true;
    this._cd.detectChanges();
    if (this.drawingTool) {
      this.drawingTool.setDefaultValue();
      this.drawingTool.onHandleClearBtnClick();
    }
  }

  public onCloseSignatureTool() {
    this.isOpenTool = false;
    this._cd.detectChanges();
  }
}
