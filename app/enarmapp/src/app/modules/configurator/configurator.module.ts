import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { ConfiguratorComponent } from './pages/configurator/configurator.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { MatSliderModule } from '@angular/material/slider';




@NgModule({
  declarations: [
    ConfiguratorComponent
  ],
  imports: [
    CommonModule,
    ConfiguratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxBootstrapIconsModule.pick(allIcons),
    MatSliderModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ConfiguratorModule { }