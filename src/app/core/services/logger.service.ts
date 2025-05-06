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
import { Injectable } from '@angular/core';

// No necesitamos providedIn: 'root' aquí, lo haremos en app.config.ts
@Injectable() 
export class LoggerService {

  constructor() { }

  log(message: string): void {
    console.log(`[INFO]: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN]: ${message}`);
  }

  error(message: string, error?: any): void {
    console.error(`[ERROR]: ${message}`, error ?? '');
  }
}
