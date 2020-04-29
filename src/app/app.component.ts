import {
    Compiler,
    Component,
    Inject,
    Injector,
    NgModuleFactory,
    NgModuleRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { DynLoaderService } from './dyn-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('appDynModule', { read: ViewContainerRef, static: true }) appDynModule: ViewContainerRef;

  constructor(
    protected injector: Injector,
    private dynLoader: DynLoaderService,
  ) { }

  ngOnInit() {
    this.dynLoadTheModule();
  }

  ngAfterViewInit(): void {
  }

  private async dynLoadTheModule(): Promise<void> {
    // 必须通过工厂提供商的方式注入，才能在aot下正常使用
    const moduleFactory = await this.dynLoader.getModuleFactory('dyn-module');
    const moduleRef = moduleFactory.create(this.injector);
    this.dynLoadTheModuleCom(moduleRef);
  }

  private dynLoadTheModuleCom(moduleRef: NgModuleRef<any>, isCom1: boolean = true): void {
    // 这边必须用moduleRef.componentFactoryResolver加载组件，
    // 如果用this.cfr会报DI错误
    // 需要通过import的方式引入要加载的组件，否则相关代码还是会编译在main.js中
    import('./dyn-module/index').then(comIndex => {
      const { DynModuleComponent, DynModuleCom2Component } = comIndex;
      const component: Type<any> = isCom1 ? DynModuleComponent : DynModuleCom2Component;
      const comRef = this.appDynModule.createComponent(moduleRef.componentFactoryResolver.resolveComponentFactory(component));
      comRef.instance.caller = 'AppComponent';
    });
  }

}
