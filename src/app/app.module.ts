import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BravoPdfWebViewerModule } from './bravo-pdf-webViewer/bravo.pdf.webViewer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BravoPdfWebViewerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
