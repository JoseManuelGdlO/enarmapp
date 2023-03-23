import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { LaboratoryComponent } from './pages/laboratory/laboratory.component';
import { SubscriptionComponent } from './pages/subscriptions/subscription.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'subscripciones',
    component: SubscriptionComponent
  },
  {
    path: 'configurations',
    component: ConfigurationsComponent
  },
  {
    path: 'laboratory',
    component: LaboratoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
