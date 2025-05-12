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

import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Se importa el componente standalone
        AppComponent,
      ],
      providers: [
        // Provee los servicios básicos del router sin rutas reales
        provideRouter([]),
        // Provee mocks para la interacción con la URL/historial
        provideLocationMocks(),
      ],
      // compila el componente de manera asincrona
      // Esto es útil para componentes que usan templates externos o estilos
      // o que tienen dependencias que necesitan ser resueltas antes de la prueba
    }).compileComponents();
  });

  // Esta prueba simplemente verifica si el componente se puede crear
  it('should create the app', () => {
    // Crea una instancia del componente
    const fixture = TestBed.createComponent(AppComponent);
    // accedemos al componente a través de la instancia del fixture
    const app = fixture.componentInstance;
    // Verifica que la instancia del componente se haya creado correctamente
    expect(app).toBeTruthy();
  });

  // Esta prueba Verifica que el componente tiene una propiedad title y que su valor es 'scaffold-angular-19'.
  it(`should have the 'scaffold-angular-19' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Verifica que app.component.ts tenga: title = 'scaffold-angular-19';
    expect(app.title).toEqual('scaffold-angular-19');
  });
});
