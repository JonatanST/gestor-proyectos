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
import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  // Configura TestBed con todo lo necesario (imports, providers con mocks, etc.).
  beforeEach(() => {
    // TestBed aquí se usa a veces solo para facilitar la inyección si el servicio tuviera dependencias,
    // pero para un servicio sin dependencias, podríamos hacer new LoggerService() directamente.
    TestBed.configureTestingModule({
      // Provee el servicio real para esta prueba
      providers: [LoggerService],
    });
    // Obtiene la instancia del servicio
    service = TestBed.inject(LoggerService);
    //service = new LoggerService();
  });

  it('should be created', () => {
    // Verifica que el servicio se pudo crear/inyectar
    expect(service).toBeTruthy();
  });

  it('should log messages using console.log', () => {
    // spyOn 'espía' el método console.log para saber si se llama
    spyOn(console, 'log');
    const message = 'Test log message';
    service.log(message);
    // Verifica que console.log fue llamado con el mensaje correcto
    expect(console.log).toHaveBeenCalledWith(`[INFO]: ${message}`);
  });

  // Prueba para el método warn
  it('should call console.warn with WARN prefix', () => {
    spyOn(console, 'warn');
    const message = 'Test warn';
    service.warn(message);
    expect(console.warn).toHaveBeenCalledWith(`[WARN]: ${message}`);
  });

  // prueba para el metodo error
  it('should call console.error with ERROR prefix when error argument is provided', () => {
    spyOn(console, 'error');
    const message = 'Test error with object';
    // Creamos un objeto de error
    const errObj = new Error('Actual error');
    // LLAMAMOS CON EL OBJETO DE ERROR
    service.error(message, errObj);
    // Verificamos que se usó el objeto
    expect(console.error).toHaveBeenCalledWith(`[ERROR]: ${message}`, errObj);
  });

  it('should call console.error with ERROR prefix and empty string when no error argument is provided', () => {
    spyOn(console, 'error');
    const message = 'Test error without object';
    // Llamamos al segundo argumento (error será undefined)
    service.error(message);
    // Verificamos que se usó la cadena vacía
    expect(console.error).toHaveBeenCalledWith(`[ERROR]: ${message}`, '');
  });
});
