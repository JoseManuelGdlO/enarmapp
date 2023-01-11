import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviousExamsComponent } from './pages/previous-exams/previous-exams.component';

const routes: Routes = [
    {
        path: '',
        component: PreviousExamsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviousExamsRoutingModule { }
