import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { IPDFViewerApplication, PDFNotificationService } from 'ngx-extended-pdf-viewer';
import { BehaviorSubject, Subject, of, switchMap, takeUntil } from 'rxjs';
import { BravoNameEventBusCustom, SavedEditorStampEvent } from '../../events';

const _fakeSource = 'https://api.slingacademy.com/v1/sample-data/photos?limit=10';
@Component({
  selector: 'bravo-list-signatures',
  templateUrl: './list-signatures.component.html',
  styleUrls: ['./list-signatures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BravoListSignatures implements OnInit, OnDestroy {

  public pdfViewerApp!: IPDFViewerApplication;

  private _unSubSubject = new Subject<void>();

  public unSubAction$ = this._unSubSubject.asObservable();

  private _signatureAddSubject = new BehaviorSubject<string>('');

  public signatureAddAction$ = this._signatureAddSubject.asObservable().pipe(takeUntil(this.unSubAction$));

  public signaturesAvailable$ = this._http.get(_fakeSource).pipe(
    takeUntil(this.unSubAction$),
    switchMap(
      (data: any) => {
        const images = data['photos'].map((item: any) => item['url'])
        return of(images)
      }
    )
  );

  constructor(private _elRef: ElementRef<Element>, private _notificationService: PDFNotificationService, private _cd: ChangeDetectorRef, private _http: HttpClient) {
    this._notificationService.onPDFJSInit.pipe(takeUntil(this.unSubAction$)).subscribe(this._onPdfJsInit.bind(this));
  }

  //*life cycle here:
  ngOnInit() {

  }

  ngOnDestroy(): void {
    this._unSubSubject.next();
    this._unSubSubject.closed || this._unSubSubject.complete();

    this.pdfViewerApp && this.pdfViewerApp.eventBus.off(BravoNameEventBusCustom.savedStampEditor, this.onSavedStampEditor);
  }

  private _onPdfJsInit() {
    this.pdfViewerApp = (window as any).PDFViewerApplication;
    console.warn(this.onSavedStampEditor);
    this.pdfViewerApp.eventBus.on(BravoNameEventBusCustom.savedStampEditor, this.onSavedStampEditor);
  }

  public addSignatureToList(pImagSrc: string): void {
    this._signatureAddSubject.next(pImagSrc);
  }

  public onSavedStampEditor = this._handleSavedStampEditor.bind(this);
  private _handleSavedStampEditor({ value }: SavedEditorStampEvent) {
    console.warn(value);
    this.addSignatureToList(value)
  }

  public onClickAddSignatureBtn(pImgEl: HTMLImageElement) {
    console.warn(pImgEl);
    if (this.pdfViewerApp) {
      // createImageBitmap(pImgEl).then(bitmap => {
      //   // this.pdfViewerApp.eventBus.dispatch('switchannotationeditorparams', {
      //   //   type: 2,
      //   //   value: bitmap
      //   // });
      // })

      this.pdfViewerApp.eventBus.dispatch('switchannotationeditorparams', {
        type: 2,
        value: pImgEl
      });
    }
  }
}
