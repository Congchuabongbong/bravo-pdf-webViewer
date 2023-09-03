import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { BravoPdfWebViewer } from './bravo.pdf.webViewer.component';
import { PdfToolbarCustom } from './pdf-toolbar/toolbar/bravo.toolbar.custom';
import { BravoPdfEditorTools, BravoPdfSignatureTool, PdfStampEditorDropdownComponent } from './pdf-toolbar/tools';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BravoPdfShyButton } from './shared/components/bravoPdfShy/bravo.pdfShy.component';
import { BravoDrawingApp } from './shared/components/drawing-app/drawing-app.component';
import { BravoListSignatures } from './shared/components/list-signatures/list-signatures.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [NgxExtendedPdfViewerModule, CommonModule, BrowserModule, HttpClientModule],
  exports: [BravoPdfWebViewer, BravoDrawingApp],
  declarations: [BravoPdfWebViewer, PdfStampEditorDropdownComponent, PdfToolbarCustom, BravoPdfEditorTools, BravoDrawingApp, BravoPdfSignatureTool, BravoPdfShyButton, BravoListSignatures],
  providers: [],
})
export class BravoPdfWebViewerModule { }
