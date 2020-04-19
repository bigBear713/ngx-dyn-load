import uuidv4 from 'uuid/v4';

import { Injectable } from '@angular/core';

@Injectable()
export class DynModuleService {

  readonly id = uuidv4();

  constructor() { }

}
