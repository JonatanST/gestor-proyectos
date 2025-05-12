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
import { By } from '@angular/platform-browser';
import { CustomButtonComponent } from './custom-button.component';

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit buttonClick event when enabled and clicked', () => {
    spyOn(component.buttonClick, 'emit'); // Espía el EventEmitter
    component.isDisabled = false; // Asegura que el botón esté habilitado
    fixture.detectChanges();

    // Encuentra el botón nativo en la plantilla del CustomButtonComponent y haz clic
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();

    expect(component.buttonClick.emit).toHaveBeenCalled();
    // Opcionalmente, puedes verificar con qué se emitió:
    // expect(component.buttonClick.emit).toHaveBeenCalledWith(jasmine.any(MouseEvent));
  });

  it('should NOT emit buttonClick event when disabled and clicked', () => {
    spyOn(component.buttonClick, 'emit');
    // Asegura que el botón esté DESHABILITADO
    component.isDisabled = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    // Verifica que NO se llamó
    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });
});
