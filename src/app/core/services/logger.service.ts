/*
 Licencia: 
  * Archivo: LICENSE
  * Fecha: 2025
  * Todos los derechos de propiedad intelectual e industrial sobre esta
  * aplicacion son de propiedad exclusiva del GRUPO ASD S.A.S.
  * Su uso, alteracion, reproduccion o modificacion sin el debido
  * consentimiento por escrito de GRUPO ASD S.A.S. quedan totalmente prohibidos.
  *
  * Este programa se encuentra protegido por las disposiciones de la
  * Ley 23 de 1982 y demas normas concordantes sobre derechos de autor y
  * propiedad intelectual. Su uso no autorizado dara lugar a las sanciones
  * previstas en la Ley.
  * @FilePath: 
 */

import { Injectable } from '@angular/core';

// No necesitamos providedIn: 'root' aquí, lo haremos en app.config.ts
@Injectable()
export class LoggerService {
  log(message: string): void {
    // biome-ignore lint/suspicious/noConsole: Logger service needs console.log
    console.log(`[INFO]: ${message}`);
  }

  warn(message: string): void {
    // biome-ignore lint/suspicious/noConsole: Logger service needs console.log
    console.warn(`[WARN]: ${message}`);
  }

  error(message: string, error?: unknown): void {
    // biome-ignore lint/suspicious/noConsole: Logger service needs console.log
    console.error(`[ERROR]: ${message}`, error ?? '');
  }
}
