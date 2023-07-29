import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { allIcons } from 'ngx-bootstrap-icons';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { SubscriptionComponent } from './pages/subscriptions/subscription.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { LaboratoryComponent } from './pages/laboratory/laboratory.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ListQuestionsComponent } from './pages/questions/list-questions/list-questions.component';
import { QuestionsComponent } from './pages/questions/questions/questions.component';
import { QuillModule } from 'ngx-quill';
import { QuestionComponent } from './pages/questions/questions/components/question.component';
import { MasiveQuestions } from './pages/questions/masive-question/masive-questions.component';

@NgModule({
  declarations: [
    AdminComponent,
    SubscriptionComponent,
    ConfigurationsComponent,
    MasiveQuestions,
    LaboratoryComponent,
    CategoriesComponent,
    QuestionsComponent,
    QuestionComponent,
    ListQuestionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons),
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdminModule { }