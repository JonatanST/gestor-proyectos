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
import { ComponentFixture, TestBed } from '@angular/core/testing';
//Importamos los servicios que inyecta y provee mocks para ellos
import { LoggerService } from '../../../../core/services/logger.service';
// Importa el componente standalone que vamos a probar
import { DashboardPageComponent } from './dashboard-page.component';

// Crear un mock simple para LoggerService
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
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let mockLoggerService: LoggerService; // Variable para guardar la instancia del mock

  beforeEach(async () => {
    // Configura el TestBed
    await TestBed.configureTestingModule({
      // Para componentes standalone, se usa 'imports' en lugar de 'declarations'
      imports: [DashboardPageComponent],
      providers: [
        // Provee el mock en lugar del servicio real
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    }).compileComponents(); // Puede ser necesario si usas templateUrl/styleUrl

    // Crea el componente dentro del entorno de TestBed
    fixture = TestBed.createComponent(DashboardPageComponent);
    // Obtiene la instancia de la clase del componente
    component = fixture.componentInstance;
    // Obtiene la instancia del mock que fue inyectada (opcional, pero útil)
    mockLoggerService = TestBed.inject(LoggerService);
    // Dispara la detección de cambios inicial para renderizar el HTML
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica que el componente se creó correctamente
    expect(component).toBeTruthy();
  });

  it('should display default message', () => {
    // Verifica que el HTML renderizado contenga el texto esperado
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('dashboard-page works!');
  });

  it('should call logger on init', () => {
    // Espía el método 'log' del mock ANTES de que ngOnInit se llame (o llámalo de nuevo)
    // NOTA: ngOnInit ya se llamó en el fixture.detectChanges() del beforeEach.
    // Para probarlo mejor, podríamos espiar antes de crear el componente o
    // llamar ngOnInit explícitamente aquí (menos ideal) o refactorizar.
    // Por simplicidad ahora, asumamos que queremos verificar si llamó al logger.
    // Sería mejor espiar en el beforeEach ANTES de fixture.detectChanges si es posible,
    // o espiar el mock directamente.

    spyOn(mockLoggerService, 'log').and.callThrough(); // Espía el mock
    spyOn(mockLoggerService, 'warn').and.callThrough();

    component.ngOnInit(); // Llama manualmente para asegurar (no siempre es la mejor práctica)

    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'DashboardPageComponent se ha inicializado.'
    );
    expect(mockLoggerService.warn).toHaveBeenCalledWith(
      'Advertencia de ejemplo desde el dashboard.'
    );
  });
});
