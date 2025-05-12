# Arquitectura del Proyecto y Estructura de Carpetas

Este scaffold de Angular adopta un enfoque de arquitectura modular, con el objetivo principal de mejorar la mantenibilidad, escalabilidad y facilitar el trabajo en equipo en proyectos de frontend. Está inspirado en principios de diseño como **Feature-Sliced Design (FSD)** en cuanto a la organización por funcionalidades y la clara separación de responsabilidades.

## Principios Clave de la Arquitectura

* **Modularidad por Funcionalidad:** La aplicación se divide en "features" o características de negocio lógicas e independientes.
* **Componentes Standalone:** Se utiliza la arquitectura de componentes, directivas y pipes standalone de Angular para reducir el boilerplate de NgModules y promover una gestión de dependencias más explícita a nivel de componente.
* **Bajo Acoplamiento:** Las features deben depender lo menos posible entre sí. La comunicación se facilita a través de servicios bien definidos o el enrutador.
* **Alta Cohesión:** El código relacionado con una funcionalidad específica reside junto dentro de su feature o módulo conceptual.
* **Separación de Responsabilidades (Capas):** Se definen capas/directorios claros (`app` (raíz), `core`, `features`, `shared`) con reglas sobre cómo pueden interactuar.

## Secciones Principales de la Aplicación (`src/app/`)

La estructura del código dentro de `src/app/` se organiza principalmente en las siguientes secciones:

1.  **Raíz de `app/`**: Contiene la lógica y configuración que aplica a *toda* la aplicación y sirve como punto de entrada.
    * `app.component.ts` (y sus archivos `.html`, `.scss`): Es el componente "shell" o raíz de la aplicación. Usualmente contiene la estructura principal de la página (como cabeceras, pies de página si son globales) y el `<router-outlet>` principal.
    * `app.config.ts`: Archivo central para la configuración de la aplicación standalone. Aquí se proveen los servicios globales (singletons del `core`), se configura el router principal con `provideRouter()`, se registran interceptors HTTP, etc.
    * `app.routes.ts`: Define las rutas de nivel superior de la aplicación, incluyendo las rutas que cargan perezosamente (lazy load) las diferentes `features`.

2.  **`core/`**: Alberga la lógica y servicios que son fundamentales para la aplicación, generalmente instanciados una sola vez (singletons) y disponibles globalmente.
    * **No contiene UI reutilizable.** Su propósito es la lógica transversal y servicios base.
    * **Ejemplos:** Servicios de autenticación, loggers, interceptors HTTP, route guards globales, modelos de datos globales si aplican.
    * Los servicios aquí se proveen en `app.config.ts`.

3.  **`features/`**: El corazón de la lógica de negocio. Cada subcarpeta representa una **característica de negocio** o un **caso de uso** específico (ej: `autenticacion`, `gestion-tareas`, `perfil-usuario`).
    * Estas features deben ser lo más **autocontenidas** posible.
    * Idealmente, una feature no importa directamente desde otra feature. La comunicación se realiza a través de rutas o servicios (preferiblemente de `core` o `shared` si es estado compartido).

4.  **`shared/`**: Contiene código que es **reutilizable a través de múltiples features** y que **no depende de ninguna lógica de negocio específica** (es agnóstico del dominio).
    * Todos los componentes, directivas y pipes aquí son `standalone: true`.

*(Nota: Inspirado en FSD, este scaffold establece `core`, `features` y `shared` como los pilares modulares. Diseños más complejos podrían introducir capas adicionales si el proyecto lo requiere, pero esta base es robusta y escalable).*

## La Carpeta `core/` en Detalle

* **Propósito:** Centralizar y proveer lógica y servicios que son esenciales para toda la aplicación y que generalmente se configuran una sola vez.
* **Estructura Interna Sugerida:**
    * `services/`: Para servicios singleton (ej. `AuthService`, `LoggerService`, `AppConfigService`). Se proveen en `app.config.ts`.
    * `guards/`: Para Route Guards (ej. `AuthGuard`). Se aplican en las definiciones de ruta y, si son clases, se proveen en `app.config.ts` o en los providers de la ruta.
    * `interceptors/`: Para HTTP Interceptors (ej. `TokenInterceptor`). Se registran en `app.config.ts` vía `provideHttpClient(withInterceptors([...]))`.
    * `models/` (Opcional): Para interfaces o tipos de datos que son globales y fundamentales para la lógica del core.

## La Carpeta `features/` en Detalle

