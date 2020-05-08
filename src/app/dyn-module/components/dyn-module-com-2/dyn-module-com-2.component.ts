import { AppService } from 'src/app/app.service';
import { LogService } from 'src/app/log.service';
import uuidv4 from 'uuid/v4';

import {
    Component,
    Input,
    OnInit
} from '@angular/core';

import { DynModuleService } from '../../dyn-module.service';

@Component({
  selector: 'app-dyn-module-com-2',
  templateUrl: './dyn-module-com-2.component.html',
  styleUrls: ['./dyn-module-com-2.component.css']
})
export class DynModuleCom2Component implements OnInit {

  id = uuidv4();

  @Input()
  caller: string;

  constructor(
    private appSer: AppService,
    private dynModuleSer: DynModuleService,
    private log: LogService,
  ) {
    this.log.publishLogMsg('app-dyn-module-com-2的id为' + this.id);
    // 验证根模块的服务能否正常注入进来，
    // 理论上AppService的实例的id应该和其它地方的保持一致
    this.log.publishLogMsg('在DynModuleCom2Component中调用AppService的实例的id为' + appSer.id);
    this.log.publishLogMsg('在DynModuleCom2Component中调用DynModuleService的实例的id为' + dynModuleSer.id);
    this.log.publishLogMsg('-------------------------');
  }

  ngOnInit() {
  }

}
