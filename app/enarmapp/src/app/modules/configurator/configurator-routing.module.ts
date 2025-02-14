import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorComponent } from './pages/configurator/configurator.component';

const routes: Routes = [
    {
        path: '',
        title: 'Configurador',
        component: ConfiguratorComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguratorRoutingModule { }
