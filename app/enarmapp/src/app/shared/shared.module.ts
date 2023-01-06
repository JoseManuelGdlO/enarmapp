import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { GraphAverageComponent } from './components/graph-average/graph-average.component';
import { ListPreviousExamsComponent } from './components/list-previous-exams/list-previous-exams.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ToastPhrasesComponent } from './components/toast-phrases/toast-phrases.component';





@NgModule({
  declarations: [
    ToastPhrasesComponent,
    ButtonComponent,
    ProgressBarComponent,
    ListPreviousExamsComponent,
    GraphAverageComponent
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
    ButtonComponent,
    ProgressBarComponent,
    ListPreviousExamsComponent,
    GraphAverageComponent
  ]
})
export class SharedModule { }