* **Propósito:** Aislar la lógica de una funcionalidad específica. Modificar o eliminar una feature no debería impactar directamente a otras features.
* **Estructura Interna Típica (ej: `src/app/features/nombre-feature/`):**
    * `pages/`: Contiene los componentes standalone que actúan como las "páginas" o vistas principales de esta feature, usualmente accesibles a través de una ruta. (ej. `TasksPageComponent`).
    * `components/` (Opcional): Componentes standalone más pequeños que son reutilizables *únicamente dentro de esta feature específica*.
    * `services/` (Opcional): Servicios que son utilizados exclusivamente por esta feature. Pueden ser provistos a nivel de las rutas de la feature o directamente en los componentes si su alcance es aún más limitado.
    * `models/` (Opcional): Tipos TypeScript o interfaces específicos de esta feature.
    * `nombre-feature.routes.ts`: Define un array de `Routes` para la navegación interna de la feature. Este archivo usualmente exporta una constante (ej. `NOMBRE_FEATURE_ROUTES`) que es importada y cargada perezosamente (`loadChildren`) desde `app.routes.ts`.
* **"API Pública" de una Feature:** En este contexto standalone y lazy-loaded, la "API pública" de una feature es principalmente su **configuración de rutas** exportada desde `nombre-feature.routes.ts`. Los componentes dentro de `pages/` son los puntos de entrada a la feature a través del enrutador.

## La Carpeta `shared/` en Detalle

* **Propósito:** Evitar la duplicación de código proporcionando elementos comunes, genéricos y reutilizables.
* **Característica Clave:** El código en `shared/` **no debe tener conocimiento de ninguna feature específica**. Es agnóstico al dominio de negocio.
    * Un `CustomButtonComponent` en `shared/components/` no sabe si se usará en un formulario de "Tareas" o en una página de "Perfil". Solo sabe cómo ser un botón configurable.
    * Un pipe `FormatDatePipe` en `shared/pipes/` formatea cualquier fecha, sin importar de qué feature provenga.
* **Estructura Interna Sugerida:**
    * `components/`: Componentes UI standalone reutilizables (botones, modales, spinners, tarjetas, etc.).
    * `directives/`: Directivas standalone reutilizables.
    * `pipes/`: Pipes standalone reutilizables.
    * `models/` (Opcional): Interfaces o tipos que son verdaderamente compartidos entre múltiples features y no pertenecen a una en particular ni al `core`.
    * `utils/` (Opcional): Funciones de utilidad genéricas.
* **Uso:** Los artefactos standalone de `shared/` se importan directamente en el array `imports` de los componentes (de features, core, u otros compartidos) que los necesiten en sus plantillas.

## `core` vs. `features` vs. `shared`: Un Resumen

La clave para decidir dónde colocar algo:

* **¿Es específico de una funcionalidad de negocio y solo se usa ahí o se expone como parte de esa funcionalidad?**
    * → Va en `features/nombre-de-la-feature/`.
* **¿Es una utilidad o componente UI genérico que podría usarse en CUALQUIER feature, sin conocer la lógica de esa feature?**
    * → Va en `shared/`.
* **¿Es un servicio fundamental para toda la aplicación, que debe existir como una única instancia, o una pieza de infraestructura transversal (guards, interceptors globales)?**
    * → Va en `core/` y se provee en `app.config.ts`.

**Ejemplo:**
* `TasksPageComponent` vive en `features/tasks/pages/` (específico de la feature "Tareas").
* `CustomButtonComponent` vive en `shared/components/` (puede ser usado por "Tareas", "Dashboard", "Perfil", etc.).
* `AuthService` vive en `core/services/` (necesario globalmente para la autenticación).

Si `TasksPageComponent` necesita un botón, usa `CustomButtonComponent` de `shared/`. Si necesita autenticar al usuario, usa `AuthService` de `core/`.

## Beneficios de esta Arquitectura

* **Mantenimiento:** Cambios en una feature tienen menos probabilidad de afectar a otras.
* **Escalabilidad:** Añadir nuevas features o modificar existentes es más sencillo y aislado.
* **Trabajo en Equipo:** Diferentes desarrolladores pueden trabajar en features distintas con menos conflictos.
* **Navegación del Código:** Es más fácil encontrar el código relacionado con una funcionalidad específica.
* **Testabilidad:** Las features y componentes pueden ser probados de forma más aislada.
* **Reusabilidad:** Se fomenta a través de la capa `shared`.

---