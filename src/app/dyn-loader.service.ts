import {
    Compiler,
    Inject,
    Injectable,
    NgModuleFactory,
    Type
} from '@angular/core';

import { DYN_LOAD } from './config/tokens';

@Injectable({
  providedIn: 'root'
})
export class DynLoaderService {

  constructor(
    protected compiler: Compiler,
    @Inject(DYN_LOAD) private lazyWidgets: { [key: string]: () => Promise<NgModuleFactory<any> | Type<any>> }
  ) { }

  getModuleFactory(moduleName: string): Promise<NgModuleFactory<any>> {
    // 需要通过DI中的工厂模式才能在aot模式下正常使用
    return this.lazyWidgets[moduleName]().then(m => {
      return this.loadModuleFactory(m);
    });
  }

  private async loadModuleFactory(module: any): Promise<NgModuleFactory<any>> {
    if (module instanceof NgModuleFactory) {
      return new Promise(resolve => resolve(module));
    } else {
      return await this.compiler.compileModuleAsync(module);
    }
  }


}
