# Guía de Pruebas

Este documento detalla el enfoque y las herramientas utilizadas para las pruebas automatizadas en este scaffold de Angular, cubriendo tanto pruebas unitarias como pruebas de componentes.

## Introducción a las Pruebas

Las pruebas automatizadas son una parte crucial del desarrollo de software de calidad. Nos ayudan a:
* Asegurar que el código funciona como se espera.
* Prevenir regresiones (errores introducidos por cambios futuros).
* Servir como documentación viva del comportamiento del código.
* Facilitar la refactorización segura.

Este scaffold utiliza la configuración de pruebas estándar proporcionada por Angular CLI.

## Herramientas de Prueba Utilizadas

* **[Karma](https://karma-runner.github.io/latest/index.html):** Es el ejecutor de pruebas (test runner). Se encarga de lanzar un navegador, cargar los archivos de prueba y la aplicación, ejecutar las pruebas y reportar los resultados.
* **[Jasmine](https://jasmine.github.io/):** Es el framework de pruebas. Proporciona la sintaxis y las funciones para escribir las pruebas (ej. `describe()`, `it()`, `expect()`, `spyOn()`).
* **[Angular Testing Utilities (`@angular/core/testing`)](https://angular.dev/guide/testing/components-basics):** Un conjunto de herramientas proporcionadas por Angular para facilitar la prueba de componentes y la interacción con el sistema de Inyección de Dependencias (DI) en un entorno de prueba. La herramienta principal aquí es `TestBed`.
* **[Navegador (Chrome/ChromeHeadless)](https://karma-runner.github.io/6.4/config/configuration-file.html):** Las pruebas se ejecutan en un navegador real para simular el entorno del usuario. Para CI/CD, se usa `ChromeHeadless`.

## Tipos de Pruebas

### 1. Pruebas Unitarias (Para Servicios, Pipes, Lógica Pura)

* **Objetivo:** Probar unidades de código aisladas (clases TypeScript, funciones individuales, la lógica interna de un pipe o servicio) sin depender del DOM o de gran parte del framework Angular.
* **Ejemplo:** `src/app/core/services/logger.service.spec.ts`
* **Características:**
    * Se centran en la lógica de la clase o función.
    * Las dependencias suelen ser reemplazadas por "mocks" (objetos simulados) o "spies" de Jasmine.
    * Generalmente no se necesita `TestBed` de forma intensiva, aunque `TestBed.inject()` puede usarse para obtener instancias de servicios si están provistos en un `TestBed.configureTestingModule()` muy simple.
    * Son rápidas de ejecutar.

**Ejemplo de Prueba Unitaria para un Servicio:**
```typescript
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    service = new LoggerService(); // O usando TestBed.inject(LoggerService) si se provee
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('log method should call console.log with [INFO] prefix', () => {
    spyOn(console, 'log'); // Espía a console.log
    const message = 'Test message';
    service.log(message);
    expect(console.log).toHaveBeenCalledWith(`[INFO]: ${message}`);
  });
  // Pruebas similares para warn() y error()
});
```

### 2. Pruebas de Componentes

* **Objetivo:** Probar la interacción entre la clase TypeScript de un componente y su plantilla HTML. Esto incluye:
    - Renderizado correcto de la plantilla basado en el estado del componente.
    - Data binding (interpolación `{{ }}`, enlace de propiedades `[]`, enlace de eventos `()`).
    - Llamadas a métodos del componente desde la plantilla (ej. clics de botón).
    - Interacción con servicios inyectados (usualmente mocks).
* **Ejemplo:** `src/app/app.component.spec.ts`, `src/app/features/dashboard/pages/dashboard-page/dashboard-page.component.spec.ts`

**Ejemplo de Prueba de Componente:**
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiComponenteConcreto } from './mi-componente-concreto';

describe('MiComponenteConcreto', () => {
  let component: MiComponenteConcreto;
  let fixture: ComponentFixture<MiComponenteConcreto>;
  // let miServicioMock: MockMiServicio; // Para espiar

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiComponenteConcreto], // Si es standalone
      providers: [
        // { provide: MiServicioReal, useClass: MockMiServicio }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MiComponenteConcreto);
    component = fixture.componentInstance;
    // miServicioMock = TestBed.inject(MiServicioReal) as unknown as MockMiServicio;
    fixture.detectChanges(); // Renderizado inicial
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title from component property', () => {
    component.titulo = 'Hola Pruebas';
    fixture.detectChanges(); // Actualiza el HTML
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Hola Pruebas');
  });

  it('should call method on button click', () => {
    spyOn(component, 'miMetodo'); // Espía un método del componente
    const button = fixture.debugElement.query(By.css('button.mi-boton')).nativeElement;
    button.click();
    expect(component.miMetodo).toHaveBeenCalled();
  });
});
```

---

## Ejecución de Pruebas

**Para desarrollo (con observador y navegador visible):**
```bash
npm test
# o
ng test
```

**Para Integración Continua (CI) (headless, una sola ejecución, con cobertura):**
```bash
npm run test:ci
# o
ng test --configuration=ci
```

---

## Instalación de Chrome Headless en Ubuntu (WSL)

Para ejecutar las pruebas en modo headless en entornos Ubuntu (incluyendo WSL), es necesario tener instalado Google Chrome. Sigue estos pasos:

1. **Descarga el paquete de instalación oficial:**
    ```bash
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
    ```

2. **Instala el paquete (puede mostrar advertencias de dependencias):**
    ```bash
    sudo dpkg -i google-chrome-stable_current_amd64.deb
    ```

3. **Corrige las dependencias faltantes (esto instalará lo necesario automáticamente):**
    ```bash
    sudo apt --fix-broken install -y
    ```

4. **Limpia el archivo descargado (opcional):**
    ```bash
    rm google-chrome-stable_current_amd64.deb
    ```

5. **Ejecuta las pruebas en modo headless:**
    ```bash
    npm run test:ci
    ```

> Ahora, Karma debería detectar Chrome automáticamente y ejecutar las pruebas en modo headless sin problemas.

---

## Cobertura de Código (Code Coverage)

Mide qué porcentaje del código fuente es ejecutado por las pruebas.

**Activación:** La configuración "ci" en angular.json tiene `"codeCoverage": true`.

**Reporte:** Después de ejecutar `npm run test:ci`, se genera una carpeta `coverage/` en la raíz del proyecto. Abre el archivo `coverage/[nombre-de-tu-proyecto]/index.html` en un navegador para ver un reporte detallado.

**Interpretación del Reporte:** 
- **Statements:** Porcentaje de sentencias de código ejecutadas.
- **Branches:** Porcentaje de bifurcaciones lógicas (ej. caminos de if/else) ejecutadas. Un valor bajo aquí indica lógica no probada.
- **Functions:** Porcentaje de funciones/métodos llamados.
- **Lines:** Porcentaje de líneas de código ejecutables cubiertas.

> **Cobertura mínima requerida:**  
> La cobertura mínima aceptada para este proyecto es **90%** en statements, branches, functions y lines. Si la cobertura cae por debajo de este umbral, la integración continua (CI) marcará el build como fallido.

---

> **Buenas prácticas:**  
> - Mantén las pruebas actualizadas al modificar o agregar código.
> - Escribe pruebas para cada nuevo componente, servicio, pipe o feature.
> - Consulta la [Guía de Desarrollo](./04-development-pattern.md) para ver cómo estructurar tus pruebas junto con el código fuente.

---