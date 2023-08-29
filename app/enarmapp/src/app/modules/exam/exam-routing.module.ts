import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './pages/exam/exam.component';
import { ExamsComponent } from './pages/exams/exams.component';

const routes: Routes = [
  {
    path: 'work/:id',
    component: ExamComponent
  },
  {
    path: 'exams',
    component: ExamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
