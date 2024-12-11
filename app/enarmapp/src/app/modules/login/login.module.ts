import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MatMenuModule } from '@angular/material/menu';
import { FuseConfigModule } from 'app/fuse.config';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PricingComponent } from './pages/pricing/pricing.component';
import { FuseCardComponent } from '@fuse/components/card';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    PricingComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,    
    MatMenuModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    NgApexchartsModule,
    MatButtonModule,
    FuseCardComponent,
    MatIconModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoginModule { }
