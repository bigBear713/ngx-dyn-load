import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

const routes: Routes = [
  {
    path: 'fm-1',
    loadChildren: () => import('./feature-module-1/feature-module-1.module').then(m => m.FeatureModule1Module)
  },
  {
    path: 'fm-2',
    loadChildren: () => import('./feature-module-2/feature-module-2.module').then(m => m.FeatureModule2Module)
  },
  {
    path: '',
    redirectTo: 'fm-1',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'fm-1'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
