import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly id = uuidv4();

  constructor() { }

}
