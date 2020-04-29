import {
    Compiler,
    Component,
    ComponentFactoryResolver,
    Injector,
    OnInit
} from '@angular/core';

import { BaseFeatureModule } from '../base/base-feature-module';
import { DynLoaderService } from '../dyn-loader.service';

@Component({
  selector: 'feature-module-1',
  templateUrl: './feature-module-1.component.html',
  styleUrls: ['./feature-module-1.component.css']
})
export class FeatureModule1Component extends BaseFeatureModule implements OnInit {

  constructor(
    cfr: ComponentFactoryResolver,
    injector: Injector,
    dynLoader: DynLoaderService,
  ) {
    super(cfr, injector, dynLoader);
    this.caller = 'FeatureModule1Component';
  }

  ngOnInit() {
  }

}
