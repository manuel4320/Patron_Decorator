import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    // Añade esto para permitir los modelos de TF
    { provide: 'WINDOW', useValue: window }
  ]
};