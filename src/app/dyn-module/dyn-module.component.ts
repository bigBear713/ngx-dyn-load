import uuidv4 from 'uuid/v4';

import {
    Component,
    Input,
    OnInit
} from '@angular/core';

import { AppService } from '../app.service';
import { LogService } from '../log.service';
import { DynModuleService } from './dyn-module.service';

@Component({
  selector: 'app-dyn-module',
  templateUrl: './dyn-module.component.html',
  styleUrls: ['./dyn-module.component.css']
})
export class DynModuleComponent implements OnInit {

  id = uuidv4();
  @Input()
  caller: string;

  list = [];

  constructor(
    private appSer: AppService,
    private dynModuleSer: DynModuleService,
    private log: LogService,
  ) {
    this.log.publishLogMsg('app-dyn-module的id为' + this.id);
    // 验证根模块的服务能否正常注入进来，
    // 理论上AppService的实例的id应该和其它地方的保持一致
    this.log.publishLogMsg('在DynComponent中调用AppService的实例的id为' + appSer.id);
    this.log.publishLogMsg('在DynComponent中调用DynModuleService的实例的id为' + dynModuleSer.id);
    this.log.publishLogMsg('-------------------------');
  }

  ngOnInit() {
    this.list = (new Array(5)).fill('');
  }

}
