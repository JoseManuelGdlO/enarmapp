import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},{
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(
        (mod) => mod.HomeModule
      ),
  },
  {
    path: 'configurator',
    loadChildren: () =>
      import('./modules/configurator/configurator.module').then(
        (mod) => mod.ConfiguratorModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
