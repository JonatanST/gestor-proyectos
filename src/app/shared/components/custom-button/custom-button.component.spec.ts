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
