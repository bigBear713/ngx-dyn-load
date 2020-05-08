import {
    Observable,
    Subject
} from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private msg$ = new Subject<string>();

  constructor() { }

  publishLogMsg(msg: string): void {
    this.msg$.next(msg);
  }

  subscribeLogMsg(): Observable<string> {
    return this.msg$.asObservable();
  }


}
