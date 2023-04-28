import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { LaboratoryComponent } from './pages/laboratory/laboratory.component';
import { SubscriptionComponent } from './pages/subscriptions/subscription.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ListQuestionsComponent } from './pages/questions/list-questions/list-questions.component';
import { QuestionsComponent } from './pages/questions/questions/questions.component';

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
    path: 'questions',
    children: [
      {
        path: '',
        component: ListQuestionsComponent
      },
      {
        path: 'add',
        component: QuestionsComponent
      }
    ]
  },
  {
    path: 'laboratory',
    component: LaboratoryComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
