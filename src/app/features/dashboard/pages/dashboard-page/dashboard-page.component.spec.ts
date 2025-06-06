//Dashboard spec importa  métodos para interactuar con el componente y su DOM durante las pruebas
import { ComponentFixture, TestBed } from '@angular/core/testing';
//Importamos los servicios que inyecta y provee mocks para ellos
import { LoggerService } from '../../../../core/services/logger.service';
// Importa el componente standalone que vamos a probar
import { DashboardPageComponent } from './dashboard-page.component';

import { By } from '@angular/platform-browser';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { ActivatedRoute } from '@angular/router';

// Crear un mock simple para LoggerService
// Los métodos están vacíos porque no necesitamos que hagan nada real, solo necesitamos poder espiarlos.
// Mock del LoggerService
class MockLoggerService {
  log(_message: string): void {}
  warn(_message: string): void {}
  error(_message: string, _error?: unknown): void {}
}

// Mock del ActivatedRoute
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (_key: string) => null,
    },
  },
};

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
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
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
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Crea y administra tus proyectos de forma efectiva.'
    );
  });

  it('should call logger on init', () => {
    spyOn(mockLoggerService, 'log');
    spyOn(mockLoggerService, 'warn');

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // ngOnInit se llama aquí

    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'DashboardPageComponent se ha inicializado.'
    );
    expect(mockLoggerService.warn).toHaveBeenCalledWith(
      'Advertencia de ejemplo desde el dashboard.'
    );
  });

  it('should display the "IR A PROYECTOS" button', () => {
    const buttonElement =
      fixture.nativeElement.querySelector('button.btn-primary');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.textContent).toContain('IR A PROYECTOS');
  });
});
