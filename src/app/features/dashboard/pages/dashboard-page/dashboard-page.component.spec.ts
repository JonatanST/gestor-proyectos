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

// importa  métodos para interactuar con el componente y su DOM durante las pruebas
import { ComponentFixture, TestBed } from '@angular/core/testing';
//Importamos los servicios que inyecta y provee mocks para ellos
import { LoggerService } from '../../../../core/services/logger.service';
// Importa el componente standalone que vamos a probar
import { DashboardPageComponent } from './dashboard-page.component';

import { By } from '@angular/platform-browser';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';

// Crear un mock simple para LoggerService
// Los métodos están vacíos porque no necesitamos que hagan nada real, solo necesitamos poder espiarlos.
class MockLoggerService {
  log(_message: string): void {
    /* Mock */
  }
  warn(_message: string): void {
    /* Mock */
  }
  error(_message: string, _error?: unknown): void {
    /* Mock */
  }
}

describe('DashboardPageComponent', () => {
  //  representa el componente en sí, permitiendo acceder a sus propiedades y métodos.
  let component: DashboardPageComponent;
  //  representa el entorno del componente, incluyendo su HTML renderizado.
  let fixture: ComponentFixture<DashboardPageComponent>;
  // guardamos la instancia del mock inyectado.
  let mockLoggerService: LoggerService;

  beforeEach(async () => {
    // Configura el TestBed
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
      providers: [
        // Provee el mock en lugar del servicio real
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    }).compileComponents(); // Puede ser necesario si se usa templateUrl/styleUrl

    // Crea el componente dentro del entorno de TestBed
    fixture = TestBed.createComponent(DashboardPageComponent);
    // Obtiene la instancia de la clase del componente
    component = fixture.componentInstance;
    // Obtiene la instancia del mock que fue inyectada
    mockLoggerService = TestBed.inject(LoggerService);
    // Dispara la detección de cambios inicial para renderizar el HTML y llama a los lifecycle hooks como ngOnInit
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica que el componente se creó correctamente
    expect(component).toBeTruthy();
  });

  // Verifica que el HTML renderizado contenga el texto esperado
  it('should display default message', () => {
    // Accede al DOM renderizado
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('dashboard-page works!');
  });

  it('should call logger on init', () => {
    // Espía los métodos del mock para verificar que fueron llamados
    spyOn(mockLoggerService, 'log').and.callThrough(); // Espía el mock
    spyOn(mockLoggerService, 'warn').and.callThrough();

    component.ngOnInit(); // Llamamos al método del ciclo de vida para asegurar

    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'DashboardPageComponent se ha inicializado.'
    );
    expect(mockLoggerService.warn).toHaveBeenCalledWith(
      'Advertencia de ejemplo desde el dashboard.'
    );
  });

  it('should call handleDashboardButtonClick and log when app-custom-button is clicked', () => {
    // Espía el método del componente que se va a llamar
    spyOn(component, 'handleDashboardButtonClick').and.callThrough();
    // Espía el método del logger que se espera que llame el handler
    spyOn(mockLoggerService, 'log'); // Asumiendo que mockLoggerService ya está disponible

    // Encuentra el app-custom-button. Puedes buscar por el tag o por una clase/id si lo tuviera.
    // Usaremos el tipo de directiva para ser más precisos
    const customButtonDebugElement = fixture.debugElement.query(
      By.directive(CustomButtonComponent)
    );

    // Simula la emisión del evento 'buttonClick' desde el CustomButtonComponent
    // Pero emitir el output es más directo para probar la conexión:
    customButtonDebugElement.triggerEventHandler('buttonClick', {
      /* mock MouseEvent si es necesario */
    });

    fixture.detectChanges(); // Actualiza si el handler cambia algo en la vista

    expect(component.handleDashboardButtonClick).toHaveBeenCalled();
    expect(mockLoggerService.log).toHaveBeenCalledWith('¡Botón del Dashboard clickeado!');
  });
});
