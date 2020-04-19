import uuidv4 from 'uuid/v4';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly id = uuidv4();

  constructor() { }

}
