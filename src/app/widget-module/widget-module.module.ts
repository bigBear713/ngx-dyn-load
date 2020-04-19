import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WidgetModuleComponent } from './widget-module.component';

/** 被其它模块依赖的组件模块
 *
 *
 * @export
 * @class WidgetModuleModule
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WidgetModuleComponent],
  exports: [WidgetModuleComponent]
})
export class WidgetModuleModule { }
