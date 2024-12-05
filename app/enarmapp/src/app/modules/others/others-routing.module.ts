import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PolicyComponent } from "./pages/policy/policy.component";

const routes: Routes = [
    {
        path: 'privacy-policy',
        title: 'Política de privacidad',
        component: PolicyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OthersRoutingModule { }
