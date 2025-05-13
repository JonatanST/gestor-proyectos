# Tecnologías Utilizadas

Este documento describe las principales tecnologías, librerías y herramientas que conforman este scaffold de Angular, con enlaces a sus respectivas documentaciones oficiales para una consulta más profunda.

## Tabla de Tecnologías y Versiones

| Tecnología         | Versión recomendada |
|--------------------|--------------------|
| Angular            | 19.2.9             |
| Angular CLI        | 19.2.10            |
| TypeScript         | 5.7.3              |
| RxJS               | 7.8.2              |
| SCSS               | -                  |
| Biome              | 1.9.4              |
| Karma              | 6.4.4              |
| Jasmine            | 5.6.0              |
| Zone.js            | 0.15.0             |

---

## Framework Principal y Herramientas de Construcción

### [Angular](https://angular.dev/)

* **Rol:** Framework principal de la aplicación.
* **Descripción:** Utilizamos Angular (v19+) para construir la interfaz de usuario y la lógica de la aplicación de forma estructurada y basada en componentes. Este scaffold utiliza la arquitectura de **componentes standalone**, el enfoque moderno para construir aplicaciones Angular sin la necesidad de NgModules para cada componente/directiva/pipe.
* **Documentación:** [https://angular.dev/](https://angular.dev/)

### [Angular CLI](https://angular.dev/tools/cli)

* **Rol:** Herramienta de Línea de Comandos.
* **Descripción:** Esencial para el desarrollo con Angular. Se utiliza para crear el proyecto, generar componentes, servicios, directivas, pipes, construir la aplicación para desarrollo y producción (`ng build`), servir la aplicación localmente (`ng serve`), y ejecutar pruebas (`ng test`).
* **Documentación:** [https://angular.dev/tools/cli](https://angular.dev/tools/cli)

### [TypeScript](https://www.typescriptlang.org/)

* **Rol:** Superset de JavaScript con tipado estático.
* **Descripción:** Añade tipos a JavaScript, lo que ayuda a prevenir errores comunes durante el desarrollo, mejora la legibilidad del código y habilita un mejor autocompletado en el editor. Todo el código fuente de la aplicación (`.ts`) está escrito en TypeScript.
* **Documentación:** [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

## Estilos

### [SCSS](https://sass-lang.com/documentation)

* **Rol:** Preprocesador CSS.
* **Descripción:** Utilizamos SCSS (Sassy CSS) para escribir los estilos. SCSS es una extensión de CSS que añade características como variables, anidamiento, mixins, funciones, etc., permitiendo escribir CSS de forma más modular, mantenible y potente. Los archivos de estilo globales están en `src/styles.scss` y los componentes tienen sus propios archivos `.scss` encapsulados.
* **Documentación:** [https://sass-lang.com/documentation](https://sass-lang.com/documentation)

## Enrutamiento

### [Angular Router](https://angular.dev/guide/routing-overview)

* **Rol:** Módulo de enrutamiento del lado del cliente.
* **Descripción:** Maneja la navegación entre diferentes vistas o "páginas" dentro de la Single Page Application (SPA) sin necesidad de recargar la página completa. La configuración de rutas se realiza de forma funcional utilizando `provideRouter` en `app.config.ts` y definiendo las rutas en `app.routes.ts` y archivos de rutas específicos de cada feature.
* **Documentación:** [https://angular.dev/guide/routing-overview](https://angular.dev/guide/routing-overview)

## Manejo de Estado (Base)

### Servicios de Angular y [RxJS](https://rxjs.dev/guide/overview)

* **Rol:** Gestión de estado y datos asíncronos.
* **Descripción:** Para el manejo de estado, este scaffold se basa inicialmente en los **servicios de Angular** combinados con **RxJS** para la programación reactiva y el manejo de flujos de datos asíncronos (Observables, Subjects, BehaviorSubjects). Los servicios pueden mantener y compartir estado entre componentes. Para necesidades de estado más complejas o globales, se pueden integrar librerías dedicadas como NgRx, NgXs o Signals Store según los requerimientos del proyecto.
* **Documentación RxJS:** [https://rxjs.dev/guide/overview](https://rxjs.dev/guide/overview)
* **Documentación Servicios Angular:** [https://angular.dev/guide/architecture-services](https://angular.dev/guide/architecture-services)

## Pruebas (Testing)

### [Karma](https://karma-runner.github.io/)

* **Rol:** Ejecutor de pruebas (Test Runner).
* **Descripción:** Karma es la herramienta que lanza un navegador, carga los archivos de prueba y la aplicación, y ejecuta las pruebas definidas con Jasmine. Reporta los resultados en la terminal.

### [Jasmine](https://jasmine.github.io/)

* **Rol:** Framework de Pruebas (Testing Framework).
* **Descripción:** Jasmine proporciona la sintaxis y las funciones para escribir las pruebas unitarias y de componentes (ej. `describe()`, `it()`, `expect()`, `spyOn()`).
* **Documentación:** [https://jasmine.github.io/pages/docs_home.html](https://jasmine.github.io/pages/docs_home.html)

### [Angular Testing Utilities](https://angular.dev/guide/testing)

* **Rol:** Utilidades específicas de Angular para pruebas.
* **Descripción:** El paquete `@angular/core/testing` provee herramientas esenciales como `TestBed` y `ComponentFixture` para crear un entorno de prueba para componentes, permitiendo probar su interacción con la plantilla, la detección de cambios y la inyección de dependencias (usualmente con mocks).
* **Documentación:** [https://angular.dev/guide/testing-components-basics](https://angular.dev/guide/testing-components-basics)

## Calidad de Código

### [Biome](https://biomejs.dev/)

* **Rol:** Formateador y Linter integrado.
* **Descripción:** Herramienta de alto rendimiento que se encarga tanto de formatear el código para mantener un estilo consistente como de analizarlo (linting) para encontrar posibles errores o malas prácticas. Se configura a través de `biome.json`.
* **Documentación:** [https://biomejs.dev/docs/](https://biomejs.dev/docs/)

## Peticiones HTTP

### [Angular HttpClient](https://angular.dev/guide/understanding-communicating-with-http)

* **Rol:** Cliente HTTP para realizar peticiones a APIs.
* **Descripción:** `HttpClient` de `@angular/common/http` es el módulo de Angular para realizar peticiones HTTP. Se configura globalmente en `app.config.ts` usando `provideHttpClient()`, y se pueden añadir interceptors (definidos en `core/interceptors/`) para modificar peticiones/respuestas o manejar errores de forma centralizada.
* **Documentación:** [https://angular.dev/guide/understanding-communicating-with-http](https://angular.dev/guide/understanding-communicating-with-http)

## Bibliotecas Fundamentales Adicionales

### [Zone.js](https://github.com/angular/angular/tree/main/packages/zone.js)

* **Rol:** Mecanismo de detección de cambios.
* **Descripción:** Una dependencia de Angular que permite al framework detectar cuándo las operaciones asíncronas (como `setTimeout`, eventos DOM, XHR) han terminado, para saber cuándo debe ejecutar la detección de cambios y actualizar la vista. Se configura en `polyfills.ts` (o `polyfills` en `angular.json` para proyectos standalone).

---

## Herramientas de Desarrollo Adicionales (si aplica)

- **Cypress / Playwright:** Para pruebas end-to-end (E2E). [Cypress](https://www.cypress.io/) | [Playwright](https://playwright.dev/)
- **Husky / Commitlint:** Para control de calidad en los commits y hooks de Git. [Husky](https://typicode.github.io/husky/) | [Commitlint](https://commitlint.js.org/)
- **Integración continua:** Si el proyecto usa CI/CD (GitHub Actions, GitLab CI, etc.), consulta la documentación correspondiente.

---

**Nota:**  
Para detalles sobre convenciones, patrones de arquitectura y configuración avanzada, consulta los otros documentos en la carpeta `_docs`.