import {
    Compiler,
    Component,
    ComponentFactoryResolver,
    Injector,
    OnInit
} from '@angular/core';

import { BaseFeatureModule } from '../base/base-feature-module';

@Component({
  selector: 'feature-module-2',
  templateUrl: './feature-module-2.component.html',
  styleUrls: ['./feature-module-2.component.css']
})
export class FeatureModule2Component extends BaseFeatureModule implements OnInit {

  constructor(
    cfr: ComponentFactoryResolver,
    compiler: Compiler,
    injector: Injector,
  ) {
    super(cfr, compiler, injector);
    this.caller = 'FeatureModule2Component';
  }

  ngOnInit() {
  }

}
