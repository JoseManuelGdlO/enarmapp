import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthRoutingGuard } from './shared/services/auth-routing.guard';
import { LayoutComponent } from './layout/layout.component';
import { initialDataResolver } from './app.resolvers';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},{
    path: 'login',
    title: 'Login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    title: 'Inicio',
    canActivate: [AuthRoutingGuard],
    loadChildren: () =>
      import('./modules/home/home.module').then(
        (mod) => mod.HomeModule
      ),
  },
  {
    path: 'configurator',
    title: 'Configurador',
    canActivate: [AuthRoutingGuard],
    loadChildren: () =>
      import('./modules/configurator/configurator.module').then(
        (mod) => mod.ConfiguratorModule
      )
  },
  {
    path: 'exam',
    title: 'Examen',
    canActivate: [AuthRoutingGuard],
    loadChildren: () =>
      import('./modules/exam/exam.module').then(
        (mod) => mod.ExamModule
      )
  },
  {
    path: 'previous-exams',
    title: 'Examenes anteriores',
    canActivate: [AuthRoutingGuard],
    loadChildren: () =>
      import('./modules/previous-exams/previous-exams.module').then(
        (mod) => mod.PreviousExamsModule
      )
  }, 
  {
    path: 'admin',
    title: 'Administrador',
    canActivate: [AuthRoutingGuard],
    component: LayoutComponent,
    resolve: {
        initialData: initialDataResolver
    },
    loadChildren: () =>
      import('./modules/admin/admin.module').then(
        (mod) => mod.AdminModule
      )
  },
  {
    path: 'others',
    title: 'Otros',
    loadChildren: () =>
      import('./modules/others/others.module').then(
        (mod) => mod.OthersModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
