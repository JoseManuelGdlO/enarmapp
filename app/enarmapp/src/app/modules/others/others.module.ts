import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxBootstrapIconsModule, allIcons } from "ngx-bootstrap-icons";
import { QuillModule } from "ngx-quill";
import { SharedModule } from "app/shared/shared.module";
import { OthersRoutingModule } from "./others-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        OthersRoutingModule,
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
export class OthersModule { }