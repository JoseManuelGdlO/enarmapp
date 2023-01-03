import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { ToastPhrasesComponent } from './components/toast-phrases/toast-phrases.component';





@NgModule({
  declarations: [
    ToastPhrasesComponent,
    ButtonComponent
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
    ButtonComponent
  ]
})
export class SharedModule { }