import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './pages/exam/exam.component';
import { ExamsComponent } from './pages/exams/exams.component';

const routes: Routes = [
  {
    path: 'work/:id',
    title: 'Examen',
    component: ExamComponent
  },
  {
    path: 'exams',
    title: 'Examenes',
    component: ExamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
