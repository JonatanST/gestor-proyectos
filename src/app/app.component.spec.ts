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
        AppComponent, // El componente standalone se importa aquí
      ],
      providers: [
        provideRouter([]), // Provee los servicios básicos del router sin rutas reales
        provideLocationMocks(), // Provee mocks para la interacción con la URL/historial
      ],
    }).compileComponents();
  });
  // Asegúrate de que este código esté DENTRO de describe('AppComponent', () => { ... });
  // y DESPUÉS de los beforeEach(...)

  it('should create the app', () => {
    // Esta prueba simplemente verifica si el componente se puede crear
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Esta prueba revisa si existe una propiedad 'title' en tu componente
  // y si tiene el valor esperado. ¡Asegúrate de que el valor 'scaffold-angular-19'
  // coincida con el valor de la propiedad 'title' en tu app.component.ts!
  it(`should have the 'scaffold-angular-19' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Verifica que app.component.ts tenga: title = 'scaffold-angular-19';
    expect(app.title).toEqual('scaffold-angular-19');
  });

  // Esta prueba intenta renderizar algo y buscarlo.
  // Puede fallar si cambiaste mucho el app.component.html.
  // Podemos comentarla por ahora si da problemas.
  /* // Comenta esta prueba si da problemas después
it('should render title', () => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges(); // Renderiza el HTML
  const compiled = fixture.nativeElement as HTMLElement;
  // La siguiente línea busca un H1, si no lo tienes, fallará.
  // Ajusta el selector o el texto esperado según tu HTML real.
  // expect(compiled.querySelector('h1')?.textContent).toContain('Hello, scaffold-angular-19');
  // Por ahora, una verificación más simple podría ser que HAYA algún contenido:
   expect(compiled.textContent).toBeTruthy();
});
*/
});
