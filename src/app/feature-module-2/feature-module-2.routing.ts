import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

import { FeatureModule2Component } from './feature-module-2.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureModule2Component
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureModule2RoutesModule { }
