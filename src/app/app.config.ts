/**
 * @Licencia:
 * @ Archivo: LICENSE
 * @ Fecha: 2025
 * @ Todos los derechos de propiedad intelectual e industrial sobre esta
 * @ aplicacion son de propiedad exclusiva del GRUPO ASD S.A.S.
 * @ Su uso, alteracion, reproduccion o modificacion sin el debido
 * @ consentimiento por escrito de GRUPO ASD S.A.S. quedan totalmente prohibidos.
 * @
 * @ Este programa se encuentra protegido por las disposiciones de la
 * @ Ley 23 de 1982 y demas normas concordantes sobre derechos de autor y
 * @ propiedad intelectual. Su uso no autorizado dara lugar a las sanciones
 * @ previstas en la Ley.
 * @
 */

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
