import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { CheckBoxesComponent } from './components/checkboxes/checkboxes.component';
import { GraphAverageComponent } from './components/graph-average/graph-average.component';
import { HeaderComponent } from './components/header/header.component';
import { IconInfoComponent } from './components/icon-info/icon-info.component';
import { InputComponent } from './components/input/input.component';
import { ListPreviousExamsComponent } from './components/list-previous-exams/list-previous-exams.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuCategoryComponent } from './components/menu-category/menu-category.component';
import { MiniProgressBarExamComponent } from './components/mini-progress-bar/mini-progress-bar-exam.component';
import { EnarmModalComponent } from './components/enarm.modal/enarm.modal';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressBarExamComponent } from './components/progress-bar-exam/progress-bar-exam.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { QuestionsBarComponent } from './components/questions-bar/questions-bar.component';
import { RadioButtonComponent } from './components/radiobuttons/radiobuttons.component';
import { SelectComponent } from './components/select/select.component';
import { StatusExamComponent } from './components/status-exam/status-exam.component';
import { TimerComponent } from './components/timer/timer.component';
import { ToastPhrasesComponent } from './components/toast-phrases/toast-phrases.component';
import { ToastQuotesComponent } from './components/toast-quotes/toast-quotes.component';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';


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
    LoadingComponent,
    TimerComponent,
    QuestionsBarComponent,
    PaginationComponent,
    HeaderComponent,
    SelectComponent,
    MenuCategoryComponent,
    CheckBoxesComponent,
    RadioButtonComponent,
    ToggleSwitchComponent,
    IconInfoComponent,
    EnarmModalComponent
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
    LoadingComponent,
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
    EnarmModalComponent,
    HeaderComponent,
    SelectComponent,
    MenuCategoryComponent,
    CheckBoxesComponent,
    RadioButtonComponent,
    ToggleSwitchComponent,
    IconInfoComponent
  ]
})
export class SharedModule { } 