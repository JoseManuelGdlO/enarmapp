import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { LaboratoryComponent } from './pages/laboratory/laboratory.component';
import { SubscriptionComponent } from './pages/subscriptions/subscription.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ListQuestionsComponent } from './pages/questions/list-questions/list-questions.component';
import { QuestionsComponent } from './pages/questions/questions/questions.component';
import { MasiveQuestions } from './pages/questions/masive-question/masive-questions.component';

const routes: Routes = [
  {
    path: '',
    title: 'Admin',
    component: AdminComponent
  },
  {
    path: 'subscripciones',
    title: 'Subscripciones',
    component: SubscriptionComponent
  },
  {
    path: 'configurations',
    title:  'Configuraciones',
    component: ConfigurationsComponent
  },
  {
    path: 'questions',
    title: 'Preguntas',
    children: [
      {
        path: '',
        title: 'Listado de preguntas',
        component: ListQuestionsComponent
      },
      {
        path: 'add',
        title: 'Agregar pregunta',
        component: QuestionsComponent
      },
      {
        path: 'edit/:id',
        title: 'Editar pregunta',
        component: QuestionsComponent
      },
      {
        path: 'masive-questions',
        title: 'Carga masiva de preguntas',
        component: MasiveQuestions
      }
    ]
  },
  {
    path: 'laboratory',
    title: 'Laboratorio',
    component: LaboratoryComponent
  },
  {
    path: 'categories',
    title: 'Categorías',
    component: CategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
