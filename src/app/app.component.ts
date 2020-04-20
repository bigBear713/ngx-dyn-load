import {
    Compiler,
    Component,
    Injector,
    NgModuleFactory,
    NgModuleRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { DynModuleModule } from './dyn-module/dyn-module.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('appDynModule', { read: ViewContainerRef, static: true }) appDynModule: ViewContainerRef;

  constructor(
    protected compiler: Compiler,
    protected injector: Injector,
  ) { }

  ngOnInit() {
    this.dynLoadTheModule();
  }

  ngAfterViewInit(): void {
  }

  private async dynLoadTheModule(): Promise<void> {
    return import('./dyn-module/dyn-module.module').then(m => {
      return this.loadModuleFactory(m.DynModuleModule).then(moduleFactory => {
        const moduleRef = moduleFactory.create(this.injector);
        this.dynLoadTheModuleCom(moduleRef);
      });
    });
  }

  private dynLoadTheModuleCom(moduleRef: NgModuleRef<DynModuleModule>, isCom1: boolean = true): void {
    // 这边必须用moduleRef.componentFactoryResolver加载组件，
    // 如果用this.cfr会报DI错误
    // 需要通过import的方式引入要加载的组件，否则相关代码还是会编译在main.js中
    import('./dyn-module/index').then(comIndex => {
      const { DynModuleComponent, DynModuleCom2Component } = comIndex;
      const component: Type<any> = isCom1 ? DynModuleComponent : DynModuleCom2Component;
      this.appDynModule.createComponent(moduleRef.componentFactoryResolver.resolveComponentFactory(component));
    });
  }

  private loadModuleFactory(module: any): Promise<NgModuleFactory<any>> {
    if (module instanceof NgModuleFactory) {
      return new Promise(resolve => resolve(module));
    } else {
      // 这个this.compiler在aot编译下虽然能编译成功，但是会报错
      return this.compiler.compileModuleAsync(module);
    }
  }

}
