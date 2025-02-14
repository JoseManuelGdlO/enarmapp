import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamComponent } from './pages/exam/exam.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';
import { ExamsComponent } from './pages/exams/exams.component';




@NgModule({
  declarations: [
    ExamComponent,
    ExamsComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ExamModule { }