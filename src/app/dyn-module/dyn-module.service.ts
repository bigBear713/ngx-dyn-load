import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@angular/core';

@Injectable()
export class DynModuleService {

  readonly id = uuidv4();

  constructor() { }

}
