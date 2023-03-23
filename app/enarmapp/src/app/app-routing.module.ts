import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthRoutingGuard } from './shared/services/auth-routing.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},{
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    canActivate: [AuthRoutingGuard],
    loadChildren: () =>
      import('./modules/home/home.module').then(
        (mod) => mod.HomeModule
      ),
  },
  {
    path: 'configurator',
    canActivate: [AuthRoutingGuard],
    loadChildren: () =>
      import('./modules/configurator/configurator.module').then(
        (mod) => mod.ConfiguratorModule
      )
  },
  {
    path: 'exam',
    canActivate: [AuthRoutingGuard],
    loadChildren: () =>
      import('./modules/exam/exam.module').then(
        (mod) => mod.ExamModule
      )
  },
  {
    path: 'previous-exams',
    canActivate: [AuthRoutingGuard],
    loadChildren: () =>
      import('./modules/previous-exams/previous-exams.module').then(
        (mod) => mod.PreviousExamsModule
      )
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then(
        (mod) => mod.AdminModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
