import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviousExamsRoutingModule } from './previous-exams-routing.module';
import { PreviousExamsComponent } from './pages/previous-exams/previous-exams.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';




@NgModule({
  declarations: [
    PreviousExamsComponent
  ],
  imports: [
    CommonModule,
    PreviousExamsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PreviousExamsModule { }