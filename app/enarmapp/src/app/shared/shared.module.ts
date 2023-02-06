import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { CheckBoxesComponent } from './components/checkboxes/checkboxes.component';
import { GraphAverageComponent } from './components/graph-average/graph-average.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { ListPreviousExamsComponent } from './components/list-previous-exams/list-previous-exams.component';
import { MenuCategoryComponent } from './components/menu-category/menu-category.component';
import { MiniProgressBarExamComponent } from './components/mini-progress-bar/mini-progress-bar-exam.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressBarExamComponent } from './components/progress-bar-exam/progress-bar-exam.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { QuestionsBarComponent } from './components/questions-bar/questions-bar.component';
import { SelectComponent } from './components/select/select.component';
import { StatusExamComponent } from './components/status-exam/status-exam.component';
import { TimerComponent } from './components/timer/timer.component';
import { ToastPhrasesComponent } from './components/toast-phrases/toast-phrases.component';
import { ToastQuotesComponent } from './components/toast-quotes/toast-quotes.component';





@NgModule({
  declarations: [
    ToastPhrasesComponent,
    ToastQuotesComponent,
    ProgressBarExamComponent,
    ButtonComponent,
    ProgressBarComponent,
    ListPreviousExamsComponent,
    GraphAverageComponent,
    MiniProgressBarExamComponent,
    StatusExamComponent,
    InputComponent,
    TimerComponent,
    QuestionsBarComponent,
    PaginationComponent,
    HeaderComponent,
    SelectComponent,
    MenuCategoryComponent,
    CheckBoxesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    ToastPhrasesComponent,
    ToastQuotesComponent,
    ButtonComponent,
    ProgressBarComponent,
    ProgressBarExamComponent,
    MiniProgressBarExamComponent,
    ListPreviousExamsComponent,
    GraphAverageComponent,
    StatusExamComponent,
    InputComponent,
    PaginationComponent,
    TimerComponent,
    QuestionsBarComponent,
    HeaderComponent,
    SelectComponent,
    MenuCategoryComponent,
    CheckBoxesComponent
  ]
})
export class SharedModule { }