import {
    ComponentFactoryResolver,
    Injector,
    NgModuleFactory,
    NgModuleRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { DynLoaderService } from '../dyn-loader.service';

export class BaseFeatureModule {

  @ViewChild('dynModule', { read: ViewContainerRef, static: true }) dynModule: ViewContainerRef;
  @ViewChild('dynModuleCom', { read: ViewContainerRef, static: true }) dynModuleCom: ViewContainerRef;

  protected dynModuleModuleRef: NgModuleRef<any>;

  protected caller: string;

  constructor(
    protected cfr: ComponentFactoryResolver,
    protected injector: Injector,
    protected dynLoader: DynLoaderService,
  ) { }

  private async dynLoadTheModule(): Promise<void> {
    const moduleFactory = await this.dynLoader.getModuleFactory('dyn-module');
    const moduleRef = moduleFactory.create(this.injector);
    this.dynModuleModuleRef = moduleRef;
    this.dynLoadTheModuleCom(moduleRef);
  }

  private dynLoadTheModuleCom(moduleRef: NgModuleRef<any>, isCom1: boolean = true): void {
    // 这边必须用moduleRef.componentFactoryResolver加载组件，
    // 如果用this.cfr会报DI错误
    import('./../dyn-module/index').then(comIndex => {
      const { DynModuleComponent, DynModuleCom2Component } = comIndex;
      const component: Type<any> = isCom1 ? DynModuleComponent : DynModuleCom2Component;
      const comRef = this.dynModule.createComponent(moduleRef.componentFactoryResolver.resolveComponentFactory(component));
      comRef.instance.caller = this.caller;
    });
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
