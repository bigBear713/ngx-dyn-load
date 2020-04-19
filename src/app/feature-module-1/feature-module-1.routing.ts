import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

import { FeatureModule1Component } from './feature-module-1.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureModule1Component
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureModule1RoutesModule { }
