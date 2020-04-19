import {
    Compiler,
    ComponentFactoryResolver,
    Injector,
    NgModuleFactory,
    NgModuleRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { DynModuleCom2Component } from '../dyn-module/components/dyn-module-com-2/dyn-module-com-2.component';
import { DynModuleComponent } from '../dyn-module/dyn-module.component';
import { DynModuleModule } from '../dyn-module/dyn-module.module';

export class BaseFeatureModule {

  @ViewChild('dynModule', { read: ViewContainerRef, static: true }) dynModule: ViewContainerRef;
  @ViewChild('dynModuleCom', { read: ViewContainerRef, static: true }) dynModuleCom: ViewContainerRef;

  protected dynModuleModuleRef: NgModuleRef<DynModuleModule>;

  constructor(
    protected cfr: ComponentFactoryResolver,
    protected compiler: Compiler,
    protected injector: Injector,
  ) { }

  private async dynLoadTheModule(): Promise<void> {
    return import('./../dyn-module/dyn-module.module').then(m => {
      return this.loadModuleFactory(m.DynModuleModule).then(moduleFactory => {
        const moduleRef = moduleFactory.create(this.injector);
        this.dynModuleModuleRef = moduleRef;
        this.dynLoadTheModuleCom(moduleRef);
      });
    });
  }

  private dynLoadTheModuleCom(moduleRef: NgModuleRef<DynModuleModule>, isCom1: boolean = true): void {
    // 这边必须用moduleRef.componentFactoryResolver加载组件，
    // 如果用this.cfr会报DI错误
    const component: Type<DynModuleComponent | DynModuleCom2Component> = isCom1 ? DynModuleComponent : DynModuleCom2Component;
    this.dynModule.createComponent(moduleRef.componentFactoryResolver.resolveComponentFactory(component));
  }

  private loadModuleFactory(module: any): Promise<NgModuleFactory<any>> {
    if (module instanceof NgModuleFactory) {
      return new Promise(resolve => resolve(module));
    } else {
      return this.compiler.compileModuleAsync(module);
    }
  }

  onDynLoadModule(): void {
    this.dynLoadTheModule();
  }

  onDynLoadModuleCom(): void {
    // 验证能否加载一次模块后，动态加载该模块中的组件。
    // 此时模块不重新加载，模块级的服务也不会重新实例化
    this.dynLoadTheModuleCom(this.dynModuleModuleRef, false);
  }

}
