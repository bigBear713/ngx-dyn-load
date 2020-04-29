import {
    NgModuleFactory,
    Type
} from '@angular/core';

export const moduleList: { path: string, loadChildren: () => Promise<NgModuleFactory<any> | Type<any>> }[] = [
  {
    path: 'dyn-module',
    loadChildren: () => import('../dyn-module/dyn-module.module').then(m => m.DynModuleModule)
  }
];

export function dynLoadModulsList() {
  const result = {};
  for (const w of moduleList) {
    result[w.path] = w.loadChildren;
  }
  return result;
}
