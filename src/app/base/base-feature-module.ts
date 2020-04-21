import {
    Compiler,
    ComponentFactoryResolver,
    Directive,
    Injector,
    NgModuleFactory,
    NgModuleRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { DynModuleModule } from '../dyn-module/dyn-module.module';

@Directive()
export class BaseFeatureModule {

  @ViewChild('dynCom', { read: ViewContainerRef }) dynCom: ViewContainerRef;
  @ViewChild('dynModule', { read: ViewContainerRef, static: true }) dynModule: ViewContainerRef;
  @ViewChild('dynModuleCom', { read: ViewContainerRef, static: true }) dynModuleCom: ViewContainerRef;

  protected dynModuleModuleRef: NgModuleRef<DynModuleModule>;

  protected caller: string;

  constructor(
    protected cfr: ComponentFactoryResolver,
    protected compiler: Compiler,
    protected injector: Injector,
  ) { }

  private async dynLoadTheCom(): Promise<void> {
    const { DynComponent } = await import('./../dyn-component/dyn-component');
    this.dynCom.createComponent(this.cfr.resolveComponentFactory(DynComponent));
  }

  private async dynLoadTheModule(): Promise<void> {
    // 模块的引入一般只要一次就行，后面如果要引入模块中的其它组件，
    // 直接引入并加载组件就可以，不用再引入初始化模块
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
    // 组件要通过import方式引入，如果直接使用，打包编译时，会被打包在common.xx.js中
    import('./../dyn-module/index').then(comIndex => {
      const { DynModuleComponent, DynModuleCom2Component } = comIndex;
      const component: Type<any> = isCom1 ? DynModuleComponent : DynModuleCom2Component;
      const comRef = this.dynModule.createComponent(moduleRef.componentFactoryResolver.resolveComponentFactory(component));
      comRef.instance.caller = this.caller;
    });
  }

  private loadModuleFactory(module: any): Promise<NgModuleFactory<any>> {
    if (module instanceof NgModuleFactory) {
      return new Promise(resolve => resolve(module));
    } else {
      return this.compiler.compileModuleAsync(module);
    }
  }

  onDynLoadCom(): void {
    this.dynLoadTheCom();
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
