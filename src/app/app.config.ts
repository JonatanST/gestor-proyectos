import { type ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { LoggerService } from './core/services/logger.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // proveedor de deteccion de cambios con fusión de eventos en 'true'
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    LoggerService,
    // ... otros providers globales irían aquí (HttpClient, etc.)
  ],
};
