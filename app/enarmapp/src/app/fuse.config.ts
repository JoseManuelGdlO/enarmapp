import { NgModule } from '@angular/core';
import { provideIcons } from './core/icons/icons.provider'; // Ajusta la ruta si es necesario
import { provideFuse } from '@fuse';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { mockApiServices } from 'app/mock-api';

@NgModule({
  providers: [
    provideAnimations(),
    // Material Date Adapter
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
    },
    provideIcons(),
    provideFuse({
      mockApi: {
        delay   : 0,
        services: mockApiServices,
    },
    fuse   : {
        layout : 'classy',
        scheme : 'light',
        screens: {
            sm: '600px',
            md: '960px',
            lg: '1280px',
            xl: '1440px',
        },
        theme  : 'default',
        themes : [
            {
                id  : 'theme-default',
                name: 'Default',
            },
            {
                id  : 'theme-brand',
                name: 'Brand',
            },
            {
                id  : 'theme-teal',
                name: 'Teal',
            },
            {
                id  : 'theme-rose',
                name: 'Rose',
            },
            {
                id  : 'theme-purple',
                name: 'Purple',
            },
            {
                id  : 'theme-amber',
                name: 'Amber',
            },
        ],
    },
    }),
  ],
})
export class FuseConfigModule { }
