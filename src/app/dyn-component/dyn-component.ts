import uuidv4 from 'uuid/v4';

import { Component } from '@angular/core';

import { AppService } from '../app.service';

/** 动态加载的组件
 *
 *
 * @export
 * @class DynComponent
 */
@Component({
  selector: 'dyn-component',
  templateUrl: './dyn-component.html',
  styles: [``]
})
export class DynComponent {

  id = uuidv4();

  test = '能见到我说明插值表达式可以正常使用';

  constructor(
    private appSer: AppService
  ) {
    console.log('dyn-component的id为', this.id);
    // 验证根模块的服务能否正常注入进来，
    // 理论上AppService的实例的id应该和其它地方的保持一致
    console.log('在DynComponent中调用AppService的实例的id为', appSer.id);
    console.log('-------------------------');
  }


}
