import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BravoPDFToolsNotificationService {
  private _toolsNotification!: Subject<unknown>;
  public toolInit$!: Observable<unknown>;


  constructor() {
    this._toolsNotification = new Subject<unknown>();
    this.toolInit$ = this._toolsNotification.asObservable();
  }



  public triggerToolbarInit(sender: unknown) {
    this._toolsNotification.next(sender);
  }


}
