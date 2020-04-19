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

import { DynModuleCom2Component } from './dyn-module/components/dyn-module-com-2/dyn-module-com-2.component';
import { DynModuleComponent } from './dyn-module/dyn-module.component';
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
    const component: Type<DynModuleComponent | DynModuleCom2Component> = isCom1 ? DynModuleComponent : DynModuleCom2Component;
    this.appDynModule.createComponent(moduleRef.componentFactoryResolver.resolveComponentFactory(component));
  }

  private loadModuleFactory(module: any): Promise<NgModuleFactory<any>> {
    if (module instanceof NgModuleFactory) {
      return new Promise(resolve => resolve(module));
    } else {
      return this.compiler.compileModuleAsync(module);
    }
  }


}
