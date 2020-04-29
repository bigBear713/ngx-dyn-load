import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WidgetModuleModule } from '../widget-module/widget-module.module';
import { DynModuleCom2Component } from './components/dyn-module-com-2/dyn-module-com-2.component';
import { DynModuleComponent } from './dyn-module.component';
import { DynModuleService } from './dyn-module.service';

/** 通过动态加载的模块
 *
 *
 * @export
 * @class DynModuleModule
 */
@NgModule({
  imports: [
    CommonModule,
    WidgetModuleModule
  ],
  declarations: [
    DynModuleComponent,
    DynModuleCom2Component
  ],
  providers: [DynModuleService]
})
export class DynModuleModule { }
